var util = require('util')
  , fs = require('fs')
  , log = require('log')
  , logs = {};

function zero(num) {
  if ((num + '').length === 1) return '0' + num;
  return num + '';
}

function getDate() {
  var d = new Date;
  return d.getFullYear() + zero(d.getMonth() + 1) + zero(d.getDate());
}

function createStream(bid, date) {
  return fs.createWriteStream(process.cwd() + '/' + bid + date + '.log', { flags: 'a' });
}

function Log(bid, stream) {
  var res, date = getDate(), stream, path;
  if ((res = logs[bid]) && res.date === date) return res;
  if (!(this instanceof Log)) {
    stream = createStream(bid, date);
    res = logs[bid] = new Log('debug', stream);
    return res;
  }
  var level = bid;
  log.call(this, level, stream);
  this.date = getDate();
}
util.inherits(Log, log);

Log.readByDate = function (bid, date) {
  var stream = fs.createReadStream(process.cwd() + '/' + bid + date + '.log');
  return new log('debug', stream);
}

module.exports = Log;