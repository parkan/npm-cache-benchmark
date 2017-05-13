// node modules
const path = require('path');

// modules
const average = require('./src/average');
const spawn = require('./src/spawn');
const benchmarks = require('./benchmarks.json');

// implementation
const sampleSize = 5;
const results = benchmarks.reduce(registerBenchmark, {});

try {
  for (let i = 1; i <= sampleSize; i++) {
    console.log(`Run ${i}`);
    benchmarks.forEach(runBenchmark);
    console.log('');
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}

function runBenchmark(benchmark) {
  const key = getKey(benchmark);
  const result = results[key];

  clean();
  const time = measure(benchmark);
  verify(benchmark);
  clean();

  result.runs.push(time);
  result.average = average(result.runs);
  console.log(`${result.name}: ${time.toFixed(2)}s (average ${result.average.toFixed(2)}s)`);
}

function measure(benchmark) {
  const dir = resolveDirectory(benchmark);
  const start = new Date().getTime();
  spawn(benchmark.installer, benchmark.args, dir);
  const end = new Date().getTime();
  return (end - start) / 1000;
}

function clean() {
  spawn('git', ['clean', '-dfX']);
}

function verify(benchmark) {
  const dir = resolveDirectory(benchmark);
  spawn('node', ['./verify.js'], dir);
}

function registerBenchmark(index, benchmark) {
  const key = getKey(benchmark);
  index[key] = { average: 0, name: benchmark.name, runs: [] };
  return index;
}

function resolveDirectory(benchmark) {
  return path.resolve(benchmark.directory);
}

function getKey(benchmark) {
  return `${benchmark.installer}/${benchmark.directory}`;
}
