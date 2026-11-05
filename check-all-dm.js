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

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const baseUrl = (process.env.DATAMART_BASE_URL || "https://api.datamartgh.shop").replace(/\/$/, "");
const apiKey = process.env.DATAMART_API_KEY || "";

async function checkAllRecent() {
  const orders = await prisma.order.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
  });

  for (const o of orders) {
    if (!o.datamartReference) continue;
    try {
      const res = await fetch(`${baseUrl}/api/developer/order-status/${encodeURIComponent(o.datamartReference)}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "X-API-Key": apiKey,
        }
      });
      const json = await res.json().catch(() => null);
      const dmStatus = json?.data?.orderStatus || json?.data?.status;
      const apiResp = json?.data?.apiResponse?.status || json?.data?.apiResponse?.message;
      console.log(`Order ${o.reference} (DM: ${o.datamartReference}): DB deliveryStatus=${o.deliveryStatus}, DB dmStatus=${o.datamartStatus} | Live DM status=${dmStatus}, API=${apiResp}`);
    } catch (e) {
      console.log(`Order ${o.reference}: Error fetching`);
    }
  }
}

checkAllRecent().finally(() => prisma.$disconnect());
