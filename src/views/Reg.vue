<template>
<ion-page>
    <ion-content class="">
        <div class="ion-padding text16 century ion-text-center" style="margin-top:50px !important">
            <ion-text class="ion-margin text-gray">
               Update Your Profile
            </ion-text>
        </div>
        <Register></Register>
    </ion-content>
</ion-page>
</template>

<script>
import {
    IonContent,
    IonPage,
    IonText,
} from '@ionic/vue'
import Register from './Layouts/Register.vue'

export default {
    name: 'Reg',
    components: {
        IonContent,
        IonPage,
        IonText,
        Register
    },
};
</script>

<style scoped>
.img {
    max-width: 150px;
    background: white !important;

}

.profile {
    position: relative;
    min-width: 200px;
    min-height: 200px;
    width: min-content;
    border-radius: 100%;
    border-radius: 100%;
    background-size: contain !important;
    padding: 0px;
    box-shadow: lightgray 0px 1px 5px 2px;
}
</style>
