const { ADDRGETNETWORKPARAMS } = require("dns");
const User = require("../models/UserSetUpModel");
const { findUser, saveNewUser, updateChallenge, inputJournalEntry } = require("../models/UserDataModels")

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
