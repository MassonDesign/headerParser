// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var bodyParser = require("body-parser")
var accepts = require("accepts")
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/api/whoami", (req, res) => {
  console.log(req.headers)
  const ip = req.header("x-forwarded-for") || req.connection.remoteAdress

  const lang = accepts(req).language()[0]

  const soft = req.headers["user-agent"]

  res.json({
    ipaddress: ip,
    language: lang,
    software: soft
  })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
