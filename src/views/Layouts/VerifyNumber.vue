<template>
<ion-footer class="ion-padding">
    <div class="ion-text-end">
        <ion-text @click="closeModal" class="century">
            <Icon icon="iconoir:cancel" class="ion-float-start" /><br>
        </ion-text>
    </div>
    <div class="ion-padding-vertical ion-padding-start century vef-div" >
        <ion-text class="ion-text-center text18 head">
                Verification sent to <b>{{ tel }}</b> , expires in 10 minutes.
        </ion-text>
    </div>
    <br>
    <form class="ion-padding" @submit.prevent="verify">
            <ion-item class="ion-margin-vertical">
                <ion-input type="text" v-model="code" minLength="6" maxLength="6" class="century  text14" placeholder="Security Code"></ion-input>
            </ion-item>
            <ion-button class="bodoni ion-text-capitalize ion-margin-vertical" expand="block" type="submit">
                    Verify
            </ion-button>
    </form>
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
import {
    Store,
    openLoading,
    dismiss,
    showError,
    openToast
} from '../../storage.js';

export default {

    name: "VerifyNumber",
    props: ['tel'],
    components: {
        Icon,
        IonInput
    },
    data() {
        return {
            code: '',
        }
    },
    methods: {
        getAccount() {
            openLoading()
            axios.post(this.$hostname + '/api/user/create', {
                    tel: this.tel
                })
                .then((res) => {
                    console.log(res.data.token)
                    Store('token', res.data.token)
                    Store('user', res.data.user)
                    location.replace('/register')
                    dismiss()
                })
                .catch((error) => {
                    showError(error)
                    })
        },
        verify() {
            const code = this.code;
            console.log(code)
            window.confirmationResult.confirm(code).then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log(user)
                this.getAccount()
                // ...
            }).catch((error) => {
                console.log(error)
                openToast("User couldn't sign in (bad verification code?)")

                
                // User couldn't sign in (bad verification code?)
                // ...
            });
            
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
    mounted() {
        dismiss()
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
    --background: none;
    border: none;
}
ion-input:focus {
    border-bottom: 2px solid blue;
}
form{
    margin-top:20vh
}
.vef-div{
    margin-top:20px !important
}
Icon{
    font-size:30px !important
}
</style>
