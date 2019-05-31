const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const express_graphql = require('express-graphql');
var Harkness = require('../models/post');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/harkness');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.get('/project_harkness', (req, res) =>{
    res.send(
        [{
            title: "Hello world!",
            description: "Hi there! how are you"
        }]
    )
});

app.listen(process.env.PORT || 8081)