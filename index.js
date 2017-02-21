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
//console.log(process.env);
var mongodbUrl = process.env.MONGOLAB_URI;//place where mongodb running

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
      if (err) {
        console.log("Unable to connect to db server. Error: ", err);
        res.send(result);
      }
      else {
        console.log("Connected");
        //We'll add url
        //console.log(db.collection.count());
        var collection = db.collection("urlshortner");
        //collection.insert({"original_url":"https://www.google.com","short_url":"1234"})
        //just a dummy insertion to see if collection.count() is working
        //console.log(collection.find().count());
        findAll(db,function() {
          insertData(db);
        });

      }
    });

    function findAll(db, callback) {
      var collection = db.collection("urlshortner");
      collection.find({}).toArray(function(err,docs) {
        console.log(docs.length);
        var docsLen = docs.length + 1000 + 1//1000 is offset
        var shortUrl = toShort(docsLen);
        //we pass the number of total docs + 1 offseted with 1000
        //to be converted to toShort.
        result={"original_url":url,
        "short_url":shortUrl};//dont eed to JSON.stringify
        callback(result);
      });
    }

    function insertData (db,callback) {
      //We'll need to have db and collections here as well
      //even though it looks nested
      var collection = db.collection("urlshortner");
      console.log(result);
      res.send(result);//res.send before inserting else will
      //send id element to screen as well.
      collection.insert(result);
      //was inserting shortUrl by mistake. No error logged
      //but was not inserting
      db.close();
    }

    function toShort(num) {
    	//basically the problem is about converting from base 10
    	//to base 36
      var baseDig = "0123456789abcdefghijklmnopqrstuvwxyz"
    	var base = baseDig.length;
    	var shortened = [];
    	while(num) {
    		shortened.push(baseDig[num%base]);
    		num = Math.floor(num/base);
    	}
    	return shortened.reverse().join("");
    }

    //result={"original_url":url,"short_url":"To-Do"}
    //res.send(result);//not even here
  }

  //res.send(result);//can't keep it here becuase it'll be
  //executed even before findAll and insertData will
  //even get a chance to escute.
  //thus the 2 res.send in their respective conditional
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
