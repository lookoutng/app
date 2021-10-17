<template>
<ion-page>
    <ion-header>
        <app-header title="DashBoard"></app-header>
    </ion-header>
    <ion-content class="ion-padding">
        <refresh></refresh>
        <div class="ion-padding text14 century ion-text-center" style="">
            <ion-text class="ion-margin-horizontal" v-if="points >= 30">
                <b>
                    Luke
                </b>
                <i>

                </i>is Ready to Answer your Question

            </ion-text>

            <ion-text class="ion-margin-horizontal" v-if="points < 30">
                <b>
                    Luke says
                </b>
                <i>

                </i>Not enough points

            </ion-text>
        </div>

        <form @submit.prevent="createQuestion()" v-if="points >= 30">
            <ion-item class="ion-margin-top">
                <ion-select class="text14 century" v-model="type" interface="popover" no-lines required>
                    <ion-select-option value="N">Number</ion-select-option>
                    <ion-select-option value="M">MultiChoice</ion-select-option>
                    <ion-select-option value="S">Short text</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item>
                <Icon icon="bx:bx-current-location" slot="end" style="color:blue" />
                <ion-input class="century text14" v-model="location" placeholder="Target Location" required></ion-input>
            </ion-item>
            <locate></locate>

            <div class="ion-padding ion-margin-top ion-text-center">
                <ion-textarea position="foating" class="century ion-text-center lgray" v-model="body" placeholder="Your Question..." required></ion-textarea>
                <br>

                <div class="" v-if="type == 'M'">
                    <ion-list class="">
                        <ion-item v-for="(entry, index) in options" :key="entry.key" class="century text12">
                            <ion-input type="text" v-model="entry.value"></ion-input>
                            <ion-checkbox slot="start" disabled>
                            </ion-checkbox>
                            <Icon icon="iconoir:cancel" class="text16" style="color:gray" slot="end" @click="Remove(index)" />
                        </ion-item>

                        <ion-item class="century text12" @keypress.enter="save()">
                            <ion-input type="text" v-model="addOption" placeholder="Add Option"></ion-input>
                            <ion-checkbox slot="start">
                            </ion-checkbox>
                        </ion-item>
                    </ion-list>
                </div>

                <ion-button expand="block" style="width:100%" class="ion-text-capitalize bodoni text18" type="submit">
                    <b>
                        Ask Question
                    </b>
                </ion-button>

            </div>
        </form>

        <form v-if="points < 30">
            <ion-item class="ion-margin-top" disabled>
                <ion-select class="text14 century" v-model="type" interface="popover" no-lines disabled>
                    <ion-select-option value="N">Number</ion-select-option>
                    <ion-select-option value="M">MultiChoice</ion-select-option>
                    <ion-select-option value="S">Short text</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item disabled>
                <Icon icon="bx:bx-current-location" slot="end" style="color:blue" />
                <ion-input class="century text14" placeholder="Target Location"></ion-input>
            </ion-item>
            <locate></locate>

            <div class="ion-padding ion-margin-top ion-text-center">
                <ion-item class="ion-no-padding ion-text-center" disabled no-padding>
                    <ion-textarea class="century ion-text-center lgray" placeholder="Your Question..." required></ion-textarea>
                </ion-item>
                <br>

                <ion-button expand="block" style="width:100%" class="ion-text-capitalize bodoni text18" type="submit" disabled>
                    <b>
                        Ask Question
                    </b>
                </ion-button>

            </div>
        </form>
    </ion-content>
    <ion-footer>
        <Footer></Footer>
    </ion-footer>
</ion-page>
</template>

<script>
import {
    IonContent,
    IonHeader,
    IonPage,
    IonText,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,

} from '@ionic/vue'
import {
    Icon
} from '@iconify/vue';
import {
    Geolocation
} from '@capacitor/geolocation';
import {
    Get,
    openToast,
    openLoading,
    Store,
    dismiss,
    showError
} from '../storage';
import axios from 'axios';

export default {
    name: 'QuestionHistory',
    components: {
        IonContent,
        IonPage,
        IonText,
        IonHeader,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonTextarea,
        Icon
    },
    data() {
        return {
            options: [{
                    body: 'yes'
                },
                {
                    body: 'no'
                },
            ],
            addOption: '',
            type: 'S',
            body: '',
            location: '',
            points: '000'
        }
    },
    methods: {
        save() {
            this.options.push({
                body: this.addOption
            })
            this.addOption = ''
        },
        Remove(id) {
            if (this.options.length > 2) {
                console.log(id)
                if (id == 0)
                    this.options.splice(0, 1)
                else
                    this.options.splice(id, 1)
            }
        },
        dismiss() {
            this.body = ''
            this.location = ''
            this.type = 'S'
        },

        async createQuestion() {
            openLoading()
            const coordinates = await Geolocation.getCurrentPosition();

            const lat = coordinates.coords.latitude
            const long = coordinates.coords.longitude
            let success = false
            const token = await Get('token');

            axios.post(this.$hostname + '/api/question/create', {
                    body: this.body,
                    type: this.type,
                    lat: lat,
                    long: long,
                    options: this.options
                }, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": "Bearer " + token,
                        "Accept": "application/json"
                    }
                })
                .then((res) => {
                    console.log(res)
                    openToast('Question posted successfully')
                })  
                .catch((error) => {
                    showError(error)
                    success = false
                })

            if (success) {
                dismiss()
                setTimeout(function () {
                    location.replace("/dashboard")
                }, 3000);
            }
        }
    },
    setup() {

    },
    async mounted() {
        openLoading()
        const token = await Get('token')
        axios.get(this.$hostname + '/api/user', {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then((res) => {
                this.points = res.data.user.points
                Store('points', res.data.user.points)
                Store('dp', res.data.user.dp)
                Store('name', res.data.user.username)
                Store('email', res.data.user.email)
                dismiss()
            })
            .catch((error) => {
                console.error(error)
                openToast(error.message)
                dismiss()

            })

    }
}
</script>

<style scoped>
.img {
    max-width: 150px;
    background: white !important;

}

.profile {
    min-width: 210px;
    min-height: 210px;
    height: 20vh;
    width: 20vh;
    border-radius: 100%;
    align-self: center
}

.-img {
    padding: 10px;
}

ion-item {
    --border-color: white;
}

ion-checkbox {
    --border-radius: 100%
}

ion-textarea {
    min-width: 200px;
    min-height: 200px;
    --padding-top: 85px;
    --placeholder-font-weight: 100;
    border-radius: 7px !important;

}

.ion-no-padding {
    --padding-bottom: 0px !important;
    --padding-top: 0px !important;
    --padding-start: 0px !important;
    --padding-end: 0px !important;
}
</style>
