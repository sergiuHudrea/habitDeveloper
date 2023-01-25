const { ObjectID } = require("bson");
const User = require("./UserSetUpModel");

exports.saveNewUser = (user) =>{
   user.save()
        .then((result=>{
             return result;
        }))
}

exports.findUser = (password, email) =>{
    return User.find({email:email, password:password})
    .then((result)=>{
         return result;
    })
}

//get journal entries, sort by date
exports.getJournalEntriesInfo = (userId,order="desc") => {
     if (order === "asc") {
          order = 1
     } else if (order == "desc"){
          order = -1
     }
     
     return User.aggregate([{$match:{_id:ObjectID(userId)}},{$unwind:"$dailyJournal"},{$sort:{'dailyJournal.date':order}}])
     .then((result) => {
          return result.map((entry) => {return entry.dailyJournal})
     })
}

//get journal entries, filter by challenge, sort by date
exports.getFilterJournalInfo = (userId,challenge,order="desc") => {
     if (order === "asc") {
          order = 1
     } else if (order == "desc"){
          order = -1
     }
     
     return User.aggregate([{$match:{_id:ObjectID(userId)}},{$project : {dailyJournal: {$filter: {input:'$dailyJournal',as:"entry", cond: {$eq: ['$$entry.challengeName',challenge]}}}}},{$unwind:"$dailyJournal"},{$sort: {'dailyJournal.date':order}}])
     .then((result) => {
          return result.map((entry) => {return entry.dailyJournal})
     })
}
