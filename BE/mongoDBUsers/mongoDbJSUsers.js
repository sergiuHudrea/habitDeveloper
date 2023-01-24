const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/UserSetUpModel");
const { req, res } = require('express');
const { addUser, getUser, addJournalEntry } = require('./controllers/UserDataControllers');
const {handleCustomErrors} = require('./controllers/errorController')

const app = express();	
app.use(express.json());

const uri = "mongodb+srv://theFantastic5:theFantastic54321@habitdeveloper.m1vjjrl.mongodb.net/habitDev?retryWrites=true&w=majority";
mongoose.connect(uri)
.then((result)=>{
     console.log("connected to db")
     app.listen(3006);
})
.catch((err)=>{
     console.log(err);
})

app.get('/add-user', addUser)

app.get('/user/:email/:password', getUser)

app.patch('/user/:userId/:challengeName')

app.patch('/journal/:username', addJournalEntry)
app.use(handleCustomErrors);

module.exports = app;