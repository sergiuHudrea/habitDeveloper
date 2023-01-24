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