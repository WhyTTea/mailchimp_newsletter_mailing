const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signp.html");
});

app.post('/',(req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/504f95f519"
    const options = {
        method: 'POST',
        auth: "whyttea1:b51412ac68d55bfeb39cc145129e9535-us10" 
    }
    const request = https.request(url, options, function(response){
            response.on("data", (data) => {
                console.log(JSON.parse(data));
            })
            if (response.statusCode === 200){
                res.sendFile(__dirname+"/success.html");
            }else{
                res.sendFile(__dirname+"/failure.html"); 
            }
            
    })

    //request.write(jsonData);
    request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("Server initialized at port 3000")
});

// API KEY:
// b51412ac68d55bfeb39cc145129e9535-us10

// Audience ID:
// 504f95f519