const results = require('./results.json');
const keys = Object.keys(results);
const sortedResults = keys
  .map(key => results[key])
  .sort((a, b) => parseFloat(a.average) - parseFloat(b.average));

console.log('| Installer | Average over 5 runs |');
console.log('|:--|--:|');

sortedResults.forEach(result => {
  console.log('| %s | %s |', result.name, result.average.toFixed(2));
});
