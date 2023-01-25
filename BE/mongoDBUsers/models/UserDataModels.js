const { ObjectID } = require("bson");
const User = require("./UserSetUpModel");

exports.saveNewUser = (user) =>{
   return user.save()
        .then((result=>{
             return result;
        }))
}

exports.findUser = (password, email) =>{
    return User.find({email:email, password:password})
    .then((result)=>{
     console.log(result)
         return result;
    })
}


exports.inputJournalEntry = (username, journalEntry) =>{
    const journalProps = ['challengeName','challengeEntryNumber','journalEntry','date'];

    for(let i =0; i < journalProps.length;i++){
        if(journalEntry[journalProps[i]] === undefined){
            return Promise.reject({msg: "Missing part of journal entry", status:400});
        }
    }

    return User.find({username:username})
    .then((result)=>{
        if(result.length===0){
            console.log(result);
            return Promise.reject({msg: "User does not exist", status:400});
        }
    })
    .then(()=>{
        return User.updateOne({username: username}, { $push: 
            {dailyJournal:journalEntry}
        })
    })
    .then((result)=>{
        return result;
    })
}


exports.updateChallenge = (username, updates) => {
     if (typeof Object.values(updates)[0] !== "number" && Object.values(updates)[0] !== null) {return Promise.reject({status: 400, msg: 'Bad request'})}
     
     return User.findOneAndUpdate({username: username}, { $set: updates }, {
          new: true
        })
          .then((result) => {
               if (result === null) {
                    return Promise.reject({status: 404, msg: 'Not Found'})
               }
               return result;
          })
}


//get journal entries, sort by date
exports.getJournalEntriesInfo = (username,order="desc") => {
     if (order === "asc") {
          order = 1
     } else if (order == "desc"){
          order = -1
     } else if (order !=="asc" || order !=="desc") {
          return Promise.reject({status: 400, msg: 'Bad request'})
     }

     return User.find({username:username})
          .then((result)=>{
               if(result.length===0){
                    return Promise.reject({msg: "User does not exist", status:400});
               }
          })
          .then(() => {
               return User.aggregate([{$match:{username:username}},{$unwind:"$dailyJournal"},{$sort:{'dailyJournal.date':order}}])
               .then((result) => {
                    return result.map((entry) => {return entry.dailyJournal})
               })
          })

     
}

//get journal entries, filter by challenge, sort by date
exports.getFilterJournalInfo = (username,challenge,order="desc") => {
     if (order === "asc") {
          order = 1
     } else if (order == "desc"){
          order = -1
     } else if (order !=="asc" || order !=="desc") {
          return Promise.reject({status: 400, msg: 'Bad request'})
     }
     
     return User.find({username:username})
          .then((result)=>{
               if(result.length===0){
                    return Promise.reject({msg: "User does not exist", status:400});
               }
          })
          .then (() => {
               return User.find({[`challenges.${challenge}`]:{$exists:true}})
               .then((result) => {
                    if(result.length===0){
                         return Promise.reject({msg: "Bad request", status:400});
                    }
               })
          })
          .then(() => {
               return User.aggregate([{$match:{username:username}},{$project : {dailyJournal: {$filter: {input:'$dailyJournal',as:"entry", cond: {$eq: ['$$entry.challengeName',challenge]}}}}},{$unwind:"$dailyJournal"},{$sort: {'dailyJournal.date':order}}])
               .then((result) => {
                    return result.map((entry) => {return entry.dailyJournal})
               })
          })

    
}
