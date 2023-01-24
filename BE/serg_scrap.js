// Soort Array for 5.2 Mongo version
db.Users.aggregate( [
    { $project:
    {
        _id: "63ca5fb92aecc47bd9f1f735",
        result:
         {
            $sortArray: { input: "$dailyJournal", sortBy: {body: 1} }
         }
    }}
  ])
  
  // Display
  db.Users.find()
  
  // Change chalenge status or increment it --- needs to be changed to accept id and update well
  db.Users.update({username: "Sergiu"}, { $set: { "challenges.Sl_5_NoLargeMealsBB": 35}})
  
  
  // Inc likes
  db.Users.update({ username: "Sergiu"}, { $inc: {likes: 1}})
  
  // Change medals
  db.Users.update({username: "Sergiu"}, { $set: { "medals.Sl_1": 100}})
  
  // Insert data
  
  db.Test.insert({
  username: "Sergiu",
  email: "shudrea@gmail.com",
  password: "iLoveCake",
  likes: 100,
  challenges: { 
                Sl_1_NoPhoneBeforeBed: null,
                Sl_2_DimLights3hBeforeBed: 0,
                Sl_3_RegularSleep: 2,
                Sl_4_NoCoffe8hBeforeBed: 8,
                Sl_5_NoLargeMealsBB: 24,
                Sl_6_NoAlcoholBB: 1,
                Sl_7_NoNapAfter3pm: null,
                Sl_8_NaturalLight30Mins: null,
                Sl_9_OptimisedBedroomEnv: null,
                Sl_10_UnwindBB: 44
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
  
  
  
  
  
  // Signup
  db.Users.insert({
  username: USERNAME,
  email: EMAIL,
  password: PASSWORD,
  likes: 0,
  challenges: { 
                  Sl_1_NoPhoneBeforeBed: null,
                  Sl_2_DimLights3hBeforeBed: null,
                  Sl_3_RegularSleep: null,
                  Sl_4_NoCoffe8hBeforeBed: null,
                  Sl_5_NoLargeMealsBB: null,
                  Sl_6_NoAlcoholBB: null,
                  Sl_7_NoNapAfter3pm: null,
                  Sl_8_NaturalLight30Mins: null,
                  Sl_9_OptimisedBedroomEnv: null,
                  Sl_10_UnwindBB: null
                  },
  uniqueUserLink: "",
  medals: {
    Sl_1: 0,
    Sl_2: 0,
    Sl_3: 0,
    Sl_4: 0,
    Sl_5: 0,
    Sl_6: 0,
    Sl_7: 0,
    Sl_8: 0,
    Sl_9: 0,
    Sl_10: 0
            },
  dailyJournal: []
  })
  
  // Push element to array (JournalEntry)
  db.Users.update({_id: "63ce737398713ef9f956c3d3"}, { $push: {dailyJournal: 
    {
      challengeName: "Sl_6_NoAlcoholBB",
      challengeEntryNumber: 1,
      journalEntry: "1231232321",
      date: 5654
        }
  }})
  
  // Add to Object but overrides everything
  db.Users.update({username: "Sergiu"}, { $set: {challenges: 
    {
        Sl_1_NoPhoneBeforeBedaaaa: 0
        }
  }})
  
  // Sort for 4.0 -- atlas
  
  db.Users.aggregate(
  { $match: {username: "Sergiu"}}, {$unwind: '$dailyJournal'}, 
  { $sort: {'dailyJournal.date': 1 }}
  )
  
  // Sign in
  db.Users.find({email: EMAIL, password: PASSWORD})
  
  
  
  db.Users.aggregate(
    { $match: {username: "Sergiu"}}, {$unwind: '$dailyJournal'}, 
    { $sort: {'dailyJournal.challengeName': 1 }}
    )
  
  
  
  
  
  
  
  // Dummy data
  
  {"_id":{"$oid":"63ca5fb92aecc47bd9f1f735"},
  "username": "Sergiu",
  "email": "shudrea@gmail.com",
  "password": "iLoveCake123",
  "likes: 9999999,
  "challenges": { 
                "Sl_1_NoPhoneBeforeBed": {active: true
                                          timesDone: 0},
                "Sl_2_DimLights2hBeforeBed": 0,
                "Sl_3_regularSleep": 0,
                "Sl_4_NoCoffe8hBeforeBed": 0,
                "We_1_Take10minWalk: 0,
                },
  "dailyJournal": [{
  "challengeName": "SlNoPhoneBeforeBed",
  "body": "I feelt quite good",
  "date": Date()
  }],
  "uniqueUserLink": "sergiuHabit@323rdas",
  medals: {
   Sl_1_bronze: true,
   Sl_1_silver: false,
   Sl_1_gold: false,
   Sl_2_bronze: true,
   Sl_2_silver: false,
   Sl_2_gold: false,
   Sl_3_bronze: true,
   Sl_3_silver: true,
   Sl_3_gold: false,
   Sl_4_bronze: true,
   Sl_4_silver: false,
   Sl_4_gold: true,
   }
  }
  
  db.Users.insert({
  username: "Sergiu",
  email: "shudrea@gmail.com",
  password: "iLoveCake123",
  likes: 9999999,
  challenges: { 
                Sl_1_NoPhoneBeforeBed: 0,
                Sl_2_DimLights2hBeforeBed: 0,
                Sl_3_regularSleep: 0,
                Sl_4_NoCoffe8hBeforeBed: 0,
                We_1_Take10minWalk: 0,
                },
  dailyJournal: [{
  challengeName: "SlNobdfgas",
  body: "a",
  date: 2
  },
  {
    challengeName: "assasas",
    body: "c",
    date: 5
    },
  {
  challengeName: "xcvx",
  body: "d",
  date: 23
  },
  {
    challengeName: "vasddf",
    body: "b",
    date: 3
    },
  {
  challengeName: "saa",
  body: "x",
  date: 999
  },
  {
    challengeName: "SlNo",
    body: "asfg",
    date: 34
    },
    {
        challengeName: "SlNo",
        body: "ugf",
        date: 6456
        },
        {
            challengeName: "SlNoPhoneBeforeBed",
            body: "ny",
            date: 234
            }]
  })
  
  
  // Push element to array
  db.Users.update({username: "Sergiu"}, { $push: {dailyJournal: 
    {
        challengeName: "aaadsasaa",
        body: "asasdsdfg",
        date: 34
        },
  }})
  
  // Add to Object
  db.Users.update({username: "Sergiu"}, { $set: {challenges: 
    {
        Sl_1_NoPhoneBeforeBed: 0
        }
  }})