import { Storage } from '@capacitor/storage';
// import Vue from 'vue';
import { toastController, loadingController } from '@ionic/vue'

let loading
let toast
export async function Store(key, value) {
  await Storage.set({
    key: key,
    value: value,
  });
}

export async function Get(key) {
  const value = await Storage.get({ key: key });
  return value.value;
}

export async function Remove(key) {
  await Storage.remove({ key: key });
}

export async function isLoggedIn() {

  const val = await Get('token')
  if (!val && window.location.pathname != "/home") {
    location.replace("/home")
  }
  console.log(val)
}

export async function openLoading(timeout = 200000) {
  loading = await loadingController
    .create({
      cssClass: 'century loading text-12',
      message: 'Loading...',
      backdropDismiss: true,
      duration: timeout,
    });

  setTimeout(function () {
    loading.dismiss()
  }, timeout);
  await loading.present();

  return loading
}

export async function openToast(message, timeout = 2000) {
  toast = await toastController
    .create({
      message: message,
      duration: timeout
    })
  return toast.present();
}

export function showError(error) {

  if (error.response) {
    if (error.response.status < 400)
      openToast(error.response.data.message)

  }
  else if (error.request) {
    openToast("Network Error")

  }
  else {
    openToast("Unknown error occured")
  }

}

export function storeUser(res) {
  Store('points', res.data.user.points)
  Store('dp', res.data.user.dp)
  Store('name', res.data.user.username)
  Store('email', res.data.user.email)
}

export function reload(){
  setTimeout(3000,function(){
    location.replace(window.location)
  })
}
export async function dismiss() {
  loading.dismiss()
}

