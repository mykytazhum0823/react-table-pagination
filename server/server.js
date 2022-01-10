var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/save', function(req, res) {
    // console.log(req.body);
    var filename = req.body.filename;
    var jsonString = JSON.stringify(req.body.info);
    fs.writeFileSync("../src/questionnaires/"+filename+".json", jsonString);
    
});

app.listen(3001);
console.log("server is running on port 3001");