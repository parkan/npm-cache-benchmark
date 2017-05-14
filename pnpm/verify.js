Object.keys(require('./package.json').dependencies).forEach(dependency => {
  try {
    require.resolve(dependency);
  } catch (err) {
    console.error(`${dependency} was not installed correctly`);
    process.exit(1);
  }
});
