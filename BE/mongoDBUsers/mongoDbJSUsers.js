const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/UserSetUpModel");
const { req, res } = require('express');

const {handleCustomErrors} = require('./controllers/errorController')

const { addUser, getUser, patchChallenge, addJournalEntry,getJournalEntries, getFilterJournal} = require('./controllers/UserDataControllers');

var ObjectID = require('mongodb').ObjectID;

const app = express();	
app.use(express.json());

const uri = "mongodb+srv://theFantastic5:theFantastic54321@habitdeveloper.m1vjjrl.mongodb.net/habitDev?retryWrites=true&w=majority";
mongoose.connect(uri)
.then((result)=>{
     console.log("connected to db")
     app.listen(3007);

})
.catch((err)=>{
     console.log(err);
})

app.get('/add-user', addUser)

app.get('/user/:email/:password', getUser)

app.patch('/user/:userId/:challengeName')

//get journal entries, sort by date
app.get('/journal/:userId', getJournalEntries)
//get journal entries, filter by challenge, sort by date
app.get('/journal/filter/:userId', getFilterJournal)


app.patch('/journal/:username', addJournalEntry)
app.patch('/challenges/:username', patchChallenge)
app.use(handleCustomErrors);

//This is now handles by karl's handleCustomErrors Function
// app.use((err, req,  res, next) => {
//      if (err.msg !== undefined) {
//          res.status(err.status).send( {msg: err.msg} );
//      } else {
//          next(err);
//      }
//  });


module.exports = app;