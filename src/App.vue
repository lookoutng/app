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

export default {
    name: 'App',
    components: {
        IonApp,
        IonRouterOutlet,
    },
    async created() {
        isLoggedIn()
        const token = await Get('token')
        if (token) {
            const coordinates = await Geolocation.getCurrentPosition().catch((e)=>{
                console.log(e)
                if(e.code == 1){
                    console.log("Not Working")
                    openToast("Application can't work without location, Kindly turn On..App closing in 3 sec")
                    navigator['app'].exitApp()
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
            // else{
            //     openToast("App can't work without location, closing in 3 secs")
            //     setTimeout(3000,navigator.app.exitApp())
            // }


        }


        onIonViewDidEnter(() => {
        });

    },
     
}
</script>
