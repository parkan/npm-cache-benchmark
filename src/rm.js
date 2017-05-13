const path = require('path');
const spawn = require('./spawn.js');

module.exports = {
  npmCache: dir => spawn('npm', ['cache', 'clean'], dir),
  npm5Cache: dir => spawn('npm5', ['cache', 'clean', '--force'], dir),
  yarnCache: dir => spawn('yarn', ['cache', 'clean'], dir),
  yarnOffline: dir => spawn('rm', ['-rf', path.join(dir, 'npm-packages-offline-cache')]),
  nodeModules: dir => spawn('rm', ['-rf', path.join(dir, 'node_modules')]),
  pnpmRegistry: dir => spawn('rm', ['-rf', path.join(dir, '.pnpm-registry')]),
  pnpmStore: dir => spawn('rm', ['-rf', path.join(dir, '.pnpm-store')])
};
