const request = require('supertest');
//const User = require("./models/UserSetUpModel");
const app = require("../mongoDbJSUsers");

describe('1. GET /user/:username/:password', () =>{

    test("status:200, returns an array of category objects", ()=>{
        return request(app)
        .get('/user/shudrea@gmail.com/iLoveCake')
        .expect(200)
        .then((response)=>{
            const user = response._body[0];
            console.log(user);
            expect(user).toBeInstanceOf(Object);
            expect(user.username).toBe("Sergiu");
        })
    })
  })