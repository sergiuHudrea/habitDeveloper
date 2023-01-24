const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/UserSetUpModel");
const { req, res } = require('express');
const { addUser, getUser, patchChallenge} = require('./controllers/UserDataControllers');
var ObjectID = require('mongodb').ObjectID;

const app = express();	
app.use(express.json());

const uri = "mongodb+srv://theFantastic5:theFantastic54321@habitdeveloper.m1vjjrl.mongodb.net/habitDev?retryWrites=true&w=majority";
mongoose.connect(uri)
.then((result)=>{
     console.log("connected to db")
     app.listen(3005);
})
.catch((err)=>{
     console.log(err);
})

// app.get('/add-user', addUser(req,res))

app.get('/user/:email/:password', getUser)

app.patch('/challenges/:username', patchChallenge)


app.use((err, req,  res, next) => {
     if (err.msg !== undefined) {
         res.status(err.status).send( {msg: err.msg} );
     } else {
         next(err);
     }
 });



module.exports = app;