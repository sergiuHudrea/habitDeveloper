// const { default: test } = require('node:test');
const request = require('supertest');
// const User = require("./models/UserSetUpModel");
// const { describe } = require('test');
const app = require("../mongoDbJSUsers");
jest.setTimeout(5000);


describe('1. GET /user/:username/:password', () =>{

    test("status:200, returns a user object with their app details", ()=>{
        return request(app)
        .get('/user/shudrea@gmail.com/iLoveCake')
        .expect(200)
        .then((response)=>{
            const user = response._body[0];
            expect(user).toBeInstanceOf(Object);
            expect(user.username).toBe("Sergiu");
        })
    })
  })


describe("Patching the journal entry", () =>{

    test("status 201, returns 201 confirming patch of new journal entry", ()=>{
        const journalEntry = {
            challengeName: "Sl_1_NoPhoneBeforeBed",
            challengeEntryNumber:0,
            journalEntry:"Day 1, feeling good :)",
            date: new Date()
        }
        return request(app)
        .patch("/journal/Karl")
        .send(journalEntry)
        .expect(201)
    })

    test("status 400, journalEntry object is missing data", ()=>{
        const journalEntry = {
            challengeName: "Sl_1_NoPhoneBeforeBed",
            challengeEntryNumber:0,
            date: new Date()
        }
        return request(app)
        .patch("/journal/Karl")
        .send(journalEntry)
        .expect(400)
        .then((response)=>{
            expect(response._body.msg).toBe("Missing part of journal entry");
        })
    })

    test("status 400, user does not exist ", ()=>{
        const journalEntry = {
            challengeName: "Sl_1_NoPhoneBeforeBed",
            challengeEntryNumber:0,
            journalEntry:"Day 1, feeling good :)",
            date: new Date()
        }
        return request(app)
        .patch("/journal/Kar")
        .send(journalEntry)
        .expect(400)
        .then((response)=>{
            expect(response._body.msg).toBe("User does not exist");

        })
    })
})


describe('PATCH /challenges/:username', () => {
    test("status:200, responds with patched challenge", () => {
        const challenge_updates = {"challenges.Sl_3_RegularSleep": 5}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            expect(response._body.challenges.Sl_3_RegularSleep).toBe(5)
            expect(typeof response._body.challenges.Sl_3_RegularSleep).toBe("number")
        })
    })

    test("status:200, responds with patched challenge to null", () => {
        const challenge_updates = {"challenges.Sl_6_NoAlcoholBB": null}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            expect(response._body.challenges.Sl_6_NoAlcoholBB).toBe(null)
        })
    })

    test("status:404, not found if username does not exist", () => {
        const challenge_updates = {"challenges.Sl_6_NoAlcoholBB": null}
        return request(app)
        .patch('/challenges/Sergiuasddasd')
        .send(challenge_updates)
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not Found")
        })
    })

    test("status:400, bad request when the value passed is not null or a number", () => {
        const challenge_updates = {"challenges.Sl_6_NoAlcoholBB": "SDAFSDFASDFA"}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })
})


//get journal entries, sort by date
describe('GET /journal/:userId sort', () =>{
    test('status code 200 returns an array of journal entries in  desc order unless specified', () => {
        return request(app)
        .get('/journal/Sergiu')
        .expect(200)
        .then((response) => {
            const journalEntries = response.body;
            expect(journalEntries).toBeInstanceOf(Array);
            const sortJournalEntries = [...journalEntries].sort((a,b) => b.date-a.date)
            expect(journalEntries).toEqual(sortJournalEntries)
        })
    })
    test('status code 200 returns an array of journal entries in  asc order', () => {
        return request(app)
        .get('/journal/Sergiu?order=asc')
        .expect(200)
        .then((response) => {
            const journalEntries = response.body;
            expect(journalEntries).toBeInstanceOf(Array);
            const sortJournalEntries =[...journalEntries].sort((a,b) => a.date-b.date)
            expect(journalEntries).toEqual(sortJournalEntries)
          })
    })
})

//get journal entries, filter by challenge, sort by date
describe('GET /journal/filter/:userId  filter+sort', () =>{
    test('status code 200 returns an array of journal entries in  asc order', () => {
        return request(app)
        .get('/journal/filter/Sergiu?challenge=Sl_4_NoCoffe8hBeforeBed&order=asc')
        .expect(200)
        .then((response) => {
            const journalEntries = response.body;
            expect(journalEntries).toBeInstanceOf(Array);
            const sortJournalEntries =[...journalEntries].sort((a,b) => a.date-b.date)
            expect(journalEntries).toEqual(sortJournalEntries)
        })
    })
    test('status code 200 returns an array of journal entries in  desc order', () => {
        return request(app)
        .get('/journal/filter/Sergiu?challenge=Sl_3_RegularSleep')
        .expect(200)
        .then((response) => {
            const journalEntries = response.body;
            expect(journalEntries).toBeInstanceOf(Array);
            const sortJournalEntries =[...journalEntries].sort((a,b) => b.date-a.date)
            expect(journalEntries).toEqual(sortJournalEntries)
        })
    })
})
