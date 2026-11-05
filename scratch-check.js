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
  const orders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      reference: true,
      recipientPhone: true,
      network: true,
      capacity: true,
      retailPrice: true,
      paymentStatus: true,
      deliveryStatus: true,
      datamartStatus: true,
      datamartReference: true,
      failureReason: true,
      datamartRawResponse: true,
      createdAt: true
    }
  });
  console.log('Orders found:', orders.length);
  for (const o of orders) {
    console.log('---');
    console.log('Ref:', o.reference);
    console.log('Phone:', o.recipientPhone, o.network, o.capacity + 'GB');
    console.log('Pay:', o.paymentStatus, 'Delivery:', o.deliveryStatus, 'DMStatus:', o.datamartStatus);
    console.log('DMRef:', o.datamartReference);
    console.log('Reason:', o.failureReason);
    if (o.datamartRawResponse) {
      console.log('Raw:', o.datamartRawResponse.slice(0, 300));
    }
  }
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
