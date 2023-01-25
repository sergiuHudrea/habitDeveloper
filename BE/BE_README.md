### GET /:email/:password  -- returns an object containing the respective user 

```{"_id":{"$oid":"63ca5fb92aecc47bd9f1f735"},
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
    challengeEntryNumber: 8,
    journalEntry: "mhg",
    date: 7
     }]
}
```
### GET /journal/:username  -- returns an array containing all journal entries of the username defaulted to date desc order unless query (?order=asc) given

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

### GET /journal/filter/:username  -- returns an array containing filtered journal entries as query (?challenge=<challengeName>) of the username defaulted to date desc order unless query (?order=asc) given. 

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