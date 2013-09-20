var path = require('path');
var express = require('express');
var request = require('request');
var bakery = require('openbadges-bakery');
var validator = require('openbadges-validator');

if (!('PORT' in process.env)) throw "Please specify PORT in the environment.";

var app = express();
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'static')));

app.get('/unbake', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  var url = req.query['url'];
  if (!url) return res.send(400, 'needs url');
  request({
    url: url,
    encoding: 'binary'
  }, function(err, upres, body) {
    if (err) 
      return res.send(500, 'request error');
    if (upres.statusCode >= 400)
      return res.send(502, 'upstream status was ' + upres.statusCode);
    bakery.debake(new Buffer(body, 'binary'), function(err, obj){
      if (err)
        return res.send(500, 'debake error: ' + err.toString());
      validator(obj, function(err, info) {
        if (err)
          return res.send(500, 'validate error: ' + err.toString());
        delete info.resources;
        return res.json(info);
      });
    });
  });
});

var port = process.env['PORT'];  
app.listen(port, function(){
  console.log('Listening on', port, '...');
});
