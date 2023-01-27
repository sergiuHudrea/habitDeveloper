### GET /api/:email/:password  -- returns an object containing the respective user 

```{"_id":{"$oid":"63ca5fb92aecc47bd9f1f735"},
    username: "Sergiu",
    email: "shudrea@gmail.com",
    password: "iLoveCake",
    likes: 100,
    challenges: { 
                  Sl_1_NoPhoneBeforeBed: {times: -1, dates:[], streak: 0},
                  Sl_2_DimLights3hBeforeBed: {times: 0, dates:[], streak: 0},
                  Sl_3_RegularSleep: {times: 2, dates:[], streak: 0},
                  Sl_4_NoCoffe8hBeforeBed: {times: 8, dates:[], streak: 0},
                  Sl_5_NoLargeMealsBB: {times: 24, dates:[], streak: 0},
                  Sl_6_NoAlcoholBB: {times: 1, dates:[], streak: 0},
                  Sl_7_NoNapAfter3pm: {times: -1, dates:[], streak: 0},
                  Sl_8_NaturalLight30Mins: {times: -1, dates:[], streak: 0},
                  Sl_9_OptimisedBedroomEnv: {times: -1, dates:[], streak: 0},
                  Sl_10_UnwindBB: {times: 44, dates:[], streak: 0}
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
    }
```
### GET /api/journal/:email  -- returns an array containing all journal entries of the email defaulted to date desc order unless query (?order=asc) given

```
[
      {
        challengeName: 'Sl_4_NoCoffe8hBeforeBed',
        challengeEntryNumber: 6,
        journalEntry: 'x',
        date: 56345
      },
      {
        challengeName: 'Sl_6_NoAlcoholBB',
        challengeEntryNumber: 1,
        journalEntry: 'u',
        date: 5654
      },
      {
        challengeName: 'Sl_4_NoCoffe8hBeforeBed',
        challengeEntryNumber: 4,
        journalEntry: 'h',
        date: 67
      },
      {
        challengeName: 'Sl_4_NoCoffe8hBeforeBed',
        challengeEntryNumber: 1,
        journalEntry: 'bb',
        date: 22
      },
      {
        challengeName: 'Sl_3_RegularSleep',
        challengeEntryNumber: 2,
        journalEntry: 'bba',
        date: 7
      },
      {
        challengeName: 'Sl_4_NoCoffe8hBeforeBed',
        challengeEntryNumber: 8,
        journalEntry: 'mhg',
        date: 7
      },
      {
        challengeName: 'Sl_3_RegularSleep',
        challengeEntryNumber: 1,
        journalEntry: 'aaaaa',
        date: 3
      },
      {
        challengeName: 'Sl_4_NoCoffe8hBeforeBed',
        challengeEntryNumber: 7,
        journalEntry: 'sfdads',
        date: 3
      }
    ]
```

### GET /api/journal/filter/:email  -- returns an array containing filtered journal entries as query (?challenge="challengeName") of the email defaulted to date desc order unless query (?order=asc) given. 

```
 [
      {
        challengeName: 'Sl_4_NoCoffe8hBeforeBed',
        challengeEntryNumber: 7,
        journalEntry: 'sfdads',
        date: 3
      },
      {
        challengeName: 'Sl_4_NoCoffe8hBeforeBed',
        challengeEntryNumber: 8,
        journalEntry: 'mhg',
        date: 7
      },
      {
        challengeName: 'Sl_4_NoCoffe8hBeforeBed',
        challengeEntryNumber: 1,
        journalEntry: 'bb',
        date: 22
      },
      {
        challengeName: 'Sl_4_NoCoffe8hBeforeBed',
        challengeEntryNumber: 4,
        journalEntry: 'h',
        date: 67
      },
      {
        challengeName: 'Sl_4_NoCoffe8hBeforeBed',
        challengeEntryNumber: 6,
        journalEntry: 'x',
        date: 56345
      }
    ]
```

### PATCH /api/challenges/:email -- takes an object (challenge), array of strings (dates) or numbers (streak and times) and patches the respective challenge.
```
queries: username
exampleInput: { "challenges.Sl_3_RegularSleep": {
        times: 2, 
        dates: ["32323", "4234", "54"], 
        streak: 100}
        },
 
exampleResponse: {
    username: "Sergiu",
    email: "shudrea@gmail.com",
    password: "iLoveCake",
    likes: 100,
    challenges: { 
                  Sl_1_NoPhoneBeforeBed: {times: -1, dates:[], streak: 0},
                  Sl_2_DimLights3hBeforeBed: {times: 0, dates:[], streak: 0},
                  Sl_3_RegularSleep: {
                                      times: 2, 
                                      dates: ["32323", "4234", "54"], 
                                      streak: 100}
                                      },
                  Sl_4_NoCoffe8hBeforeBed: {times: 8, dates:[], streak: 0},
                  Sl_5_NoLargeMealsBB: {times: 24, dates:[], streak: 0},
                  Sl_6_NoAlcoholBB: {times: 1, dates:[], streak: 0},
                  Sl_7_NoNapAfter3pm: {times: -1, dates:[], streak: 0},
                  Sl_8_NaturalLight30Mins: {times: -1, dates:[], streak: 0},
                  Sl_9_OptimisedBedroomEnv: {times: -1, dates:[], streak: 0},
                  Sl_10_UnwindBB: {times: 44, dates:[], streak: 0}
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
    }

ALTERNATIVELY if you only want to PATCH a key of a certain CHALLENGE you can use these INPUTS as well:
exampleInput: {
  "challenges.Sl_3_RegularSleep.streak": 2
  }
exampleInput: {
  "challenges.Sl_6_NoAlcoholBB.dates": ["1234243234", "23424423"]
    }
exampleInput: {
  "challenges.2_DimLights3hBeforeBed.times": 55
    }
```

### PATCH /api/journal/:email -- takes a journalEntry object and inserts a journal entry into the dailyJournal array
```
An example of journalEntry object to send can be seen below:

const journalEntry = {
            challengeName: "Sl_1_NoPhoneBeforeBed",
            challengeEntryNumber:0,
            journalEntry:"Day 1, feeling good :)",
            date: new Date()
        }
There are a number of custom errors if this API call is not invoked correctly.

An incomplete journalEntry:

const journalEntry = {
            challengeName: "Sl_1_NoPhoneBeforeBed",
            challengeEntryNumber:0,
            date: new Date()
        }
 This will return a 400 code and "Missing part of journal entry" message.
 
 User does not exist:
 
 .patch("/journal/:non-ExistentUser")
 
 This will return a 400 code and "User does not exist" message.
 ```
 
 ### POST /api/user -- takes a new users details and creats a user entry in the database
```
An example of newUser object to send can be seen below:

const newUser = {
        username: "Michael",
        email:"Michael.rivett@yahoo.au",
        password:"password",
        }
There are a number of custom errors if this API call is not invoked correctly.

An incomplete newUser:

const newUser = {
        email:"Michael.rivett@yahoo.au",
        password:"password",
        }
 This will return a 400 code and "Missing info" message.
 
 Email already exists:
 
 This will return a 400 code and "Email already existst" message.
 
 Username already exists:
 This will return a 400 code and "Username already existst" message.

 
 ```

 ### DELETE /api/journalEntry/:entryId -- delete jounral entry based on dailyJournal._id of dailyJournal Entry

```
returns 202 when deleted sucessfully
returns 404 when entryId is invlaid
returns 400 when entryId is valid but non-existent 
```
