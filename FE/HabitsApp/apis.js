import axios from "axios"

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

    const patchjournalBody = {
        challengeName:  challengeName,
        title: title,
        challengeEntryNumber:challengeEntryNumber,
        journalEntry:journalEntry,
        date:  date
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

export const filterJournal = (email,challenge,order='desc') => {
    
    return userApi.get(`/api/journal/filter/${email}?challenge=${challenge}&order=${order}`)
    .then((res) => {
        return res.data
    })
    .catch((err)=>{
        return err.response.data.msg
    })
}