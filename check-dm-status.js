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

async function checkRef(ref) {
  console.log("Checking ref:", ref, "against", baseUrl);
  // 1. Developer endpoint
  try {
    const res = await fetch(`${baseUrl}/api/developer/order-status/${encodeURIComponent(ref)}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "X-API-Key": apiKey,
      }
    });
    console.log("Developer order-status HTTP:", res.status);
    const json = await res.json().catch(() => null);
    console.log("Developer response:", JSON.stringify(json, null, 2));
  } catch (e) {
    console.error("Developer check error:", e);
  }

  // 2. Store orders endpoint
  try {
    const res2 = await fetch(`${baseUrl}/api/store/v1/orders/${encodeURIComponent(ref)}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "X-API-Key": apiKey,
      }
    });
    console.log("Store orders HTTP:", res2.status);
    const json2 = await res2.json().catch(() => null);
    console.log("Store response:", JSON.stringify(json2, null, 2));
  } catch (e) {
    console.error("Store check error:", e);
  }

  // 3. PurchaseId check
  try {
    const res3 = await fetch(`${baseUrl}/api/developer/order-status/6ac4a1567b356441ba9a33d2`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "X-API-Key": apiKey,
      }
    });
    console.log("Developer purchaseId status HTTP:", res3.status);
    const json3 = await res3.json().catch(() => null);
    console.log("Developer purchaseId response:", JSON.stringify(json3, null, 2));
  } catch (e) {}
}

checkRef("MN-JV8745IQ");
