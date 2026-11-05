const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  const pkgs = await p.dataPackage.findMany({
    orderBy: [{ network: 'asc' }, { capacity: 'asc' }]
  });
  console.log('Total packages:', pkgs.length);
  pkgs.filter(x => x.capacity === 5).forEach(x => {
    console.log(`${x.network} ${x.capacity}GB: baseCost=${x.baseCost}, sellingPrice=${x.sellingPrice}, guestPrice=${x.guestPrice}`);
  });
  await p.$disconnect();
}

run();
