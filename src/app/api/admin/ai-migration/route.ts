import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, password } = await req.json();
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }
    const ADMIN_UI_PASSWORD = process.env.ADMIN_UI_PASSWORD || '';
    if (!ADMIN_UI_PASSWORD || password !== ADMIN_UI_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = process.env.GITHUB_ACTIONS_TOKEN || process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO || 'DisMurr/chimacoffee';
    if (!token) {
      return NextResponse.json({ error: 'Missing GitHub token on server' }, { status: 500 });
    }

    const url = `https://api.github.com/repos/${repo}/actions/workflows/ai-migration.yml/dispatches`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ref: 'main', inputs: { prompt } }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return NextResponse.json({ error: `GitHub dispatch failed (${res.status}): ${text}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}
