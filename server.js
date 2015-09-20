var bluebird = require('bluebird');
var express = require('express');
var login = require('facebook-chat-api');
var bodyParser = require('body-parser');
var path = require('path');
var project_folder = __dirname + '/../';
var app = express();

var connections = [];
var connection_max = 10;

app.get('/', function (req, res) {
  res.sendFile('index.html');

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.post('/tryToEmail', function (req, res) {
  login({
    'email': req.email,
    'password': req.password
  }, function (err, api) {
    if (connections.length === connection_max) {

    }
    if (err) {
      res.sendfile('error.html');
      console.error(req.email, 'couldn\'t sign in');
      return;
    }
    connections.push(
      {
        'email':req.email,
        'api':api
      });

  });
});
app.listen(process.env.PORT || 3000);

