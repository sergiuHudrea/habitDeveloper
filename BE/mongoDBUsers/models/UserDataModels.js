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
        likes: 0,
        challenges: { 
          Sl_1_NoPhoneBeforeBed: {times: -1, dates:[], streak: 0, badges: [], title: "", description: "", img_url: ""},
          Sl_2_DimLights3hBeforeBed: {times: -1, dates:[], streak: 0, badges: [], title: "", description: "", img_url: ""},
          Sl_3_RegularSleep: {times: -1, dates:[], streak: 0, badges: [], title: "", description: "", img_url: ""},
          Sl_4_NoCoffe8hBeforeBed: {times: -1, dates:[], streak: 0, badges: [], title: "", description: "", img_url: ""},
          Sl_5_NoLargeMealsBB: {times: -1, dates:[], streak: 0, badges: [], title: "", description: "", img_url: ""},
          Sl_6_NoAlcoholBB: {times: -1, dates:[], streak: 0, badges: [], title: "", description: "", img_url: ""},
          Sl_7_NoNapAfter3pm: {times: -1, dates:[], streak: 0, badges: [], title: "", description: "", img_url: ""},
          Sl_8_NaturalLight30Mins: {times: -1, dates:[], streak: 0, badges: [], title: "", description: "", img_url: ""},
          Sl_9_OptimisedBedroomEnv: {times: -1, dates:[], streak: 0, badges: [], title: "", description: "", img_url: ""},
          Sl_10_UnwindBB: {times: -1, dates:[], streak: 0, badges: [], title: "", description: "", img_url: ""}
          },
        uniqueUserLink: "",
        dailyJournal: []
        })

        return User.find({email:nUser.email})
        .then((result)=>{
            if(result.length!==0){
                return Promise.reject({msg: "Email already exists", status:400});
            }
        })
        .then(()=>{
            return User.find({username:nUser.username})
        })
        .then((result)=>{
            if(result.length!==0){
                return Promise.reject({msg: "Username already exists", status:400});
            }
        })
        .then(()=>{
            return nUser.save()
        })
        .then((result)=>{
            return result;
       })
}

exports.findUser = (password, email) =>{
    return User.find({email:email})
    .then((result)=>{
        if(result.length===0){
            return Promise.reject({msg: "Email does not exist", status:404});
        }
    })
    .then(()=>{
        return User.find({email:email, password:password})
    })
    .then((result)=>{
        if(result.length===0){
            return Promise.reject({msg: "Password is incorrect", status:404});
        }
        return result;
    })
}


exports.inputJournalEntry = (email, journalEntry) =>{
    const journalProps = ['challengeName','challengeEntryNumber','journalEntry','date'];

    for(let i =0; i < journalProps.length;i++){
        if(journalEntry[journalProps[i]] === undefined){
            return Promise.reject({msg: "Missing part of journal entry", status:400});
        }
    }

    return User.find({email:email})
    .then((result)=>{
        if(result.length===0){
            return Promise.reject({msg: "Email does not exist", status:400});
        }
    })
    .then(()=>{
        return User.updateOne({email: email}, { $push: 
            {dailyJournal:journalEntry}
        })
    })
    .then((result)=>{
        return result;
    })
}


exports.updateChallenge = (email, updates) => {
   return User.find({ [Object.keys(updates)[0]] : {$exists: true}})
    .then((res) => {
        
        if (res.length === 0 ) {return Promise.reject({status: 400, msg: 'Bad request'}) }
    })
    .then(()=> {
        return User.findOneAndUpdate({email: email}, { $set: updates }, {
                new: true
            }) })
    .then((result) => {
        if (result === null) { return Promise.reject({status: 404, msg: 'Not Found'}) }
        return result;
                })
   
}



//get journal entries, sort by date
exports.getJournalEntriesInfo = (email,order="desc") => {
     if (order === "asc") {
          order = 1
     } else if (order == "desc"){
          order = -1
     } else if (order !=="asc" || order !=="desc") {
          return Promise.reject({status: 400, msg: 'Bad request'})
     }

     return User.find({email:email})
          .then((result)=>{
               if(result.length===0){
                    return Promise.reject({msg: "Email does not exist", status:400});
               }
          })
          .then(() => {
               return User.aggregate([{$match:{email:email}},{$unwind:"$dailyJournal"},{$sort:{'dailyJournal.date':order}}])
               .then((result) => {
                    return result.map((entry) => {return entry.dailyJournal})
               })
          })

     
}

//get journal entries, filter by challenge, sort by date
exports.getFilterJournalInfo = (email,challenge,order="desc") => {
     if (order === "asc") {
          order = 1
     } else if (order == "desc"){
          order = -1
     } else if (order !=="asc" || order !=="desc") {
          return Promise.reject({status: 400, msg: 'Bad request'})
     }
     
     return User.find({email:email})
          .then((result)=>{
               if(result.length===0){
                    return Promise.reject({msg: "Email does not exist", status:400});
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
               return User.aggregate([{$match:{email:email}},{$project : {dailyJournal: {$filter: {input:'$dailyJournal',as:"entry", cond: {$eq: ['$$entry.challengeName',challenge]}}}}},{$unwind:"$dailyJournal"},{$sort: {'dailyJournal.date':order}}])
               .then((result) => {
                    return result.map((entry) => {return entry.dailyJournal})
               })
          })

    
}

