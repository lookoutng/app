import { toastController, loadingController } from '@ionic/vue'

let loading
let toast

export async function openLoading(timeout = 10000, dismiss = false) {
  loading = await loadingController
    .create({
      cssClass: 'century loading text-12',
      message: 'Loading...',
      backdropDismiss: dismiss,
      duration: timeout,
    });

  setTimeout(function () {
    loading.dismiss()
  }, timeout);
  await loading.present();

  return loading
}

export async function openToast(message, timeout = 5000) {
  dismiss()
  toast = await toastController
    .create({
      message: message,
      duration: timeout
    })
  return toast.present();
}

export function showError(error) {
    dismiss()
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
  
export function dismiss() {
  loading ? loading.dismiss() : ''
}
