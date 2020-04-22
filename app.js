const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const https = require("https");
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const emailAddress = req.body.email;
   


const data = {
  members : [
    {
      email_address: emailAddress,
      status : "subscribed",
      merge_fields : {
        FNAME: firstName,
        LNAME : lastName

      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us19.api.mailchimp.com/3.0/lists/47f4517c67";

const options= {
  method: "POST",
  auth:"ali1:da8a3340efbabde51d30f0ca316dfc0a-us19"
};

const request = https.request(url, options, function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname +"/sucess.html");
  }else{
    res.sendFile(__dirname +"/faillure.html");
  };
  response.on("data", function(data){
    console.log(JSON.parse(data));
});
});
request.write(jsonData);
request.end();
});

app.post("/faillure.html", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
console.log("your app is running on port 3000");
});
