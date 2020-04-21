const express = require('express');
const bodyParser= require('body-parser');
var path = require('path');
const app = express();
require('./models/db');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended:false}));
app.set('views', path.join(__dirname, '/views/index'));
app.use(bodyparser.json());
const costomerController = require('./controllers/costomerController');

app.post('/create',(req,res,next)=>{
    res.sendFile(path.join(__dirname + '/create.html'));
});
app.post('/read',(req,res,next)=>{
    res.sendFile(path.join(__dirname + '/read.html'));
});
app.post('/update',(req,res,next)=>{
    res.sendFile(path.join(__dirname + '/update.html'));
});
app.post('/delete',(req,res,next)=>{
    res.sendFile(path.join(__dirname + '/delete.html'));
});
app.use((req,res,next)=>{
    res.status(404).send('<h1>page not found</h1>');
});
  
app.listen(3000);