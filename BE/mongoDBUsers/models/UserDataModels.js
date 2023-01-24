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