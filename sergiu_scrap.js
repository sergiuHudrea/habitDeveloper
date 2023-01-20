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

db.Users.find()

db.Users.update({username: "Sergiu"}, { $set: {medals: {
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
    }}})



    db.Users.aggregate( [
        { $project:
        {
            _id: "63ca5fb92aecc47bd9f1f735",
            result:
             {
                $sortArray: { input: "$medals", sortBy: {body: -1} }
             }
        }}
    ])











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