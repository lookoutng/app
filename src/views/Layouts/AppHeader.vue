<template>
<ion-toolbar class="salm">
    <ion-buttons slot="start">
        <ion-button class="icon-only" href="/profile">
            <ion-thumbnail>
                <!-- <ion-spinner></ion-spinner> -->
                <img :src=" this.dp ? this.$hostname+'/images/' + this.dp : ''" class="header-img" >
            </ion-thumbnail>
        </ion-button>
    </ion-buttons>
    <ion-title class="century text16">
            {{ title }}
    </ion-title>
    <ion-buttons slot="end">
        <ion-button class="icon-only ion-no-padding" no-padding>
            <img src="/img/star.png" class="header-img">
            <ion-text class="century text14" style="">
                <b>
                    {{ points }}
                </b>
            </ion-text>
        </ion-button>
    </ion-buttons>
</ion-toolbar>
</template>

<script>
import {
    IonButtons,
    IonTitle,
    IonToolbar
} from '@ionic/vue'
import {  Get,storeUser } from '../../storage.js';
import axios from 'axios'

export default {
    name: 'AppHeader',
    props: ['title'],
    components: {
        IonButtons,
        IonTitle,
        IonToolbar
    },
    data(){
        return{
            points:'000',
            dp:'',
            username:''
        }
    },
    async mounted(){
        const token = await Get('token')
        axios.get(this.$hostname + '/api/user', {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then((res) => {
                this.points = res.data.user.points
                this.username = res.data.user.username
                this.dp = res.data.user.dp
                storeUser(res)
            })
            .catch((error) => {
                console.error(error)
            })

   

    },
    setup(){
        
    }
}
</script>

<style scoped>
 ion-thumbnail img{
     border-radius: 20% !important;
     width: 35px !important;
     height: 35px !important;
    max-width: 35px !important;
    max-height: 35px !important;
 
 }
</style>
