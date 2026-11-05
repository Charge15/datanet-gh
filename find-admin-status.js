const fs = require('fs');
const content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('deliveryStatus') || line.includes('ON_HOLD') || line.includes('on_hold') || line.includes('orderStatusFilter')) {
    console.log((idx + 1) + ': ' + line.trim().slice(0, 100));
  }
});
