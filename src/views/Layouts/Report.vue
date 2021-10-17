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
                <ion-checkbox slot="start" v-model="fraud">
                </ion-checkbox>
                <ion-label>
                    Internet Fraud
                </ion-label>
            </ion-item>

            <ion-item class="century text12">
                <ion-checkbox slot="start" v-model="sexual">
                </ion-checkbox>
                <ion-label>
                    Sexual Abuse
                </ion-label>
            </ion-item>

            <ion-item class="century text12">
                <ion-checkbox slot="start" v-model="spam">
                </ion-checkbox>
                <ion-label>
                    Spam
                </ion-label>
            </ion-item>

            <ion-item class="century text12 ion-item" :disabled="others()">
                <ion-label>
                    Other :
                </ion-label>
                <ion-input type="text" v-model="other"></ion-input>
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
import {
    IonFooter,
    modalController,
    IonCheckbox
} from "@ionic/vue";
import {
    Icon
} from '@iconify/vue';
import {
    openLoading,
    Get,
    dismiss,
    openToast
} from '../../storage'
import axios from 'axios'

export default {
    name: "Report",
    props: ['answer_id'],
    components: {
        IonFooter,
        Icon,
        IonCheckbox
    },
    methods: {
        async report() {
            openLoading()
            let summary
            if (this.spam)
                summary +="spam, "
            if (this.sexual)
                summary +="sexual"
            if (this.fraud)
                summary += "fraud"
            summary += this.other
            const token = await Get('token')
            axios.put(this.$hostname + '/api/answer/report/' + this.answer_id, {
                    summary: summary
                }, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                .then((res) => {
                    console.log(res.data)
                    dismiss()
                    openToast(res.data.message)
                    this.closeModal()

                })
                .catch((error) => {
                    console.log(error)
                    dismiss()
                })
        },
        async closeModal() {
            modalController.dismiss();
        },
        others() {
            if (this.spam || this.fraud || this.sexual)
                return true
        }
    },
    setup() {

    },
    data() {
        return {
            spam: false,
            fraud: false,
            sexual: false,
            other: ''
        }
    }
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
