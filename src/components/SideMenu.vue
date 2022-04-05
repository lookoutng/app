<template>
<ion-menu side="start" menu-id="first" content-id="main">
    <ion-header>
      <ion-toolbar color="">

          <div class="df alm ion-padding">
              <ion-thumbnail>
                <img :src=" user.dp ? this.$hostname+'/images/' + this.user.dp : ''" class=""/>
              </ion-thumbnail>
              <div class="ion-padding">
                <ion-label class="century ion-padding-end ion-text-wrap ion-text-sm" style="font-size:80%;">
                  <b>John dahhoe</b>
                  <br>
                  Jolaoshobatmat.ntlr@gmail.com
                </ion-label>
              </div>
          </div>

      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list class="ion-no-padding century" no-padding>

          <ion-item lines="full" href="/profile">Profile</ion-item>
          <ion-item lines="full">About</ion-item>
          <ion-item lines="full">Support</ion-item>
          <ion-item lines="full" @click="logout">Logout</ion-item>
       
      </ion-list>
    </ion-content>
    <ion-footer class="century ion-padding ion-text-center ion-text-sm ion-no-border" style="font-size:12px">
      (C) Techiehealth ng
    </ion-footer>
     <ion-router-outlet id="main"></ion-router-outlet>
  </ion-menu>


</template>

<script>

import { IonHeader, IonContent, IonToolbar, IonMenu, IonList, IonItem, IonTitle, IonRouterOutlet, IonThumbnail, IonImg, alertController } from '@ionic/vue';
import firebase from "firebase/compat"
import { openLoading, openToast } from "@/functions/widget"
import { remove, getObject } from "@/functions/storage"
import { logout } from '@/services/user'

export default {
    name:'SideMenu',
    compnents:{
        IonHeader,
        IonContent,
        IonToolbar,
        IonMenu,
        IonList,
        IonItem,
        IonTitle,
        IonRouterOutlet,
        IonImg,
        IonThumbnail
    },
    data(){
      return {
        user: {}
      }
    },
    methods: {
      async logout() {
              const alert = await alertController
                  .create({
                      cssClass: 'alert century text12',
                      message: 'You would be log out of the App.',
                      buttons: [{
                          text: 'Ok',
                          role: 'OK'
                      }, 'Cancel'],
                      backdropDismiss: true,
                  });
              await alert.present();

              const role = await alert.onDidDismiss();
              console.log('onDidDismiss resolved with role', role);

              if(role.role == "OK") {
                  openLoading()
                  const testLogin = logout()
                  testLogin.then(() => 
                      {
                          openToast("Logging out Successfully")
                          location.replace('/home')
                      }
                  )
                  .catch(() => 
                      {
                          remove('token')
                      }
                  )

                  const auth = firebase.getAuth();
                  firebase.signOut(auth).then(() => {
                      // Sign-out successful.
                  })
                  .catch((error) => 
                      {
                          console.log(error.message)
                          // An error happened.
                      }
                  );
              }
          },
    },
    created(){
      this.user = getObject('user')
    }
}
</script>

<style scoped>
img{
  min-width: 50px !important;
}
ion-item{

  --padding-top: 10px !important;
  --padding-bottom: 10px !important;
  
  --background-hover:Lightgray !important;
  --border-color:white;
}
ion-item:hover {
  --background: Lightgray !important;
}
ion-item:active{
  --background:Lightgray !important;
}
ion-label{
  
}

</style>