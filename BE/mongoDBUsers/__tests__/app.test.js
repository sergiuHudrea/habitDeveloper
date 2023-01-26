const request = require('supertest');
const app = require("../mongoDbJSUsers");
const mongoose = require("mongoose");
jest.setTimeout(10000);

beforeAll(done => {
    done()
  })

  afterAll(done => {
    mongoose.connection.close()
    done()
  })
describe('GET /user/:email/:password', () =>{

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



    test("status:404, email does not exist", ()=>{
        return request(app)
        .get('/asdfasdfas')
        .expect(404)
        .then((response)=>{
            expect(response._body.msg).toBe("Route not found");
        })
    })

    test("status:404, email does not exist", ()=>{
        return request(app)
        .get('/user/doesnotexist@gmail.com/iLoveCake')
        .expect(404)
        .then((response)=>{
            expect(response._body.msg).toBe("Email does not exist");
        })
    })

    test("status:404, password is incorrect", ()=>{
        return request(app)
        .get('/user/shudrea@gmail.com/incorrectPassword123')
        .expect(404)
        .then((response)=>{
            expect(response._body.msg).toBe("Password is incorrect");
        })
    })
  })

describe("PATCH /journal/:email", () =>{

    test("status 201, returns 201 confirming patch of new journal entry", ()=>{
        const journalEntry = {
            challengeName: "Sl_1_NoPhoneBeforeBed",
            challengeEntryNumber:0,
            journalEntry:"Day 1, feeling good :)",
            date: new Date()
        }
        return request(app)
        .patch("/journal/shudrea@gmail.com")
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

    test("status 400, email does not exist ", ()=>{
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
            expect(response._body.msg).toBe("Email does not exist");

        })
    })
})


describe('PATCH /challenges/:email', () => {
    test("status:200, responds with a patched challenge containing and array of dates, number of streak and number of times", () => {
        const challenge_updates = {"challenges.Sl_3_RegularSleep": {times: 2, dates: ["32323", "4234", "54"], streak: 100}}
        return request(app)
        .patch('/challenges/shudrea@gmail.com')
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
        .patch('/challenges/shudrea@gmail.com')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            expect(response._body.challenges.Sl_3_RegularSleep.streak).toBe(2)
        })
    })

    test("status:200, responds with patched challenge times to null", () => {
        const challenge_updates = {"challenges.Sl_6_NoAlcoholBB.times": null}
        return request(app)
        .patch('/challenges/shudrea@gmail.com')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            expect(response._body.challenges.Sl_6_NoAlcoholBB.times).toBe(null)
        })
    })

    test("status:200, responds with patched challenge dates array", () => {
        const challenge_updates = {"challenges.Sl_6_NoAlcoholBB.dates": ["1234243234", "23424423"]}
        return request(app)
        .patch('/challenges/shudrea@gmail.com')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            expect(response._body.challenges.Sl_6_NoAlcoholBB.dates).toEqual(["1234243234", "23424423"])
        })
    })

    test("status:404, not found if email does not exist", () => {
        const challenge_updates = {"challenges.Sl_6_NoAlcoholBB": null}
        return request(app)
        .patch('/challenges/doesnotexists@gmail.com')
        .send(challenge_updates)
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not Found")
        })
    })

    test("status:400, bad request when the key passed is invalid", () => {
        const challenge_updates = {"challenges.asbbbasdadsasdaasd": 3}
        return request(app)
        .patch('/challenges/shudrea@gmail.com')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })



    test("status:400, bad request when the dates value is not an array of strings", () => {
        const challenge_updates = {"challenges.2_DimLights3hBeforeBed.dates": [1,2, 3]}
        return request(app)
        .patch('/challenges/shudrea@gmail.com')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })

    test("status:400, bad request when the streak value is not a number", () => {
        const challenge_updates = {"challenges.2_DimLights3hBeforeBed.streak": "NotaNumber"}
        return request(app)
        .patch('/challenges/shudrea@gmail.com')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })

    test("status:400, bad request when the times value is not a number", () => {
        const challenge_updates = {"challenges.2_DimLights3hBeforeBed.times": "NotaNumber"}
        return request(app)
        .patch('/challenges/shudrea@gmail.com')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })

    test("status:400, bad request if you try to update the title.", () => {
        const challenge_updates = {"challenges.2_DimLights3hBeforeBed.title": "NO TITLE"}
        return request(app)
        .patch('/challenges/shudrea@gmail.com')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Bad request. You cannot change the title or description.')
        })
    })

    test("status:400, bad request if you try to update the description", () => {
        const challenge_updates = {"challenges.2_DimLights3hBeforeBed.description": "SLEEP IS BADZ"}
        return request(app)
        .patch('/challenges/shudrea@gmail.com')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Bad request. You cannot change the title or description.')
        })
    })

})


describe("POST /user", () =>{

    test("status 201, returns 201 confirming new user and user object", ()=>{
        //if this fails it's likely because user is already in database, just reseed and re run
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
describe('GET /journal/filter/:email  filter+sort', () =>{
    test('status code 200 returns an array of journal entries in  asc order', () => {
        return request(app)
        .get('/journal/filter/shudrea@gmail.com?challenge=Sl_4_NoCoffe8hBeforeBed&order=asc')
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
        .get('/journal/filter/shudrea@gmail.com?challenge=Sl_3_RegularSleep')
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
        .get('/journal/filter/shudrea@gmail.com?challenge=Sl_3_RegularSleep&order=varshs')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Bad request")
        })
    })
    test('status code 400 when challenge is invlaid', () => {
        return request(app)
        .get('/journal/filter/shudrea@gmail.com?challenge=varsha&order=desc')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Bad request")
        })
    })
    test('status code 400 when username is invlaid', () => {
        return request(app)
        .get('/journal/filter/doesnotexist@gmail.com?challenge=Sl_3_RegularSleep&order=desc')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Email does not exist")
        })
    })
})

//get journal entries, sort by date
describe('GET /journal/:email sort', () =>{
    test('status code 200 returns an array of journal entries in  desc order unless specified', () => {
        return request(app)
        .get('/journal/shudrea@gmail.com')
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
        .get('/journal/shudrea@gmail.com?order=asc')
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
        .get('/journal/shudrea@gmail.com?order=varshs')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Bad request")
        })
    })
    test('status code 400 when email is invlaid', () => {
        return request(app)
        .get('/journal/doesnotexist@gmail.com?order=desc')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Email does not exist")
        })
    })
})
