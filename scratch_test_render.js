const fs = require('fs');
const content = fs.readFileSync('src/components/dashboards/FamiliaConvocatorias.tsx', 'utf8');

console.log("FamiliaConvocatorias size:", content.length);
