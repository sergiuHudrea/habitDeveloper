const { ADDRGETNETWORKPARAMS } = require("dns");
const User = require("../models/UserSetUpModel");
const { findUser, saveNewUser, updateChallenge, inputJournalEntry, getJournalEntriesInfo, getFilterJournalInfo } = require("../models/UserDataModels")


exports.addUser = (req,res, next) =>{
    const {username, email, password} = req.body;

   saveNewUser(username, email, password)
   .then((user)=>{
    res.status(201).send(user)
   })
    .catch((err)=>{
        next(err)    
    })
}

exports.getUser = (req, res, next) =>{
    const {password, email} = req.params;
    findUser(password, email)
    .then((user)=>{
        res.status(200).send(user);
    })
    .catch((err)=>{
        next(err);
    })
}

exports.addJournalEntry = (req, res, next) =>{
    const {email} = req.params;
    const journalEntry = req.body;
    inputJournalEntry(email, journalEntry)
    .then((result)=>{
        res.status(201).send(result);
    })
    .catch((err)=>{
        next(err);
    })
}


exports.patchChallenge = (req, res, next) => {
    const { email } = req.params;
    updateChallenge(email, req.body)
        .then( (user) => {
            res.status(200).send( user);
        })
        .catch( (err) => {
            next(err);
        })
}

//get journal entries, sort by date
exports.getJournalEntries = (req,res,next) => {
    const {email} = req.params;
    const {order} = req.query;

    getJournalEntriesInfo(email,order)
    .then((journalEntries) =>{
        res.status(200).send(journalEntries)
    })
    .catch ((err) => {
        next(err)
    })
}

//get journal entries, filter by challenge, sort by date
exports.getFilterJournal  = (req,res,next) => {
    const {email} = req.params;
    const {challenge, order} = req.query;

    getFilterJournalInfo(email,challenge,order)
    .then((journalEntries) =>{
        res.status(200).send(journalEntries)
    })
    .catch((err) => {
        next(err)
    })
}