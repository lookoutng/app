<template>
<ion-app>
    <ion-router-outlet />
</ion-app>
</template>

<script>
import {
    IonApp,
    IonRouterOutlet
} from '@ionic/vue';
import {
    isLoggedIn,
    Store,
    Get,
    openToast
} from './storage'
import axios from 'axios'
import {
    Geolocation
} from '@capacitor/geolocation';
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
    async created() {
        this.$refreshing = ""
        isLoggedIn()
        const token = await Get('token')

        if (token) {
            const coordinates = await Geolocation.getCurrentPosition();
            console.log('Current position:', coordinates.coords.latitude);

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
                    console.error(error)
                })
                axios.get(this.$hostname + '/api/user', {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then((res) => {
                this.points = res.data.user.points
                Store('points', res.data.user.points)
                Store('dp', res.data.user.dp)
                Store('name', res.data.user.username)
                Store('email', res.data.user.email)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        // PushNotifications.register();

        // PushNotifications.addListener('registration',
        //     (token) => {
        //         console.log('Push registration success' + token);
        //     }
        // );

        // // Some issue with our setup and push will not work
        // PushNotifications.addListener('registrationError',
        //     (error) => {
        //         alert('Error on registration: ' + JSON.stringify(error));
        //     }
        // );

        // // Show us the notification payload if the app is open on our device
        // PushNotifications.addListener('pushNotificationReceived',
        //     (notification) => {
        //         setnotifications(notifications => [...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
        //     }
        // );

    }
}
</script>
