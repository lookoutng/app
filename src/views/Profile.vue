<template>
<ion-page>
    <ion-header>
        <app-header title="Profile"></app-header>
    </ion-header>
    <ion-content class="ion-padding-bottom ion-text-center">
        <Register href="/profile"></Register>
        <div class="ion-text-center text-gray pg text20">
            <br>
            <ion-text color=" bodoni">
                About
            </ion-text><br><br>
            <ion-text color=" bodoni ">
                Support
            </ion-text><br><br>
            <ion-text color="danger bodoni" @click="logout">
                <Icon icon="websybol:logout" :rotate="2" /> Log Out
            </ion-text>
        </div>
    </ion-content>
    <ion-footer>
        <Footer></Footer>
    </ion-footer>
</ion-page>
</template>

<script>
import {
    IonContent,
    IonHeader,
    IonPage,
    alertController
} from '@ionic/vue'
import Register from './Layouts/Register.vue'
import {
    Icon
} from '@iconify/vue';
import axios from 'axios'
import {
    dismiss,
    openLoading,
    Get,
    openToast,
    Remove,
    showError
} from '../storage';
import firebase from "firebase/compat/app";

export default {
    name: 'Profile',
    components: {
        IonContent,
        IonPage,
        IonHeader,
        Register,
        Icon
    },
    data() {
        return {
            username: 'Luke2234',
            email: 'Lukeme@luke.com',
            dp: '/img/Doctor.png',
            number: '333'
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

            if (role.role == "OK") {
                openLoading()
                const token = await Get('token')

                axios.post(this.$hostname + '/api/user/logout', {}, {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })
                    .then(() => {
                        dismiss()
                        openToast("Logging out Successfully")
                        Remove('token')
                        location.replace('/home')
                    })
                    .catch((error) => {
                        console.error(error)
                        Remove('token')
                        showError(error.message)
                        dismiss()
                    })

                const auth = firebase.getAuth();
                firebase.signOut(auth).then(() => {
                    // Sign-out successful.
                }).catch((error) => {
                    console.log(error.message)
                    // An error happened.
                });
            }
        },
    },
};
</script>

<style scoped>


ion-button {
    --background: transparent !important;
    --padding-top: 0px !important;
    height: 20px !important;
    border: none;
}

ion-text {
    /* --margin-top: 30px !important; */
    cursor: pointer;
}
</style>
