var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get("/", function(req,res) {
  res.send("this page has user stories");
});

app.get("/new/:url", function(req,res) {
  console.log(req.params.url);
  //will display the JSON with url and shortened
  //the shortened value of url will reside in a db
  //url needs to be a valid url
});

app.get("/:short", function(req,res) {
  console.log(req.params.short);
  //retreive from db
});



app.listen(port);
