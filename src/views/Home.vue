<template>
<ion-page>
    <ion-content class="">
        <!--<swiper :slides-per-view="3" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange">
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            ...
        </swiper>-->
        <div class="ion-text-center ion-margin-top ion-padding-top" style="margin-top:10vh !important">
            <br>
            <img src="/img/logo.png" class="img">
        </div>
        <div class="ion-padding text14 head ion-text-center" style="margin-top: !important">

                <h1 style="font-size:40px">
                    <b>
                        Welcome
                    </b>
                </h1>
                
        </div>
       <form class="pg df jcm ion-padding" @submit.prevent="login">
            <div class="form-div">
                <ion-item class="ion-no-padding">
                    <country-code ref="code" @click="getCountryCode"></country-code>
                    <ion-input autocomplete="true" class="button ion-padding-horizontal" placeholder="09011223344" v-model="tel" minLength="11" maxLength="11" inputmode="numeric" required="true"></ion-input>
                </ion-item>
                <br>
                <ion-button type="submit" class="ion-margin-top bodoni ion-text-capitalize text14" expand="block" id="">
                    Send Verfication
                </ion-button>
            </div>
            <div class="ion-hide head" id="recaptcha"></div>
        </form>
    </ion-content>
</ion-page>
</template>

<script>
import { IonContent, IonPage, IonButton, IonInput, modalController } from '@ionic/vue'
import CountryCode from '@/components/CountryCode.vue'
import VerifyNumberVue from '@/components/VerifyNumber.vue';
import { openToast, openLoading } from '@/functions/widget';
import { get } from '@/functions/storage';
import { firebaseInit } from '@/functions/firebase/initialize';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

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
        firebaseLogin(){
            const auth = getAuth();
            const phoneNumber = CountryCode.data().current + this.tel.substring(1);
            
            signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
            .then((confirmationResult) => {

                    // SMS sent. Prompt user to type the code from the message, then sign the
                    window.confirmationResult = confirmationResult;
                    console.log('SMS sent, check your phone')
                    this.createModal()
                }
            )
            .catch(() => 
                {
                    openToast("SMS not sent, try confirm the number and your network")
                    // Error; SMS not sent
                }
            );
        },
        async login() {
            openLoading(60000, false)
            firebaseInit()

            if(window.recaptchaVerifier){
                this.firebaseLogin()
            }
            else{
                window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
                    size: 'invisible',
                    callback: () => {
                        console.log("recaptchA created")
                    }
                }, getAuth());
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
        const token = get('token')

        if (token) {
            location.replace("/dashboard")
        }
    },
    setup() {
        // const onSwiper = (swiper) => {
        //     console.log(swiper);
        // };
        // const onSlideChange = () => {
        //     console.log('slide change');
        // };
        // return {
        //     onSwiper,
        //     onSlideChange,
        // };
    },

};
</script>

<style scoped>
.img {
    max-height: 170px;
    background: white !important;

}
form{
    min-width:100% !important;
}
.form-div{
    margin-top:10vh;
    max-width:500px;
}
country-code{
     max-width:90px
}
</style>
