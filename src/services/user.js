import { http } from "./http";
import { storeObject, remove, store } from "@/functions/storage";


export const getLoggedInUser = () => {
    const response = http.get('user').then((res) => {
        storeObject(res.data.user)
        return res.data
    })
    return response;
}

export const updateUser = (formdata) => {
    const response = http.post('user/update', formdata)
    return response;
}

export const createUser = (tel) => {
    const response = http.post('user/create', { tel })
    .then((res) => {
        console.log("user http", res.data)
        storeObject(res.data.user)
        store('token', res.data.token)
        return res.data
    })
    return response;
}

export const logout = () => {
    const response = http.post('user/logout')
    .then(() => {
        remove('token')
    })
    return response;
}

export const createLocation =  (formdata) => {
    const response = http.post('location/create' ,formdata)
    return response;
}