var map = require('map-stream')
  , qs = require('qs');

module.exports = function () {
  return map(function (req, fn) {
    var obj = qs.parse(req._parsedUrl.query);
    fn(null, obj);
  });
}