const { ADDRGETNETWORKPARAMS } = require("dns");
const User = require("../models/UserSetUpModel");
const { findUser, saveNewUser, updateChallenge, inputJournalEntry } = require("../models/UserDataModels")

exports.addUser = (req,res, next) =>{
    const {username, email, password} = req.body;
    console.log(username, email, password);
    

   saveNewUser(username, email, password)
   .then((user)=>{
    res.status(201).send(user)
   })
    .catch((err)=>{
        next(err)    
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
