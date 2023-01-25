import axios from "axios"

const userApi = axios.create({baseURL: "http://localhost:3007"})

export const getUserData =(email='shudrea@gmail.com',password='iLoveCake')=>{
    // const email = "shudrea@gmail.com"
    // const password = "iLoveCake"
    // console.log(email,"<<<<email")
    // console.log(password,"<<<<password")
    return userApi.get(`/user/${email}/${password}`).then((res)=>{
        // console.log(res.status)
            return res.data[0]
        }).catch((err)=>{
            console.log(err,"<<<<<err")
        })
}