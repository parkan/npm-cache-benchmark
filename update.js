const fs = require('fs');
const path = require('path');
const spawn = require('./src/spawn');
const dependencies = require('./benchmarks.packages.json');

updatePackageJson('npm');
spawn('rm', ['-rf', './package-lock.json'], path.resolve('npm'));
spawn('npm5', ['install'], path.resolve('npm'));
spawn('rm', ['-rf', './node_cache'], path.resolve('npm'));

updatePackageJson('npm-cached');
spawn('rm', ['-rf', './node_cache'], path.resolve('npm-cached'));
spawn('rm', ['-rf', './package-lock.json'], path.resolve('npm-cached'));
spawn('npm5', ['install'], path.resolve('npm-cached'));
spawn('rm', ['-rf', './node_modules'], path.resolve('npm-cached'));
spawn('npm', ['install'], path.resolve('npm-cached'));

updatePackageJson('pnpm');
spawn('rm', ['-rf', './shrinkwrap.yaml'], path.resolve('pnpm'));
spawn('pnpm', ['install'], path.resolve('pnpm'));
spawn('rm', ['-rf', '.pnpm-registry'], path.resolve('pnpm'));
spawn('rm', ['-rf', '.pnpm-store'], path.resolve('pnpm'));
spawn('rm', ['-rf', './node_modules'], path.resolve('pnpm'));

updatePackageJson('pnpm-cached');
spawn('rm', ['-rf', './shrinkwrap.yaml'], path.resolve('pnpm-cached'));
spawn('rm', ['-rf', '.pnpm-registry'], path.resolve('pnpm'));
spawn('rm', ['-rf', '.pnpm-store'], path.resolve('pnpm'));
spawn('pnpm', ['install'], path.resolve('pnpm-cached'));
spawn('rm', ['-rf', './node_modules'], path.resolve('pnpm-cached'));
updatePnpmStorePath('pnpm-cached', '.pnpm-store');

updatePackageJson('pnpm-offline');
spawn('rm', ['-rf', './.pnpm-registry-offline'], path.resolve('pnpm-offline'));
spawn('rm', ['-rf', './.pnpm-store-offline'], path.resolve('pnpm-offline'));
spawn('rm', ['-rf', './shrinkwrap.yaml'], path.resolve('pnpm-offline'));
spawn('mkdir', ['./.pnpm-registry-offline'], path.resolve('pnpm-offline'));
spawn('mkdir', ['./.pnpm-store-offline'], path.resolve('pnpm-offline'));
spawn('pnpm', ['install', '--offline', 'false'], path.resolve('pnpm-offline'));
spawn('rm', ['-rf', './node_modules'], path.resolve('pnpm-offline'));
updatePnpmStorePath('pnpm-offline', '.pnpm-store-offline');

updatePackageJson('shrinkpack');
spawn('rm', ['-rf', './npm-shrinkwrap.json'], path.resolve('shrinkpack'));
spawn('npm', ['install'], path.resolve('shrinkpack'));
spawn('npm', ['shrinkwrap'], path.resolve('shrinkpack'));
spawn('shrinkpack', [], path.resolve('shrinkpack'));
spawn('rm', ['-rf', './node_cache'], path.resolve('shrinkpack'));

updatePackageJson('shrinkpack-compressed');
spawn('rm', ['-rf', './npm-shrinkwrap.json'], path.resolve('shrinkpack-compressed'));
spawn('npm', ['install'], path.resolve('shrinkpack-compressed'));
spawn('npm', ['shrinkwrap'], path.resolve('shrinkpack-compressed'));
spawn('shrinkpack', ['--compress'], path.resolve('shrinkpack-compressed'));
spawn('rm', ['-rf', './node_cache'], path.resolve('shrinkpack-compressed'));

updatePackageJson('yarn');
spawn('rm', ['-rf', './yarn.lock'], path.resolve('yarn'));
spawn('yarn', ['install'], path.resolve('yarn'));
spawn('rm', ['-rf', './npm-packages-offline-cache'], path.resolve('yarn'));

updatePackageJson('yarn-offline');
spawn('rm', ['-rf', './npm-packages-offline-cache'], path.resolve('yarn-offline'));
spawn('rm', ['-rf', './yarn.lock'], path.resolve('yarn-offline'));
spawn('yarn', ['install'], path.resolve('yarn-offline'));

function updatePackageJson(directory) {
  const file = path.resolve(directory, 'package.json');
  const contents = prettyJson({
    name: directory,
    version: '0.0.0',
    dependencies: dependencies
  });
  fs.writeFileSync(file, contents);
}

function updatePnpmStorePath(directory, storeName) {
  const file = path.resolve(directory, storeName, '1', 'store.yaml');
  const contents = fs.readFileSync(file, { encoding: 'utf8' });
  fs.writeFileSync(file, contents.split(path.resolve(directory, '..')).join('.'));
}

function prettyJson(data) {
  return JSON.stringify(data, null, 2) + '\n';
}
