import { http } from "./http";
import { storeUser, remove, store } from "@/functions/storage";


export const getLoggedInUser = () => {
    http.get('user').then((res) => {
        storeUser(res.data.user)
    })
    return http;
}

export const updateUser = (formdata) => {
    http.post('user/update', formdata)
    return http;
}

export const createUser = (tel) => {
    http.post('user/create', {
        tel:tel
    })
    .then((res) => {
        console.log("user http", res.data)
        storeUser('user', res.data.user)
        store('token', res.data.token)
    })
    return http;
}

export const logout = () => {
    http.post('user/logout')
    .then(() => {
        remove('token')
    })
    return http;
}

export const createLocation =  (formdata) => {
    http.post('location/create' ,formdata)
    return http;
}