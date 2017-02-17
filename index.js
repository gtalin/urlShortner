var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
const validUrl = require('valid-url');
//console.log(validUrl);
//console.log(process.env);

////DB stuff
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
////console.log(MongoClient);
console.log(process.env);
var mongodbUrl = process.env.MONGOLAB_URI;//place where mongodb running
console.log(mongodbUrl);

////we'll connect when there is some request


app.get("/", function(req,res) {
  res.send("this page has user stories");
});

app.get("/new/*", function(req,res) {
  //if we do this: "/new/:url" it'll not work
  console.log("this page is for urls");
  var shortUrl = req.protocol + '://' + req.get('host');
  console.log(shortUrl);
  var result={"error":
  "Wrong url format, make sure you have a valid protocol and real site."}
  var url = req.params[0];
  console.log(url);
  if (validUrl.isUri(url)) {
    console.log("valid url");
    MongoClient.connect(mongodbUrl, function(err,db){
      if (err) {console.log("Unable to connect to db server. Error: ", err);}
      else {
        console.log("Connected");
        //We'll add url
        console.log(db.collection.count());
        var collection = db.collection("urlshortner");
        //it doesn't have anything yet.
        //we'll add url and shortened url
        db.close();
      }
    })
    result={"original_url":url,
    "short_url":"To-Do"}
  }
  res.send(result);

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
  var errorMsg = {
    "error":"This url is not on the database."};
  //will connect to mLab DB
  //Query db. If exist in db, redirect to
  //retrieved url else error msg.
});



app.listen(port);
