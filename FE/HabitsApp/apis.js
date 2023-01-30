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
    console.log(chalCodeStr, "--->line14 apis")
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