<template>
<ion-footer class="ion-padding" style="max-height:500px !important">
    <div class="ion-text-end">
        <ion-text @click="closeModal" class="century">
            <Icon icon="iconoir:cancel" class="" style="font-size:30px !important" />
        </ion-text>
    </div>
    <div class="ion-padding text14 century ion-text-center" style="margin-top:20px !important">
        <ion-text class="ion-margin">
            <i>"Input the Verification Code Sent to your mobile"</i> Luke says..
        </ion-text>
    </div>
    <br>
    <div class="ion-padding df jcm alm" style="margin-top:15vh">
        <span>
            <ion-row text-center class="">
                <ion-col>
                    <ion-input id="otp1" required maxLength="1" v-model="one" class="text16 ion-text-center century" placeholder="0" inputmode="numeric" @keyup="next('otp2')">
                    </ion-input>
                    <ion-input id="otp2" required maxLength="1" v-model="two" class="text16 ion-text-center century" placeholder="0" inputmode="numeric" @keyup="next('otp3')">
                    </ion-input>
                    <ion-input id="otp3" required maxLength="1" v-model="three" class="text16 ion-text-center century" placeholder="0" inputmode="numeric" @keyup='next("opt4")'>
                    </ion-input>
                    <ion-input id="opt4" required maxLength="1" v-model="four" class="text16 ion-text-center century" placeholder="0" inputmode="numeric" >
                    </ion-input>
                </ion-col>
            </ion-row>
            <div class="ion-text-center ion-text-end">
                <ion-text style="color:gray;cursor:pointer" @click="clear()">
                    <b>
                        Clear
                    </b>
                </ion-text>
            </div>

            <br><br><br>
            <ion-button expand="block bodoni ion-text-capitalize text16 ion-margin-top" style="max-width:300px" @click="verify">
                <b>
                    Verify {{tel}}
                </b>
            </ion-button>
        </span>
    </div>
</ion-footer>
</template>

<script>
import {
    modalController,
    IonInput
} from "@ionic/vue";
import {
    Icon
} from '@iconify/vue';
import axios from 'axios';
import { Store,openLoading,dismiss,showError } from '../../storage.js';

export default {

    name: "VerifyNumber",
    props:['tel'],
    components: {
        Icon,
        IonInput
    },
    methods: {
        next(next) {
            document.getElementById(next).setFocus();
        },
        clear() {
            this.one = '';
            this.two = '';
            this.three = '';
            this.four = '';
        },
        verify(){
            openLoading()
            axios.post(this.$hostname + '/api/user/create',{
                    tel : this.tel
                })
                .then((res) => {
                    console.log(res.data.token)
                    Store('token',res.data.token)
                    Store('user',res.data.user)
                    location.replace('/register')
                    dismiss()
                })
                .catch((error) => {
                    showError(error)
                    dismiss()
                })
                // .then((error) => function(){
                //       openToast(error.response.data.message)
                // })
            }
    },
    setup() {
        const closeModal = function () {
            modalController.dismiss();
        };

        return {
            closeModal
        };
    },
    data() {
        return {
            one: '',
            two: '',
            three: '',
            four: '',
            code: this.one + this.two + this.three + this.four
        }
    },
    created(){
        
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

ion-input {
    display: inline-block;
    width: 30px;
    height: 50px;
    margin: 5px;
    --background: none;
    border: none;
    border-bottom: 2px solid lightgray;
    --padding-end: 7px;
}
ion-input:focus{
    border-bottom: 2px solid blue;
}

</style>
