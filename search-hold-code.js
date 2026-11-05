const fs = require('fs');
const path = require('path');

function searchDir(dir, pattern) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        searchDir(full, pattern);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('ON_HOLD') || content.includes('isHold') || content.includes('isHoldOrder')) {
        console.log(full);
      }
    }
  }
}

searchDir('src', 'isHold');
