var map = require('map-stream')
  , Log = require('./log')
  , LEVELS = {
    '1': 'debug',
    '2': 'info',
    '4': 'error',
    '8': 'warning'
  };

module.exports = function () {
  return map(function (obj, fn) {
    Log(obj.bid)[LEVELS[obj.level]](obj.msg);
  });
}