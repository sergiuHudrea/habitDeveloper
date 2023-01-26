import axios from "axios"

const userApi = axios.create({baseURL: "http://localhost:3007"})

export const getUserData =({email,password})=>{
    // const email = "shudrea@gmail.com"
    // const password = "iLoveCake"
    return userApi.get(`/user/${email}/${password}`).then((res)=>{
            return res.data[0]
        }).catch((err)=>{
           return err
        })
}

export const patchUserChallenges =(username='Sergiu', chalCodeStr, bodyObj)=>{
    return userApi.patch(`/challenges/${username}`, {[chalCodeStr]: bodyObj}).then((res)=>{
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
    return userApi.post('/user', newUser).then((res)=>{
        
            return res.data[0]
        })
        .catch((err)=>{
            return err.response.data.msg
        })
}
