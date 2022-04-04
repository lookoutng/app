import { http } from "./http";
import { storeUser, remove, store } from "@/functions/storage";


export const getLoggedInUser = () => {
    const response = http.get('user').then((res) => {
        storeUser(res.data.user)
    })
    return response;
}

export const updateUser = (formdata) => {
    const response = http.post('user/update', formdata)
    return response;
}

export const createUser = (tel) => {
    const response = http.post('user/create', {
        tel:tel
    })
    .then((res) => {
        console.log("user http", res.data)
        storeUser(res.data.user)
        store('token', res.data.token)
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