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
      deliveryStatus: { not: "DELIVERED" }
    },
    select: {
      id: true,
      reference: true,
      recipientPhone: true,
      deliveryStatus: true,
      paymentStatus: true,
      datamartStatus: true,
      datamartReference: true,
      failureReason: true,
      createdAt: true
    }
  });
  console.log("Not delivered orders count:", allOrders.length);
  console.log(JSON.stringify(allOrders, null, 2));
}

run().finally(() => prisma.$disconnect());
