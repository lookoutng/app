<template>
<form class="ion-padding ion-text-center pg" style="margin-top:7vh" @submit.prevent="update">
    <div class=" df jcm ion-margin-bottom">
        <label id="label" for="dp" :style=" image ? 'background-image:url('+ image + ');' :'background-image:url('+ this.$hostname + '/images/' + user.dp +  ');background-repeat:no-repeat;'" class="profile df alm jcm">
            <Icon icon="carbon:add-filled" class="ion-no-margin ion-no-padding" style="color:#3880ff;position:absolute;background:white;border-radius:100%;padding:0px;min-width:50px;min-height:50px;right:0;top:10%" />
            <ion-text v-if="!image && !dp" class="century text16">
                <b>Profile Picture</b>
            </ion-text>
        </label>
    </div>

    <!-- <ion-spinner class="ion-wrapper-overlay" role="modal"></ion-spinner> -->
    <input id="dp" accept="image/png, image/gif, image/jpeg" class="ion-hide button century ion-margin-top" type="file" placeholder="Username" @change="preview" />
    <ion-input class="button century ion-margin-top" :value="user.tel" disabled></ion-input>
    <ion-input class="button century ion-margin-top" v-model="user.username" placeholder="Username" @keyup="checkChanges" required="true"></ion-input>
    <ion-input class="button century ion-margin-top ion-margin-bottom" v-model="user.email" type="email" placeholder="Example@gmail.com" @keyup="checkChanges" required="true"></ion-input>
        <ion-button expand="block bodoni ion-text-capitalize text16 ion-margin-top" type="submit" id="ProfileUpdate" disabled>
            Update
        </ion-button>
    </form>
</template>

<script>
import { IonButton, IonText, IonInput, } from '@ionic/vue'
import { Icon } from '@iconify/vue';
import { openLoading, dismiss, showError } from '@/functions/widget'
import  { getLoggedInUser, updateUser } from '@/services/user'

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
            oldUser: {
                dp: "",
                email: "",
                points: 0,
                tel: "",
                username: ""
            },
            image: '',
            user: {
                dp: "",
                email: "",
                points: 0,
                tel: "",
                username: ""
            }
        }
    },
    methods: {
        iHaveEdited() {
            document.getElementById('ProfileUpdate').disabled = false
        },
        checkChanges() {
            if (this.oldUser.email != this.user.email || this.oldUser.username != this.user.username || this.$route.name == "Reg")
                document.getElementById('ProfileUpdate').disabled = false
            else
                document.getElementById('ProfileUpdate').disabled = true
        },
        preview() {
            this.iHaveEdited()
            let imagefile = document.querySelector('#dp');
            this.image = URL.createObjectURL(imagefile.files[0])
            console.log("Image:",imagefile.files[0])
        },
        formdata() {
            let form = new FormData()
            let imagefile = document.querySelector('#dp');

            if (this.oldUser.email != this.email)
                form.append('email', this.email)
            if (this.oldUser.username != this.username)
                form.append('username', this.username)

            if (imagefile.files[0])
                form.append("image", imagefile.files[0]);

            return form;
        },
        async update() {
            openLoading()
            updateUser(this.formdata()).then((res) => {
                caches.add(this.$hostname + '/images/' + res.data.user.dp)
                this.checkChanges()
                showError(res)

                if (this.$route.name == "Reg")
                    location.replace('/dashboard')

                dismiss()
            })
            .catch((error) => {
                showError(error)
                dismiss()
            })
            
        },
      
    },
    mounted() {
        this.checkChanges()
        openLoading()
        const t_his = this
        getLoggedInUser()
        .then((res) => {
            t_his.user = res.user
            t_his.oldUser = res.user
            console.log("Olduser", res.user.ponts)
            dismiss()
        })
        .catch((error) => {
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
