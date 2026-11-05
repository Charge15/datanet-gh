const fs = require('fs');
const content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('fetchOrders')) {
    console.log((idx+1) + ': ' + l.trim());
  }
});
