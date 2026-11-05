const fs = require('fs');
if (fs.existsSync('.env')) {
  const env = fs.readFileSync('.env', 'utf8');
  env.split('\n').forEach(line => {
    const idx = line.indexOf('=');
    if (idx > 0 && !line.startsWith('#')) {
      const k = line.substring(0, idx).trim();
      const v = line.substring(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      process.env[k] = v;
    }
  });
}

const baseUrl = (process.env.DATAMART_BASE_URL || "https://api.datamartgh.shop").replace(/\/$/, "");
const apiKey = process.env.DATAMART_API_KEY || "";

async function inspect(ref) {
  const res = await fetch(`${baseUrl}/api/developer/order-status/${encodeURIComponent(ref)}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "X-API-Key": apiKey,
    }
  });
  const json = await res.json().catch(() => null);
  console.log("=== " + ref + " ===");
  console.log(JSON.stringify(json, null, 2));
}

async function main() {
  await inspect("MN-AX6766HP");
  await inspect("MN-JV8745IQ");
}
main();
