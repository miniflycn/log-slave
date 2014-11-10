var connect = require('connect')
  , axon = require('axon')
  , stream = require('./stream')()
  , storage = require('./storage')()
  , config = require('../config')
  , app;

stream.pipe(storage);

function init() {
  app = connect()
    .use('/cgi-bin/js_report', function (req, res) {  
      stream.write(req);

      res.writeHead(204, {
        'Content-Type': 'image/jpeg'
      });
      res.statusCode = 204;
      res.end();
    })
    .listen(config.port);
}

module.exports = {
  init: init
};