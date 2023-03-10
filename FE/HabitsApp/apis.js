import axios from "axios"
const Sentiment = require("sentiment")
const userApi = axios.create({baseURL: "http://localhost:3007"})

export const getUserData =({email,password})=>{
    return userApi.get(`/api/user/${email}/${password}`).then((res)=>{
            return res.data[0]
        }).catch((err)=>{
            return err.response.data.msg
        })
}

export const patchUserChallenges =(email, chalCodeStr, bodyObj)=>{
    
    return userApi.patch(`/api/challenges/${email}`, {[chalCodeStr]: bodyObj}).then((res)=>{
            return res.data[0]
        }).catch((err)=>{
            return err
        })
}


export const postNewUser=(username,email,password)=>{
    const newUser = {
        username: username,
        email: email,
        password:password,
   }
    return userApi.post('/api/user', newUser).then((res)=>{
        
            return res.data[0]
        })
        .catch((err)=>{
            return err.response.data.msg
        })
}


export const getJournalByUser=(email)=>{
    return userApi.get(`/api/journal/${email}`).then((res)=>{
        return res.data
    }).catch((err)=>{
        return err.response.data.msg
    })
}

export const patchJournalEntry =(challengeName,title,challengeEntryNumber,journalEntry,date, email)=>{
    let sentiment = new Sentiment();
    let result = (sentiment.analyze(journalEntry).score +5)*10;

    console.log(result);
    const patchjournalBody = {
        challengeName:  challengeName,
        title: title,
        challengeEntryNumber:challengeEntryNumber,
        journalEntry:journalEntry,
        date:  date,
        happinessIndex:result
    }

    return userApi.patch(`/api/journal/${email}`,patchjournalBody).then((res)=>{
            return res.data[0]
        }).catch((err)=>{
            console.log(err.response.data.msg)
            return err.response.data.msg
        })
}


export const deleteJournalEntry = (entryId) => {
    return userApi.delete(`/api/journalEntry/${entryId}`)
    .then ((res) => {
        return res
    })
}