import axios from "axios"

const userApi = axios.create({baseURL: "http://localhost:3005"})

export const getUser =(email, password)=>{
    // const email = "shudrea@gmail.com"
    // const password = "iLoveCake"
    return userApi.get(`/user/${email}/${password}`).then((res)=>{
            console.log(res.data[0])
        })
}