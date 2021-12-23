<template>
<ion-page>
    <ion-content class="">
        <!--<swiper :slides-per-view="3" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange">
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            ...
        </swiper>-->
        <div class="ion-text-center ion-margin-top ion-padding-top">
            <br>
            <img src="/img/logo.png" class="img">
        </div>
        <div class="ion-padding text14 head ion-text-center" style="margin-top:x !important">

                <h1 style="font-size:40px">
                    <b>
                        Welcome
                    </b>
                </h1>
                
        </div>
        <form class="ion-padding pg" style="margin-top:10vh" @submit.prevent="login">
            <ion-item class="ion-no-padding">
                <country-code style="max-width:90px" ref="code" @click="getCountryCode"></country-code>
                <ion-input class="button" placeholder="09011223344" v-model="tel" minLength="11" maxLength="11" inputmode="numeric" required="true"></ion-input>
            </ion-item>
            <br>
            <ion-button type="submit" class="ion-margin-top bodoni ion-text-capitalize text14" expand="block" id="">
                Send Verfication
            </ion-button>
            <div class="ion-hide head" id="recaptcha">

            </div>
        </form>
    </ion-content>
</ion-page>
</template>

<script>
import {
    IonContent,
    IonPage,
    IonButton,
    IonInput,
    modalController
} from '@ionic/vue'
import CountryCode from './Layouts/CountryCode.vue'
import VerifyNumberVue from './Layouts/VerifyNumber.vue';
import {
    Get,
    openToast,
    openLoading,
} from "../storage";
import firebase from "firebase/compat/app";


export default {
    name: 'Home',
    components: {
        IonContent,
        IonPage,
        IonButton,
        IonInput,
        CountryCode,
    },
    data() {
        return {
            tel: ''
        }
    },
    methods: {
        getCountryCode() {
            console.log(CountryCode.data().current + this.tel.substring(1))
        },
        firebaseLogin(){
            const auth = firebase.getAuth();
            const phoneNumber = CountryCode.data().current + this.tel.substring(1);
            
            firebase.signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
            .then((confirmationResult) => {

                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log('success')
                this.createModal()
                // ...
            }).catch((error) => {
                // window.recaptchaVerifier.recaptcha.reset()
                console.log(error)
                openToast("SMS not sent, try confirm the number and your network")
                // Error; SMS not sent
                // ...
            });
        },
        async login() {
            openLoading()
            firebase.initializeApp({
                // measurementId: "G-MEASUREMENT_ID",
                apiKey: 'AIzaSyCK2fTFYuAuJ-WgZd3JqJGMugWRE8V8M1Y',
                authDomain: 'dailydata-21793.firebaseapp.com',
                databaseURL: 'https://dailydata-21793.firebaseio.com',
                projectId: 'dailydata-21793',
                storageBucket: "'dailydata-21793.appspot.com",
                messagingSenderId: "228418497521",
                appId: '1:228418497521:web:dec1d095f60064269ab250',
                serverKey: 'AAAANS7Nq_E:APA91bG4QzSXUsCdbRNtV3-AoBQ8xBlpLgHrxjpchxGcrdGiNTKhyHFZKSqlxsf_NAymLAkvyfeB5PmIez5xqGPphTkoi_ZTwV2BlEZC2zOMYeCXUQfvU3RE3GTuqr8_iS706qK5Bkg_',
                publicKey: 'BFYu3NoIbmPGNi5ey1f4PmMrp8ATm1FwpuL8brwJzhnqvw817gay89G80lmgNeurtIEerFXqfVcFUtzHgase1uU',

            })

           
            if(window.recaptchaVerifier){
                this.firebaseLogin()
            }
            else{
                window.recaptchaVerifier = new firebase.RecaptchaVerifier('recaptcha', {
                    size: 'invisible',
                    callback: () => {
                        console.log("geer")
                    }
                }, firebase.getAuth());
                window.recaptchaVerifier.callback = this.firebaseLogin() 
            }
        },
        async createModal() {
            const modal = await modalController.create({
                    component: VerifyNumberVue, //Modal is name of the component to render inside ionic modal
                    componentProps: {
                        tel: this.tel
                    }
                },

            );
            return modal.present();
        }
    },
    async created() {
        const token = await Get('token')

        if (token) {
            location.replace("/dashboard")
        }
    },
    setup() {
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
        };
    },

};
</script>

<style scoped>
.img {
    max-height: 170px;
    background: white !important;

}
</style>
