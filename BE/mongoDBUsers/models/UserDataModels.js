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