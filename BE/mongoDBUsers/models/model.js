const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const schema = mongoose.Schema;

//could also add timestamp property 16:49 on video
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
    },
    uniqueUserLink:{
        type:String,
        required:false,
    },
    medals:{
    type:Object,
    default:{}
    },
    dailyJournal:[{
        challengeName:{
            type:Array,
            required:false,
        },
        challengeEntryNumber:{
            type:Number,
            required:false,
        }
        ,
        journalEntry:{
            type:String,
            required:false,
        },
        date:{
            type:Date,
            required:false,
        }
    }]
},    
{ minimize: false }
)
const User = mongoose.model('User', userSchema, "Users");

module.exports = User;