<template>
<ion-toolbar class="salm">
    <ion-buttons slot="start">
        <ion-button class="icon-only" @click="openFirst">
            <ion-thumbnail>
                <!-- <ion-spinner></ion-spinner> -->
                <img :src=" user.dp ? this.$hostname+'/images/' + this.user.dp : ''" class="header-img" >
            </ion-thumbnail>
        </ion-button>
    </ion-buttons>
    <ion-title class="head text16">
            <b>
                {{ title }}
            </b>
    </ion-title>
    <ion-buttons slot="end">
        <ion-button class="icon-only ion-no-padding" no-padding>
            <img src="/img/star.png" class="header-img">
            <ion-text class="head text14" style="">
                <b>
                    {{ user.points }}
                </b>
            </ion-text>
        </ion-button>
    </ion-buttons>
</ion-toolbar>
</template>

<script>
import { IonButtons, IonTitle, IonToolbar, menuController } from '@ionic/vue'
import { getObject } from '@/functions/storage'

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
            user:{
                points:'000',
                dp:'',
            }
        }
    },
    methods: {
        openFirst() {
            menuController.enable(true, 'first');
            menuController.open('first');
        },
    },
    async created(){
       this.user = getObject('user')
    },
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
