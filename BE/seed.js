const mongoose = require('mongoose');
const User = require('./mongoDBUsers/models/UserSetUpModel');
const express = require("express");

const app = express();	
app.use(express.json());
mongoose.set("strictQuery", false);

const uri = "mongodb+srv://theFantastic5:theFantastic54321@habitdeveloper.m1vjjrl.mongodb.net/habitDev?retryWrites=true&w=majority";
mongoose.connect(uri)
.then((result)=>{
     console.log("connected to db")
     app.listen(3005);
})
.catch((err)=>{
     console.log(err);
})

const seedTest = [ {
    username: "Sergiu",
    email: "shudrea@gmail.com",
    password: "iLoveCake",
    likes: 100,
    challenges: { 
      Sl_1_NoPhoneBeforeBed: { times: null, dates:[], streak: 0, badges: [0, 0, 0], title: "Avoid looking at screens when going to your bedroom.", description: "Gadget emits blue light which suppresses melatonin production and disturbs the sleep/wake cycle. An hour without screen time before bed is ideal, but you can first try with 10 or 20 minutes and build up from there.", img_url: "https://i.ibb.co/M6rfbq6/nophoneicon.png%22"},
      Sl_2_DimLights3hBeforeBed: {times: 0, dates:[], streak: 0, badges: [0, 0, 0], title: "Dim lights and reduce your exposure to them in the evening", description: "Dim the lights a full hour before bedtime to encourage your body to begin its physiological progression toward sleep. Use a dimmer switch on overhead lights to control their brightness, or install low-watt, dimmable bulbs in lamps.", img_url: "https://i.ibb.co/y8dbS4P/dim-light-icon.png%22"},
      Sl_3_RegularSleep: {times: 2, dates:[], streak: 0, badges: [0, 0, 0], title: "Stick to a schedule", description: "Establish a sleeping schedule with at least 7 hours of sleep and, then attempt to keep the same bedtime and wake up time every day. It`s alright to have variations within one hour of planned schedule.", img_url: "https://i.ibb.co/4mFDK43/regular-Sleepicon.png%22"},
      Sl_4_NoCoffe8hBeforeBed: {times: 8, dates:[], streak: 0, badges: [0, 0, 0], title: "Avoid caffeine 8-10 hours before bed", description: "Caffeine is a stimulate that stays in your system for hours and can affect your sleep. Avoiding consuming any caffeinated products 8-10 hours before your scheduled bedtime.", img_url: "https://i.ibb.co/kq1L7DS/no-coffee-icon.png%22"},
      Sl_5_NoLargeMealsBB: {times: 24, dates:[], streak: 0, badges: [0, 0, 0], title: "No large meals and beverages in the evening", description: "Heavy meals before bed can cause digestive issues which interferes with sleep. You can have light snacks before bed. Also, drinking too many fluids can cause frequent awakening to urinate.", img_url: "https://cdn-icons-png.flaticon.com/512/1517/1517798.png"},
      Sl_6_NoAlcoholBB: {times: 1, dates:[], streak: 0, badges: [0, 0, 0], title: "Avoid alcoholic drinks in the evening", description: "The presence of alcohol in the body can reduce your REM sleep, keeping you in the lighter stages of sleep. If you really enjoy a nightcap, try to limit it to one drink at least an hour before bed.", img_url: "https://i.ibb.co/JzgbpFd/no-alcohol-icon.png%22"},
      Sl_7_NoNapAfter3pm: {times: null, dates:[], streak: 0, badges: [0, 0, 0], title: "Don't nap after 3pm", description: "Taking a nap late in the day can disturb your sleep at night. Try doing something that excites you if you are really sleepy.", img_url: "https://i.ibb.co/FgzGDLP/no-nap-icon.png%22"},
      Sl_8_NaturalLight30Mins: {times: null, dates:[], streak: 0, badges: [0, 0, 0], title: "Get the right daily sunlight exposure", description: "Exposure to daylight in the morning and early afternoon supports more consistent and high-quality sleep. Try to get outside in the natural sunlight for at least 30 minutes per day.", img_url: "https://i.ibb.co/TT5kbXL/get-natural-light-icon.png%22"},
      Sl_9_OptimisedBedroomEnv: {times: null, dates:[], streak: 0, badges: [0, 0, 0], title: "Have a dark and cool (in temperature & style) bedroom", description: "Have the room temperature on the cool side to get better sleep. Set your thermostat to a comfortable temperature. Also, a dark and quiet bedroom is most conducive to sleep. You could try sleep masks and ear plugs as well.", img_url: "https://i.ibb.co/2PDD1W5/have-Cooldarkroomicon.png%22"},
      Sl_10_UnwindBB: {times: 44, dates:[], streak: 0, badges: [0, 0, 0], title: "Make sure to leave time to relax before bed", description: "Make sure to have some relaxation time before bed. Mind you relaxation time does not include screen time. If you find yourself still in bed for more than 20 minutes, or you`re starting to get anxious in bed, get up and do something else until you feel sleepy.", img_url: "https://static.thenounproject.com/png/101872-200.png"}
      },
    uniqueUserLink: "",
    dailyJournal: [{
      challengeName: "Sl_3_RegularSleep",
      title: "Stick to a schedule",
      challengeEntryNumber: 1,
      journalEntry: "aaaaa",
      date: 3
      },
      {
        challengeName: "Sl_3_RegularSleep",
        title: "Stick to a schedule",
        challengeEntryNumber: 2,
        journalEntry: "bba",
        date: 7
        },
      {
        challengeName: "Sl_4_NoCoffe8hBeforeBed",
        title: "Avoid caffeine 8-10 hours before bed",
        challengeEntryNumber: 1,
        journalEntry: "bb",
        date: 22
      },
      {
        challengeName: "Sl_4_NoCoffe8hBeforeBed",
        title: "Avoid caffeine 8-10 hours before bed",
        challengeEntryNumber: 4,
        journalEntry: "h",
        date: 67
        },
      {
        challengeName: "Sl_4_NoCoffe8hBeforeBed",
        title: "Avoid caffeine 8-10 hours before bed",
        challengeEntryNumber: 6,
        journalEntry: "x",
        date: 56345
      },
      {
        challengeName: "Sl_6_NoAlcoholBB",
        title: "Avoid alcoholic drinks in the evening",
        challengeEntryNumber: 1,
        journalEntry: "u",
        date: 5654
        },
        {
        challengeName: "Sl_4_NoCoffe8hBeforeBed",
        title: "Avoid caffeine 8-10 hours before bed",
        challengeEntryNumber: 7,
        journalEntry: "sfdads",
        date: 3
        },
        {
        challengeName: "Sl_4_NoCoffe8hBeforeBed",
        title: "Avoid caffeine 8-10 hours before bed",
        challengeEntryNumber: 8,
        journalEntry: "mhg",
        date: 7
         }]
    }
  ]

const seeDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedTest);
}

seeDB().then(() => {
  mongoose.connection.close()
})
