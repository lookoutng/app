<template>
    <ion-app>
        <ion-router-outlet />
        <side-menu />
    </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { storeUser } from '@/functions/storage'
import { openToast } from '@/functions/widget'
import { isLoggedIn } from '@/functions/login'
import { getLoggedInUser, createLocation } from '@/services/user'
import { Geolocation } from '@capacitor/geolocation';
import SideMenu from '@/components/SideMenu.vue';
// import { NativeSettings } from 'capacitor-native-settings';
// import { getMessaging } from "firebase/messaging";
// import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications'

export default {
    name: 'App',
    components: {
        IonApp,
        IonRouterOutlet,
        SideMenu
    },
    async created() {
        // alert(await getMessaging().getToken({vapidKey: 'BFYu3NoIbmPGNi5ey1f4PmMrp8ATm1FwpuL8brwJzhnqvw817gay89G80lmgNeurtIEerFXqfVcFUtzHgase1uU'}))
        // console.log("goo" + await NativeSettings.openAndroid({
        //   option: "location",
        // }))
        isLoggedIn()
        const token = localStorage.getItem('token')
            if (token) {
                console.log("token",token)
                let coordinates
                Geolocation.getCurrentPosition()
                .then((coord) => {
                    coordinates = coord
                })
                .catch((e)=>{
                    console.log(e.message)
                    if(e.code == 1 || e.message == "location disabled"){
                        console.log("Not Working")
                        openToast("Application can't work without location, Kindly turn On..App closing in 3 sec",10000)
                        // setTimeout(() => {navigator['app'].exitApp()}, 4000)
                    }
                });
                console.log(coordinates)
                const lat = coordinates.coords.latitude, long = coordinates.coords.longitude;

                createLocation(token, { lat, long })
                .catch((error) => 
                    {
                        if(error.response.data.message == "unauthenticated")
                        {
                            openToast("Issue with User Login")
                            setTimeout(3000, function(){
                                location.replace("/home")
                            })
                        }
                        console.log(error)
                    }
                )

                getLoggedInUser()
                .then((res) => {
                    storeUser(res)
                })
            }

    },
    setup(){
    //     PushNotifications.requestPermissions().then(result => {
    //   if (result.receive === 'granted') {
    //     // Register with Apple / Google to receive push via APNS/FCM
    //     PushNotifications.register();
    //   } else {
    //     // Show some error
    //   }
    // });

    // // On success, we should be able to receive notifications
    // PushNotifications.addListener('registration',
    //   (token) => {
    //     alert('Push registration success, token: ' + token.value);
    //   }
    // );

    // // Some issue with our setup and push will not work
    // PushNotifications.addListener('registrationError',
    //   (error) => {
    //     alert('Error on registration: ' + JSON.stringify(error));
    //   }
    // );

    // // Show us the notification payload if the app is open on our device
    // PushNotifications.addListener('pushNotificationReceived',
    //   (notification) => {
    //     alert('Push received: ' + JSON.stringify(notification));
    //   }
    // );

    // // Method called when tapping on a notification
    // PushNotifications.addListener('pushNotificationActionPerformed',
    //   (notification) => {
    //     alert('Push action performed: ' + JSON.stringify(notification));
    //   }
    // );
    }
     
}
</script>
