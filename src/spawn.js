const childProcess = require('child_process');

module.exports = spawn;

function spawn(cmd, args, cwd) {
  const shell = childProcess.spawnSync(cmd, args, {
    cwd: cwd || process.cwd(),
    encoding: 'utf-8',
    stdio: 'pipe'
  });
  const stdout = shell.output[1];
  const stderr = shell.output[2];
  shell.status !== 0 && onError(stderr);
}

function onError(err) {
  console.error(err);
  process.exit(1);
}
