module.exports = function average(list) {
  return list.reduce((total, value) => total + value, 0) / list.length;
};
