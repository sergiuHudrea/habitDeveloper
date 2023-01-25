const { ObjectID } = require("bson");
const User = require("./UserSetUpModel");

exports.saveNewUser = (username, email, password) =>{
    if(username === undefined || email === undefined || password === undefined){
        return Promise.reject({msg: "Missing info", status:400});
    }
    const nUser = new User({
        username: username,
        email: email,
        password: password,
        likes: 100,
        challenges: { 
                      Sl_1_NoPhoneBeforeBed: {times: -1, dates:[], streak: 0},
                      Sl_2_DimLights3hBeforeBed: {times: 0, dates:[], streak: 0},
                      Sl_3_RegularSleep: {times: 2, dates:[], streak: 0},
                      Sl_4_NoCoffe8hBeforeBed: {times: 8, dates:[], streak: 0},
                      Sl_5_NoLargeMealsBB: {times: 24, dates:[], streak: 0},
                      Sl_6_NoAlcoholBB: {times: 1, dates:[], streak: 0},
                      Sl_7_NoNapAfter3pm: {times: -1, dates:[], streak: 0},
                      Sl_8_NaturalLight30Mins: {times: -1, dates:[], streak: 0},
                      Sl_9_OptimisedBedroomEnv: {times: -1, dates:[], streak: 0},
                      Sl_10_UnwindBB: {times: 44, dates:[], streak: 0}
                      },
        uniqueUserLink: "",
        medals: {
        Sl_1: 0,
        Sl_2: 0,
        Sl_3: 0,
        Sl_4: 1,
        Sl_5: 2,
        Sl_6: 0,
        Sl_7: 0,
        Sl_8: 0,
        Sl_9: 0,
        Sl_10: 3
                },
        dailyJournal: [{
        challengeName: "Sl_3_RegularSleep",
        challengeEntryNumber: 1,
        journalEntry: "aaaaa",
        date: 3
        },
        {
          challengeName: "Sl_3_RegularSleep",
          challengeEntryNumber: 2,
          journalEntry: "bba",
          date: 7
          },
        {
          challengeName: "Sl_4_NoCoffe8hBeforeBed",
          challengeEntryNumber: 1,
          journalEntry: "bb",
          date: 22
        },
        {
          challengeName: "Sl_4_NoCoffe8hBeforeBed",
          challengeEntryNumber: 4,
          journalEntry: "h",
          date: 67
          },
        {
          challengeName: "Sl_4_NoCoffe8hBeforeBed",
          challengeEntryNumber: 6,
          journalEntry: "x",
          date: 56345
        },
        {
          challengeName: "Sl_6_NoAlcoholBB",
          challengeEntryNumber: 1,
          journalEntry: "u",
          date: 5654
          },
          {
          challengeName: "Sl_4_NoCoffe8hBeforeBed",
          challengeEntryNumber: 7,
          journalEntry: "sfdads",
          date: 3
          },
          {
          challengeName: "Sl_4_NoCoffe8hBeforeBed",
          challengeEntryNumber: 8,
          journalEntry: "mhg",
          date: 7
           }]
        })

        return User.find({username:nUser.username})
        .then((result)=>{
            if(result.length!==0){
                return Promise.reject({msg: "Username already exists", status:400});
            }
        })
        .then(()=>{
            return User.find({email:nUser.email})
        })
        .then((result)=>{
            if(result.length!==0){
                return Promise.reject({msg: "Email already exists", status:400});
            }
        })
        .then(()=>{
            console.log(nUser);
            return nUser.save()
        })
        .then((result)=>{
            return result;
       })
}

exports.findUser = (password, email) =>{
    return User.find({email:email, password:password})
    .then((result)=>{
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
   return User.find({ [Object.keys(updates)[0]] : {$exists: true}})
    .then((res) => {
        
        if (res.length === 0 ) {return Promise.reject({status: 400, msg: 'Bad request'}) }
    })
    .then(()=> {
        return User.findOneAndUpdate({username: username}, { $set: updates }, {
                new: true
            }) })
    .then((result) => {
        if (result === null) { return Promise.reject({status: 404, msg: 'Not Found'}) }
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

