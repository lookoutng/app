<template>
<ion-footer class="ion-padding" style="max-height:500px !important">
    <div class="ion-text-end">
        <ion-text @click="closeModal" class="century">
            <Icon icon="iconoir:cancel" class="" style="font-size:30px !important" />
        </ion-text>
    </div>
    <br>
    <div class="century text14 ion-text-center">
        Luke asks <b>Why are you reporting ?</b>
    </div>
    <br>
    <form class="" @submit.prevent="report">
        <ion-list class="ion-margin-vertical">
            <ion-item class="century text12">
                <ion-checkbox slot="start" v-model="summary">
                </ion-checkbox>
                <ion-label>
                    Internet Fraud
                </ion-label>
            </ion-item>

            <ion-item class="century text12">
                <ion-checkbox slot="start" v-model="summary">
                </ion-checkbox>
                <ion-label>
                    Sexual Abuse
                </ion-label>
            </ion-item>

            <ion-item class="century text12">
                <ion-checkbox slot="start" v-model="summary">
                </ion-checkbox>
                <ion-label>
                    Spam
                </ion-label>
            </ion-item>

            <ion-item class="century text12 ion-item" :disabled="isOthersChecked()">
                <ion-label>
                    Other :
                </ion-label>
                <ion-input type="text" v-model="summary"></ion-input>
            </ion-item>
        </ion-list>

        <ion-button expand="block" style="width:100%" class="ion-text-capitalize bodoni ion-margin-top text18" color="danger" type="submit">
            <b>
                Report
            </b>
        </ion-button>
    </form>
</ion-footer>
</template>

<script>
import {  IonFooter, modalController, IonCheckbox } from "@ionic/vue";
import { Icon } from '@iconify/vue';
import { openLoading, openToast } from '@/functions/widget'
import { reportAnswer } from '@/services/answer'

export default {
    name: "Report",
    props: ['answerId'],
    components: {
        IonFooter,
        Icon,
        IonCheckbox
    },
    data() {
        return {
           summary:[]
        }
    },
    methods: {
        async report() {
            openLoading()
            reportAnswer(this.answerId, {
                    summary: this.summary.join(" ")
                })
                .then((res) => {
                    openToast(res.data.message)
                    this.closeModal()
                })
               
        },
        async closeModal() {
            modalController.dismiss();
        },
        isOthersChecked() {
            if (this.spam || this.fraud || this.sexual)
                return true
        }
    },
    
};
</script>

<style scoped>
ion-item {
    --border-color: white;
}

.ion-item {
    --border-color: lightgray !important;
}
</style>
