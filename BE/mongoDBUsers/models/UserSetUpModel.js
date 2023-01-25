const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const schema = mongoose.Schema;

mongoose.set("strictQuery", false);

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
        Sl_1_NoPhoneBeforeBed: {
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
                }
            },
        Sl_2_DimLights3hBeforeBed: {
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
                }
            },
        Sl_3_RegularSleep: {
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
                }
            },
        Sl_4_NoCoffe8hBeforeBed: {
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
                }
            },
        Sl_5_NoLargeMealsBB: {
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
                }
            },
        Sl_6_NoAlcoholBB: {
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
                }
            },
        Sl_7_NoNapAfter3pm: {
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
                }
            },
        Sl_8_NaturalLight30Mins: {
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
                }
            },
        Sl_9_OptimisedBedroomEnv: {
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
                }
            },
        Sl_10_UnwindBB: {
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
                }
            }
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
            type:String,
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
const User = mongoose.model('User', userSchema, "Test");

module.exports = User;