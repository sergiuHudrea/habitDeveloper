const mongoose = require('mongoose');
const schema = mongoose.Schema;

mongoose.set("strictQuery", false);

const userSchema = schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    likes:{
        type:Number,
        required: true
    },
    challenges:{
            type:Object,
            default: {},
            Challenge_Code: {
                times: {
                    type: Number,
                    required: true
                    }, 
                dates:{
                    type: [String],
                    required: true
                    }, 
                streak: {
                    type: Number,
                    required: true
                    },
                badges: {
                    type: [Number],
                    required: true
                },
                title: {
                    type: String,
                    required: true
                    },
                description: {
                    type: String,
                    required: true
                    },
                img_url: {
                    type: String,
                    required: true
                    },
                }
                
    },
    uniqueUserLink:{
        type:String,
        required:false,
    },
    dailyJournal:[{
        challengeName:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        challengeEntryNumber:{
            type:Number,
            required:true,
        }
        ,
        journalEntry:{
            type:String,
            required:true,
        },
        date:{
            type:Date,
            required:true,
        },
        happinessIndex:{
            type:Number,
            required:true
        }
    }]
},    
{ minimize: false }
)
const User = mongoose.model('User', userSchema, "Test");

module.exports = User;