const { ADDRGETNETWORKPARAMS } = require("dns");
const User = require("../models/UserSetUpModel");
const { findUser, saveNewUser, updateChallenge, inputJournalEntry, getJournalEntriesInfo, getFilterJournalInfo } = require("../models/UserDataModels")


exports.addUser = (req,res) =>{
    const user = new User({
        username: "Karl",
        email:"karl.rivett@yahoo.au",
        password:"password",
        likes:0,
        challenges:{},
        uniqueUserLink:"",
        medals:{},
        dailyJournal:[]
   })

   saveNewUser(user)
   .then((user)=>{
    res.status(201).send(user)
    .catch((err)=>{
        console.log(err)
    })
   })
}

exports.getUser = (req, res) =>{
    const {password, email} = req.params;
    findUser(password, email)
    .then((user)=>{
        res.status(200).send(user);
    })
    .catch((err)=>{
        console.log(err);
    })
}


exports.addJournalEntry = (req, res, next) =>{
    const {username} = req.params;
    const journalEntry = req.body;
    inputJournalEntry(username, journalEntry)
    .then((result)=>{
        res.status(201).send(result);
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })
}


exports.patchChallenge = (req, res, next) => {
    const { username } = req.params;
    updateChallenge(username, req.body)
        .then( (user) => {
            res.status(200).send( user);
        })
        .catch( (err) => {
            next(err);
        })
}

//get journal entries, sort by date
exports.getJournalEntries = (req,res) => {
    const {username} = req.params;
    const {order} = req.query;

    getJournalEntriesInfo(username,order)
    .then((journalEntries) =>{
        res.status(200).send(journalEntries)
    })
}

//get journal entries, filter by challenge, sort by date
exports.getFilterJournal  = (req,res) => {
    const {username} = req.params;
    const {challenge, order} = req.query;

    getFilterJournalInfo(username,challenge,order)
    .then((journalEntries) =>{
        res.status(200).send(journalEntries)
    })
}