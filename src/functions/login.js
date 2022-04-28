import { get } from './storage';

export async function isLoggedIn() {

    const val =  get('token')
    if (!val && window.location.pathname != "/home") {
      location.replace("/home")
    }
    console.log("token: ",val)
}