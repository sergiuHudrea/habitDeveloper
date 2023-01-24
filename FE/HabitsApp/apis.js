import axios from "axios"

const userApi = axios.create({baseURL: "http://localhost:3000"})

export const getUserData =()=>{
    const email = "shudrea@gmail.com"
    const password = "iLoveCake"
    return userApi.get(`/user/${email}/${password}`).then((res)=>{
            return res.data[0]
        })
}