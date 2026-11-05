const fs = require('fs');
const content = fs.readFileSync('src/app/reseller/page.tsx', 'utf8');
const lines = content.split('\n');
let inside = false;
lines.forEach((l, idx) => {
  if (l.includes('fetchAgentData =')) {
    inside = true;
  }
  if (inside) {
    console.log((idx+1) + ': ' + l);
    if (l.includes('finally') || idx > 250) {
      inside = false;
    }
  }
});
