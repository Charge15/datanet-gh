const fs = require('fs');
const content = fs.readFileSync('src/app/reseller/page.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('deliveryStatus')) {
    console.log((idx + 1) + ': ' + line.trim());
  }
});
