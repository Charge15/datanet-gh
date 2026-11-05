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

async function run() {
  const allOrders = await prisma.order.findMany({
    where: {
      OR: [
        { deliveryStatus: { in: ["ON_HOLD", "HOLD", "PAUSED", "WAITING"] } },
        { datamartStatus: { contains: "hold" } },
        { datamartStatus: { contains: "wait" } },
        { failureReason: { contains: "hold" } },
        { datamartRawResponse: { contains: "hold" } },
        { datamartRawResponse: { contains: "waiting" } },
      ]
    },
    select: {
      id: true,
      reference: true,
      recipientPhone: true,
      deliveryStatus: true,
      datamartStatus: true,
      datamartReference: true,
      failureReason: true,
      createdAt: true
    }
  });
  console.log("Matched orders:", allOrders);
}

run().finally(() => prisma.$disconnect());
