import axios from "axios"

const userApi = axios.create({baseURL: "http://localhost:3007"})

export const getUserData =({email,password})=>{
    // const email = "shudrea@gmail.com"
    // const password = "iLoveCake"
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
            console.log(err,"<<<<<err")
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
