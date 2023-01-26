// const { default: test } = require('node:test');
const request = require('supertest');
// const User = require("./models/UserSetUpModel");
// const { describe } = require('test');
const app = require("../mongoDbJSUsers");
const mongoose = require("mongoose");
const User = require("../models/UserSetUpModel");
jest.setTimeout(50000);

beforeAll(done => {
    done()
  })

  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })
describe('GET /user/:username/:password', () =>{

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

describe("PATCH /journal/:username", () =>{

    test("status 201, returns 201 confirming patch of new journal entry", ()=>{
        const journalEntry = {
            challengeName: "Sl_1_NoPhoneBeforeBed",
            challengeEntryNumber:0,
            journalEntry:"Day 1, feeling good :)",
            date: new Date()
        }
        return request(app)
        .patch("/journal/Sergiu")
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
    test("status:200, responds with a patched challenge containing and array of dates, number of streak and number of times", () => {
        const challenge_updates = {"challenges.Sl_3_RegularSleep": {times: 2, dates: ["32323", "4234", "54"], streak: 100}}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            expect(response._body.challenges.Sl_3_RegularSleep).toEqual(
                expect.objectContaining({
                    times: expect.any(Number),
                    dates:  expect.any(Array),
                    streak: expect.any(Number)
                })
            )
        })
    })

    test("status:200, responds with patched challenge streak", () => {
        const challenge_updates = {"challenges.Sl_3_RegularSleep.streak": 2}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            expect(response._body.challenges.Sl_3_RegularSleep.streak).toBe(2)
        })
    })

    test("status:200, responds with patched challenge times to null", () => {
        const challenge_updates = {"challenges.Sl_6_NoAlcoholBB.times": null}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            expect(response._body.challenges.Sl_6_NoAlcoholBB.times).toBe(null)
        })
    })

    test("status:200, responds with patched challenge dates array", () => {
        const challenge_updates = {"challenges.Sl_6_NoAlcoholBB.dates": ["1234243234", "23424423"]}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            expect(response._body.challenges.Sl_6_NoAlcoholBB.dates).toEqual(["1234243234", "23424423"])
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

    test("status:400, bad request when the key passed is invalid", () => {
        const challenge_updates = {"challenges.asbbbasdadsasdaasd": 3}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })

})



    test("status:400, bad request when the dates value is not an array of strings", () => {
        const challenge_updates = {"challenges.2_DimLights3hBeforeBed.dates": [1,2, 3]}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })

    test("status:400, bad request when the streak value is not a number", () => {
        const challenge_updates = {"challenges.2_DimLights3hBeforeBed.streak": "NotaNumber"}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })

    test("status:400, bad request when the times value is not a number", () => {
        const challenge_updates = {"challenges.2_DimLights3hBeforeBed.times": "NotaNumber"}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })


describe("POST /user", () =>{

    test("status 201, returns 201 confirming new user and user object", ()=>{
            const newUser = {
        username: "Michael",
        email:"Michael.rivett@yahoo.au",
        password:"password",
   }

        return request(app)
        .post("/user")
        .send(newUser)
        .expect(201)
    })

    test("status 400, not fully filled in form", ()=>{
        const newUser = {
    email:"karl.rivett@yahoo.au",
    password:"password",
}

    return request(app)
    .post("/user")
    .send(newUser)
    .expect(400)
    .then((response)=>{
        expect(response._body.msg).toBe("Missing info");
    })
})

    test("status 400, username already exists", ()=>{
        const newUser = {
            username: "Sergiu",
            email:"shua@gmail.com",
            password:"password",
       }
        
            return request(app)
            .post("/user")
            .send(newUser)
            .expect(400)
            .then((response)=>{
                expect(response._body.msg).toBe("Username already exists");
            })
    })

    test("status 400, email already exists", ()=>{
        const newUser = {
            username: "James",
            email:"shudrea@gmail.com",
            password:"password",
       }
        
            return request(app)
            .post("/user")
            .send(newUser)
            .expect(400)
            .then((response)=>{
                expect(response._body.msg).toBe("Email already exists");
            })
        })


})

//get journal entries, filter by challenge, sort by date
describe('GET /journal/filter/:username  filter+sort', () =>{
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
    test('status code 400 when order is invlaid', () => {
        return request(app)
        .get('/journal/filter/Sergiu?challenge=Sl_3_RegularSleep&order=varshs')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Bad request")
        })
    })
    test('status code 400 when challenge is invlaid', () => {
        return request(app)
        .get('/journal/filter/Sergiu?challenge=varsha&order=desc')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Bad request")
        })
    })
    test('status code 400 when username is invlaid', () => {
        return request(app)
        .get('/journal/filter/SergiuKPMG?challenge=Sl_3_RegularSleep&order=desc')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("User does not exist")
        })
    })
})

//get journal entries, sort by date
describe('GET /journal/:username sort', () =>{
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
    test('status code 400 when order is invlaid', () => {
        return request(app)
        .get('/journal/Sergiu?order=varshs')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Bad request")
        })
    })
    test('status code 400 when username is invlaid', () => {
        return request(app)
        .get('/journal/SergiuKPMG?order=desc')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("User does not exist")
        })
    })
})
