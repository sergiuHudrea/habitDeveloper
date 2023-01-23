const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/model");
const { response } = require('express');
var ObjectID = require('mongodb').ObjectID;

const app = express();	
app.use(express.json());

const uri = "mongodb+srv://theFantastic5:theFantastic54321@habitdeveloper.m1vjjrl.mongodb.net/habitDev?retryWrites=true&w=majority";
mongoose.connect(uri)
.then((result)=>{
     console.log("connected to db")
     app.listen(3004);
})
.catch((err)=>{
     console.log(err);
})

app.get('/add-user', (req,res)=>{
     const user = new User({
          username: "Karl",
          email:"karl.rivett@yahoo.au",
          password:"password",
          likes:0,
          challenges:{},
          uniqueUserLink:"",
          medals:{},
          dailyJournal:[]
     })
     user.save()
     .then((result=>{
          res.status(200).send(result)
     }))
     .catch((err=>{
          console.log(err);
     }))
})

app.get('/Users', (req,res)=>{
     User.find()
     .then((result)=>{
          res.send(result);
     })
     .catch((err=>{
          console.log(err);
     }))

})

