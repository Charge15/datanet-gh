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
  const o1 = await prisma.order.findUnique({
    where: { reference: "DGH-MUWCN3VI-4U1S" },
    include: { user: true, agent: true }
  });
  const o2 = await prisma.order.findUnique({
    where: { reference: "DGH-MUUZI7QM-PE6A" },
    include: { user: true, agent: true }
  });
  console.log("Order 1 (MUWCN3VI-4U1S):", {
    ref: o1?.reference,
    user: o1?.user?.phone || o1?.user?.email || "Guest",
    agent: o1?.agent?.storeName || o1?.agent?.agentSlug || "None",
    deliveryStatus: o1?.deliveryStatus,
    datamartStatus: o1?.datamartStatus,
    createdAt: o1?.createdAt
  });
  console.log("Order 2 (MUUZI7QM-PE6A):", {
    ref: o2?.reference,
    user: o2?.user?.phone || o2?.user?.email || "Guest",
    agent: o2?.agent?.storeName || o2?.agent?.agentSlug || "None",
    deliveryStatus: o2?.deliveryStatus,
    datamartStatus: o2?.datamartStatus,
    createdAt: o2?.createdAt
  });
}

run().finally(() => prisma.$disconnect());
