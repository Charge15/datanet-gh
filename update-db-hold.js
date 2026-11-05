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
  const res1 = await prisma.order.updateMany({
    where: {
      reference: { in: ["DGH-MUWCN3VI-4U1S", "DGH-MUUZI7QM-PE6A"] }
    },
    data: {
      deliveryStatus: "ON_HOLD",
      datamartStatus: "waiting",
      failureReason: "Carrier Verification Queue: Queued for manual carrier dispatch & inventory clearance. Bundle will credit automatically once cleared.",
    }
  });
  console.log("Updated orders count:", res1.count);

  const updatedOrders = await prisma.order.findMany({
    where: {
      reference: { in: ["DGH-MUWCN3VI-4U1S", "DGH-MUUZI7QM-PE6A"] }
    },
    select: {
      reference: true,
      recipientPhone: true,
      deliveryStatus: true,
      datamartStatus: true,
      failureReason: true,
    }
  });
  console.log("Updated records:", updatedOrders);
}

run().finally(() => prisma.$disconnect());
