const { findUser, saveNewUser, getJournalEntriesInfo, getFilterJournalInfo } = require("../models/UserDataModels")
const User = require("../models/UserSetUpModel");

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

//get journal entries, sort by date
exports.getJournalEntries = (req,res) => {
    const {userId} = req.params;
    const {order} = req.query;

    getJournalEntriesInfo(userId,order)
    .then((journalEntries) =>{
        res.status(200).send(journalEntries)
    })
}

//get journal entries, filter by challenge, sort by date
exports.getFilterJournal  = (req,res) => {
    const {userId} = req.params;
    const {challenge, order} = req.query;

    getFilterJournalInfo(userId,challenge,order)
    .then((journalEntries) =>{
        res.status(200).send(journalEntries)
    })
}