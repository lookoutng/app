<template>
<form class="ion-padding ion-text-center" style="margin-top:7vh" @submit.prevent="update">
    <div class=" df jcm">
        <label id="label" for="dp" :style=" image ? 'background-image:url('+ image + ');' :'background-image:url('+ this.$hostname + '/images/' + this.dp +  ');background-repeat:no-repeat;'" class="profile df alm jcm">
            <Icon icon="carbon:add-filled" class="ion-no-margin ion-no-padding" style="color:#3880ff;position:absolute;background:white;border-radius:100%;padding:0px;min-width:50px;min-height:50px;right:0;top:10%" />
            <ion-text v-if="!image && !dp" class="century text16">
                <b>Profile Picture</b>
            </ion-text>
        </label>
    </div>

    <!-- <ion-spinner class="ion-wrapper-overlay" role="modal"></ion-spinner> -->
    <input id="dp" accept="image/png, image/gif, image/jpeg" class="ion-hide button century ion-margin-top" type="file" placeholder="Username" @change="preview" />
    <ion-input class="button century ion-margin-top" :value="tel" disabled></ion-input>
    <ion-input class="button century ion-margin-top" v-model="username" placeholder="Username" @keyup="checkChanges" required="true"></ion-input>
    <ion-input class="button century ion-margin-top" v-model="email" type="email" placeholder="Example@gmail.com" @keyup="checkChanges" required="true"></ion-input>
        <ion-button expand="block bodoni ion-text-capitalize text16 ion-margin-top" type="submit" id="ProfileUpdate" disabled>
            Update
        </ion-button>
    </form>
</template>

<script>
import {
    IonButton,
    IonText,
    IonInput,
} from '@ionic/vue'
import {
    Icon
} from '@iconify/vue';
import {
    Get,
    Store,
    openLoading,
    dismiss,
    showError,
    openToast
} from '../../storage'
import axios from 'axios'

export default {
    name: 'Register',
    props: ['href'],
    components: {
        IonButton,
        IonText,
        IonInput,
        Icon
    },
    data() {
        return {
            email: '',
            Oemail: '',
            username: '',
            Ousername: '',
            dp: '',
            image: '',
            tel: ''
        }
    },
    methods: {
        async getNumber() {
            const tel = await Get('tel')
            this.number = tel

            return tel;
        },
        Ihaveedited() {
            document.getElementById('ProfileUpdate').disabled = false
        },
        checkChanges() {
            if (this.Oemail != this.email || this.Ousername != this.username || this.$route.name == "Reg")
                document.getElementById('ProfileUpdate').disabled = false
            else
                document.getElementById('ProfileUpdate').disabled = true
        },
        preview() {
            this.Ihaveedited()
            var imagefile = document.querySelector('#dp');
            this.image = URL.createObjectURL(imagefile.files[0])
            console.log(imagefile.files[0])
        },
        async update() {
            openLoading()
            const token = await Get('token')
            axios.post(this.$hostname + '/api/user/update', this.formdata(), {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                .then((res) => {
                    Store('points', res.data.user.points)
                    Store('dp', res.data.user.dp)
                    this.checkChanges()

                    Store('name', res.data.user.username)
                    Store('email', res.data.user.email)
                    openToast(res.data.message)

                    if (this.$route.name == "Reg")
                        location.replace('/dashboard')

                    dismiss()
                })
                .catch((error) => {
                    console.log(error)
                    showError(error)
                    dismiss()
                })
        },
        formdata() {
            var form = new FormData()
            if (this.Oemail != this.email)
                form.append('email', this.email)
            if (this.Ousername != this.username)
                form.append('username', this.username)

            var imagefile = document.querySelector('#dp');
            if (imagefile.files[0])
                form.append("image", imagefile.files[0]);

            return form;
        },
        extension() {
            var array = this.dp.split('.')
            console.log(array)
            return "." + array[array.length - 1]
        }
    },
    async mounted() {
        this.checkChanges()
        openLoading()
        const token = await Get('token')
        axios.get(this.$hostname + '/api/user', {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then((res) => {
                this.email = res.data.user.email
                this.username = res.data.user.username

                this.Oemail = res.data.user.email
                this.Ousername = res.data.user.username
                this.dp = res.data.user.dp
                this.tel = res.data.user.tel

                Store('points', res.data.user.points)
                Store('dp', res.data.user.dp)
                Store('name', res.data.user.username)
                Store('email', res.data.user.email)
                dismiss()
            })
            .catch((error) => {
                console.error(error)
                dismiss()
                showError(error)
            })
    }
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
    background-size: cover !important;
    padding: 0px;
    box-shadow: lightgray 0px 1px 5px 2px;
    background-repeat: no-repeat !important;
}
</style>
