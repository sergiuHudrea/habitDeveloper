const request = require('supertest');
// const User = require("./models/UserSetUpModel");
const app = require("../mongoDbJSUsers");

describe('1. GET /user/:username/:password', () =>{

    test("status:200, returns an array of category objects", ()=>{
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

//get journal entries, sort by date
describe('GET /journal/:userId sort', () =>{
    test('status code 200 returns an array of journal entries in  desc order unless specified', () => {
        return request(app)
        .get('/journal/63cfba643ef0b24f840b7a32')
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
        .get('/journal/63cfba643ef0b24f840b7a32?order=asc')
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
        .get('/journal/filter/63cfba643ef0b24f840b7a32?challenge=Sl_4_NoCoffe8hBeforeBed&order=asc')
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
        .get('/journal/filter/63cfba643ef0b24f840b7a32?challenge=Sl_3_RegularSleep')
        .expect(200)
        .then((response) => {
            const journalEntries = response.body;
            expect(journalEntries).toBeInstanceOf(Array);
            const sortJournalEntries =[...journalEntries].sort((a,b) => b.date-a.date)
            expect(journalEntries).toEqual(sortJournalEntries)
        })
    })
})