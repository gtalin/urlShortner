var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
const Url = require('url').Url;
//console.log(
console.log(Url);

//DB stuff
var mongodb = require("mongodb");
var mongoClient = mongodb.mongoClient;
var mongdbUrl = process.env.MONGOLAB_URI;//place where mongodb running
//we'll connect when there is some request


app.get("/", function(req,res) {
  res.send("this page has user stories");
});

app.get("/new/*", function(req,res) {
  //if we do this: "/new/:url" it'll not work
  console.log("this page is for urls");
  var url = req.params[0];
  console.log(url);
  try {
    const myURL = new Url(url);
    console.log("url passed", myURL.href);
    res.send(myURL);
  }
  catch (err) {
    console.log("Not valid url", err);
    res.send("Error in url")
  }
});

app.get("/new/:url", function(req,res) {
  console.log(req.params.url);
  //will display the JSON with url and shortened
  //the shortened value of url will reside in a db
  //url needs to be a valid url
  try {
    const myURL = new URL('https://你好你好');
    console.log("url passed");
    res.send("URL passed");
  }
  catch (err) {
    console.log("Not valid url", err);
    res.send("Error in url")
  }
});

app.get("/:short", function(req,res) {
  console.log(req.params.short);
  //will connect to mLab DB and
});



app.listen(port);
