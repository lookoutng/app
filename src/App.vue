<template>
<ion-app>
    <ion-router-outlet />
</ion-app>
</template>

<script>
import {
    IonApp,
    IonRouterOutlet,
     onIonViewWillEnter,
    onIonViewDidEnter,
    onIonViewWillLeave,
    onIonViewDidLeave
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
// import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

// import {
//     // PushNotificationSchema,
//     PushNotifications,
//     // Token,
//     setnotifications
//     // ActionPerformed
// } from '@capacitor/push-notifications';

export default {
    name: 'App',
    components: {
        IonApp,
        IonRouterOutlet,
    },
    async mounted() {
    },
    async setup() {
        this.$refreshing = ""
        isLoggedIn()
        const token = await Get('token')
        // const token = 0
        if (token) {
            const perm = Geolocation.requestPermissions(); 
            const coordinates = await Geolocation.getCurrentPosition();
            console.log(perm);
            
            if(perm){
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
            else{
                openToast("App can't work without location, closing in 3 secs")
                setTimeout(3000,navigator.app.exitApp())
            }


        }

        // PushNotifications.register();

        // PushNotifications.addListener('registration',
        //     (token) => {
        //         window.alert('Push registration success' + token);
        //     }
        // );

        // // Some issue with our setup and push will not work
        // PushNotifications.addListener('registrationError',
        //     (error) => {
        //         window.alert('Error on registration: ' + JSON.stringify(error));
        //     }
        // );

        // // Show us the notification payload if the app is open on our device
        // PushNotifications.addListener('pushNotificationReceived',
        //     (notification) => {
        //         setnotifications(notifications => [...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
        //     }
        // );

        onIonViewDidEnter(() => {
        });

        onIonViewDidLeave(() => {
        });

        onIonViewWillEnter(() => {
        });

        onIonViewWillLeave(() => {
        });
    },
     
}
</script>
