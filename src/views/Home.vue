<template>
<ion-page>
    <ion-content class="">
        <div class="ion-text-center ion-margin-top ion-padding-top">
            <br>
            <img src="/img/LookOut.png" class="img">
        </div>
        <div class="ion-padding text14 century ion-text-center" style="margin-top:20px !important">
            <ion-text class="ion-text-center" >
                Input your mobile number to get the verification code.
            </ion-text>
        </div>
        <form class="ion-padding" style="margin-top:10vh" @submit.prevent="login">
            <ion-input class="button century" placeholder="+234 123 456 78" v-model="tel" maxLength="11" inputmode="numeric"></ion-input>
            <ion-button type="submit" expand="block bodoni ion-text-capitalize text16" >
                <b>
                    Send Verfication
                </b>
            </ion-button>
        </form>
    </ion-content>
</ion-page>
</template>

<script>
import {
    IonContent,
    IonPage,
    IonButton,
    IonText,
    IonInput,
    modalController
} from '@ionic/vue'
import VerifyNumberVue from './Layouts/VerifyNumber.vue';
import { Get } from "../storage";

export default {
    name: 'Home',
    components: {
        IonContent,
        IonPage,
        IonButton,
        IonText,
        IonInput
    },
    data(){
        return{
            tel: '',
        }
    },
    methods:{
        async login(){
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

        if(token){
            location.replace("/dashboard")
        }
    },
    
    
};
</script>

<style scoped>
.img {
    max-width: 150px;
    max-height: 100px;
    background: white !important;

}
</style>
