const { urlencoded } = require("body-parser");

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser, urlencoded({extended:true}))

app.listen(3000, (req, res) => {
    console.log("Server initialized at port 3000")
})