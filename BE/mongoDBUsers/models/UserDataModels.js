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

//get journal entries, filter by challenge, sort by date
exports.getJournalEntriesInfo = (userId,challenge,order="desc") => {
     if (order === "asc") {
          order = 1
     } else if (order == "desc"){
          order = -1
     }
     console.log(challenge,order)
     
     return User.aggregate([{$match:{_id:ObjectID(userId)}},{$project : {dailyJournal: {$filter: {input:'$dailyJournal',as:"entry", cond: {$eq: ['$$entry.challengeName','Sl_4_NoCoffe8hBeforeBed']},{$sort:{'dailyJournal.date':order}}}}}}])
     .then((result) => {
          return result.map((entry) => {return entry.dailyJournal})
     })
}

// User.aggregate([{$match:{_id:ObjectID(userId)}},{$unwind:"$dailyJournal"},{$sort:{'dailyJournal.date':order}},{$filter: {input:"$dailyJournal", cond:["$dailyJournal.challengeName",challenge]}}])

// User.aggregate([{$match:{_id:ObjectID(userId)}},{$filter: {input:"$dailyJournal", cond:["$dailyJournal.challengeName",challenge]},{$unwind:"$dailyJournal"},{$sort:{'dailyJournal.date':order}}}])


//sort mongodb
// User.aggregate([{$match:{_id:ObjectID(userId)}},{$unwind:"$dailyJournal"},{$sort:{'dailyJournal.date':order}}])

// db.Users.aggregate($project : {dailyJournal: {$filter: {input:'$dailyJournal',as:"entry", cond: {$eq: ['$$entry.challengeName','Sl_4_NoCoffe8hBeforeBed']}}}})

//filter
// db.Users.aggregate([{$match:{username:"Sergiu"}},{$project : {dailyJournal: {$filter: {input:'$dailyJournal',as:"entry", cond: {$eq: ['$$entry.challengeName','Sl_4_NoCoffe8hBeforeBed']}}}}}])