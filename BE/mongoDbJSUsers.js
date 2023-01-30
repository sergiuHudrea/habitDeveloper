const mongoose = require("mongoose");
const express = require("express");

const { addUser, getUser, patchChallenge, addJournalEntry,getJournalEntries, getFilterJournal, deleteJournalEntry} = require('./mongoDBUsers/controllers/UserDataControllers');

const {handleCustomErrors, handle404s} = require('./mongoDBUsers/controllers/errorController')


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


app.get('/', (req ,res) => {
     res.status(200).send({msg: 'The backend is working, happy days!'})
})
app.get('/api', (req, res) => {
     res.status(200).send({msg: "Welcome to our hosted API!"})
})

app.post('/api/user', addUser)

app.get('/api/user/:email/:password', getUser)

app.patch('/api/user/:userId/:challengeName')

//get journal entries, sort by date
app.get('/api/journal/:email', getJournalEntries)
//get journal entries, filter by challenge, sort by date
app.get('/api/journal/filter/:email', getFilterJournal)

app.delete('/api/journalEntry/:entryId([0-9a-fA-F]{24})',deleteJournalEntry)

app.patch('/api/journal/:email', addJournalEntry)
app.patch('/api/challenges/:email', patchChallenge)

app.all('/*', handle404s);
app.use(handleCustomErrors);

module.exports = app;