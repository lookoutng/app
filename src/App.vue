<template>
    <ion-app>
        <ion-router-outlet />
    </ion-app>
</template>

<script>
import {
    IonApp,
    IonRouterOutlet,
    onIonViewDidEnter,
} from '@ionic/vue';
import {
    isLoggedIn,
    storeUser,
    Get,
    openToast
} from './storage'
import axios from 'axios'
import {
    Geolocation
} from '@capacitor/geolocation';
// import { OpenNativeSettings } from 'cordova-open-native-settings';
// import Cordova from 'cordova';
import { NativeSettings } from 'capacitor-native-settings';

// import {
// //   ActionPerformed,
// //   PushNotificationSchema,
//   PushNotifications,
// //   Token,
// } from '@capacitor/push-notifications'

export default {
    name: 'App',
    components: {
        IonApp,
        IonRouterOutlet,
    },
    async created() {
        isLoggedIn()
        // let islocationEnabled
        const token = await Get('token');
        console.log("goo" + await NativeSettings.openAndroid({
          option: "location",
        }))

        if (token) {
            const coordinates = await Geolocation.getCurrentPosition().catch((e)=>{
                console.log(e.message)
                if(e.code == 1 || e.message == "location disabled"){
                    console.log("Not Working")
                    openToast("Application can't work without location, Kindly turn On..App closing in 3 sec",10000)
                    // setTimeout(() => {navigator['app'].exitApp()}, 4000)
                }
            });
            console.log(coordinates)
           
            axios.post(this.$hostname + '/api/location/create', {
                lat: coordinates.coords.latitude,
                long: coordinates.coords.longitude,
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then(() => {

            })
            .catch((error) => {
                if(error.response.data.message == "unauthenticated")
                {
                    openToast("Issue with User Login")
                    setTimeout(3000, function(){
                        location.replace("/home")
                    })
                }
                console.log(error)
            })
            axios.get(this.$hostname + '/api/user', {
            headers: {
                "Authorization": "Bearer " + token
            }
            })
            .then((res) => {
                storeUser(res)
            })
            .catch((error) => {
                console.log(error)
            })
            


        }


        onIonViewDidEnter(() => {
        });

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
