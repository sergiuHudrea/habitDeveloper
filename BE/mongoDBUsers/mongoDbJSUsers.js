const mongoose = require("mongoose");
const express = require("express");

const {handleCustomErrors, handle404s} = require('./controllers/errorController')
const { addUser, getUser, patchChallenge, addJournalEntry,getJournalEntries, getFilterJournal} = require('./controllers/UserDataControllers');

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

app.post('/user', addUser)
app.get('/user/:email/:password', getUser)

app.get('/journal/:email', getJournalEntries)
app.get('/journal/filter/:email', getFilterJournal)

app.patch('/journal/:email', addJournalEntry)
app.patch('/challenges/:email', patchChallenge)

// app.all('/*', handle404s);
app.use(handleCustomErrors);

module.exports = app;