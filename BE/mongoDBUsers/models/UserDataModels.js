const User = require("./UserSetUpModel");
const { ObjectID } = require("bson");

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
            Sl_1_NoPhoneBeforeBed: { times: null, dates:[], streak: 0, badges: [], title: "Avoid looking at screens when going to your bedroom.", description: "Gadget emits blue light which suppresses melatonin production and disturbs the sleep/wake cycle. An hour without screen time before bed is ideal, but you can first try with 10 or 20 minutes and build up from there.", img_url: "https://i.ibb.co/M6rfbq6/nophoneicon.png%22"},
            Sl_2_DimLights3hBeforeBed: {times: null, dates:[], streak: 0, badges: [], title: "Dim lights and reduce your exposure to them in the evening", description: "Dim the lights a full hour before bedtime to encourage your body to begin its physiological progression toward sleep. Use a dimmer switch on overhead lights to control their brightness, or install low-watt, dimmable bulbs in lamps.", img_url: "https://i.ibb.co/y8dbS4P/dim-light-icon.png%22"},
            Sl_3_RegularSleep: {times: null, dates:[], streak: 0, badges: [], title: "Stick to a schedule", description: "Establish a sleeping schedule with at least 7 hours of sleep and, then attempt to keep the same bedtime and wake up time every day. It`s alright to have variations within one hour of planned schedule.", img_url: "https://i.ibb.co/4mFDK43/regular-Sleepicon.png%22"},
            Sl_4_NoCoffe8hBeforeBed: {times: null, dates:[], streak: 0, badges: [], title: "Avoid caffeine 8-10 hours before bed", description: "Caffeine is a stimulate that stays in your system for hours and can affect your sleep. Avoiding consuming any caffeinated products 8-10 hours before your scheduled bedtime.", img_url: "https://i.ibb.co/kq1L7DS/no-coffee-icon.png%22"},
            Sl_5_NoLargeMealsBB: {times: null, dates:[], streak: 0, badges: [], title: "No large meals and beverages in the evening", description: "Heavy meals before bed can cause digestive issues which interferes with sleep. You can have light snacks before bed. Also, drinking too many fluids can cause frequent awakening to urinate.", img_url: "https://i.ibb.co/ncZL0yW/large-meal-icon.png%22"},
            Sl_6_NoAlcoholBB: {times: null, dates:[], streak: 0, badges: [], title: "Avoid alcoholic drinks in the evening", description: "The presence of alcohol in the body can reduce your REM sleep, keeping you in the lighter stages of sleep. If you really enjoy a nightcap, try to limit it to one drink at least an hour before bed.", img_url: "https://i.ibb.co/JzgbpFd/no-alcohol-icon.png%22"},
            Sl_7_NoNapAfter3pm: {times: null, dates:[], streak: 0, badges: [], title: "Don't nap after 3pm", description: "Taking a nap late in the day can disturb your sleep at night. Try doing something that excites you if you are really sleepy.", img_url: "https://i.ibb.co/FgzGDLP/no-nap-icon.png%22"},
            Sl_8_NaturalLight30Mins: {times: null, dates:[], streak: 0, badges: [], title: "Get the right daily sunlight exposure", description: "Exposure to daylight in the morning and early afternoon supports more consistent and high-quality sleep. Try to get outside in the natural sunlight for at least 30 minutes per day.", img_url: "https://i.ibb.co/TT5kbXL/get-natural-light-icon.png%22"},
            Sl_9_OptimisedBedroomEnv: {times: null, dates:[], streak: 0, badges: [], title: "Have a dark and cool (in temperature & style) bedroom", description: "Have the room temperature on the cool side to get better sleep. Set your thermostat to a comfortable temperature. Also, a dark and quiet bedroom is most conducive to sleep. You could try sleep masks and ear plugs as well.", img_url: "https://i.ibb.co/2PDD1W5/have-Cooldarkroomicon.png%22"},
            Sl_10_UnwindBB: {times: null, dates:[], streak: 0, badges: [], title: "Make sure to leave time to relax before bed", description: "Make sure to have some relaxation time before bed. Mind you relaxation time does not include screen time. If you find yourself still in bed for more than 20 minutes, or you`re starting to get anxious in bed, get up and do something else until you feel sleepy.", img_url: "https://i.ibb.co/C2WJn31/relax-icon.png%22"}
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
            return Promise.reject({msg: "User does not exist", status:404});
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
            if (/\.+(title|description)/.test(Object.keys(updates)[0])) {return Promise.reject({status: 400, msg: 'Bad request. You cannot change the title or description.'})}
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

//delete journal Entry
exports.removeJournalEntry = (entryId) => {
     return User.countDocuments({'dailyJournal._id':ObjectID(entryId)})
     .then((result) => {
          if(result===0){
               return Promise.reject({msg: "Bad request", status:400});
          }
     })
     .then(() => {
          return User.updateMany({}, {$pull:{'dailyJournal':{_id: ObjectID(entryId)}}})
     })
    //  .catch((err) => {
    //     console.log(err, ">>>error")
    //     return Promise.reject({msg: "Bad request", status:400});
    //  })
    
    //  return User.updateMany({}, {$pull:{'dailyJournal':{challengeName: 'Sl_1_NoPhoneBeforeBed'}}})
    // return User.find()
    // .then((result) => {
    //     return result
    // })
     
}