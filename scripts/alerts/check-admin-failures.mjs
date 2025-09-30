#!/usr/bin/env node
import pg from 'pg';

const { Client } = pg;
const dbUrl = process.env.SUPABASE_DB_URL;
const slackWebhook = process.env.SLACK_WEBHOOK_URL;
const windowMinutes = Number(process.env.ADMIN_ALERT_WINDOW_MIN || 10);
const threshold = Number(process.env.ADMIN_ALERT_FAILURES_THRESHOLD || 20);

if (!dbUrl) {
  console.error('Missing SUPABASE_DB_URL');
  process.exit(1);
}

(async () => {
  const client = new Client({ connectionString: dbUrl });
  await client.connect();
  const { rows } = await client.query(
    `select count(*)::int as n
     from public.admin_auth_log
     where event = 'admin_login_failure'
       and ts >= now() - make_interval(mins => $1)`,
    [windowMinutes]
  );
  const n = rows?.[0]?.n || 0;
  await client.end();

  if (n >= threshold && slackWebhook) {
    const payload = {
      text: `Admin login failures spike: ${n} failures in last ${windowMinutes}m`,
    };
    try {
      const res = await fetch(slackWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error('Slack webhook failed', res.status);
      }
    } catch (e) {
      console.error('Slack webhook error', e?.message);
    }
  } else {
    console.log(`Failures in last ${windowMinutes}m: ${n} (threshold ${threshold})`);
  }
})().catch((e) => {
  console.error(e?.message || e);
  process.exit(1);
});
