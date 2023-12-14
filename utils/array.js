filterMap = function (callback) {
  result = [];
  for (let i = 0; i < this.length; i++) {
    const el = this[i];
    const callResult = callback(el, i, this);
    if (callResult !== undefined) {
      result.push(callResult);
    }
  }
  return result;
};

module.exports = { filterMap };
