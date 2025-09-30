// HMAC-signed opaque admin session tokens compatible with Node and Edge runtimes
// Token format: base64url(JSON payload).base64url(HMAC_SHA256(secret, payload))
// Payload fields: sub ("admin"), iat (seconds), exp (seconds), jti (uuid-ish), salt (random)

function base64urlEncode(buf: ArrayBuffer | Uint8Array) {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let str = '';
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64urlDecode(input: string): Uint8Array {
  const pad = input.length % 4 === 0 ? '' : '='.repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, '+').replace(/_/g, '/') + pad;
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmacSha256(keyBytes: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  // Use Web Crypto subtle API
  const key = await crypto.subtle.importKey('raw', keyBytes as unknown as BufferSource, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
  const sig = await crypto.subtle.sign('HMAC', key, data as unknown as BufferSource);
  return new Uint8Array(sig);
}

function textEncoder(str: string) {
  return new TextEncoder().encode(str);
}

function getRandomBytes(len: number) {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return arr;
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

export type AdminSessionPayload = {
  sub: 'admin';
  iat: number; // seconds
  exp: number; // seconds
  jti: string;
  salt: string; // random salt
};

export function adminSessionSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET || '';
  if (!secret) throw new Error('Missing ADMIN_SESSION_SECRET');
  // Accept raw utf-8 or base64url string; try to decode if looks url-safe
  try {
    return base64urlDecode(secret);
  } catch {
    return textEncoder(secret);
  }
}

export function createAdminPayload(ttlSeconds = 60 * 60 * 24 * 7): AdminSessionPayload {
  const iat = nowSeconds();
  const exp = iat + ttlSeconds;
  // Generate jti from random bytes
  const rnd = base64urlEncode(getRandomBytes(16));
  const salt = base64urlEncode(getRandomBytes(8));
  return { sub: 'admin', iat, exp, jti: rnd, salt };
}

export async function signAdminSession(payload: AdminSessionPayload, secretBytes?: Uint8Array): Promise<string> {
  const secret = secretBytes ?? adminSessionSecret();
  const payloadJson = JSON.stringify(payload);
  const payloadB64 = base64urlEncode(textEncoder(payloadJson));
  const sig = await hmacSha256(secret, textEncoder(payloadB64));
  const sigB64 = base64urlEncode(sig);
  return `${payloadB64}.${sigB64}`;
}

export async function verifyAdminSession(token: string, secretBytes?: Uint8Array): Promise<AdminSessionPayload | null> {
  try {
    const secret = secretBytes ?? adminSessionSecret();
    const [payloadB64, sigB64] = token.split('.');
    if (!payloadB64 || !sigB64) return null;
    const expected = await hmacSha256(secret, textEncoder(payloadB64));
    const given = base64urlDecode(sigB64);
    if (given.length !== expected.length) return null;
    // Constant-time compare
    let ok = 0;
    for (let i = 0; i < expected.length; i++) ok |= expected[i] ^ given[i];
    if (ok !== 0) return null;
    const payloadStr = new TextDecoder().decode(base64urlDecode(payloadB64));
    const payload = JSON.parse(payloadStr) as AdminSessionPayload;
    if (payload.sub !== 'admin') return null;
    if (payload.exp < nowSeconds()) return null;
    return payload;
  } catch {
    return null;
  }
}
