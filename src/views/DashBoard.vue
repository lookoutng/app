<template>
<ion-page>
    <ion-header>
        <app-header title="DashBoard"></app-header>
    </ion-header>
    <ion-content class="ion-padding">
        <refresh></refresh>
        <div class="ion-padding text14 head ion-text-center" style="">
            <ion-text class="ion-margin-horizontal text14"  v-if="points >= 30">
                <b>Ask a New Question</b>
            </ion-text>

            <ion-text class="ion-margin-horizontal" color="danger" v-if="points < 30">
                <b>
                    Not enough points !!!
                </b>
            </ion-text>
        </div>

        

        <form @submit.prevent="createQuestion()" class="pg" v-if="points >= 30">
            <ion-item class="ion-margin-top">
                <ion-select class="text14" v-model="type" interface="popover" no-lines required>
                    <ion-select-option value="N">Number</ion-select-option>
                    <ion-select-option value="M">MultiChoice</ion-select-option>
                    <ion-select-option value="S">Short text</ion-select-option>
                </ion-select>
            </ion-item>
                
            <ion-item>
                <Icon icon="bx:bx-current-location" class="text18" slot="end" style="color:blue" @click="getMyLocation" />
                <input id="location" v-model="location" @click="getAddress()" class="text14 ion-no-border w-100" placeholder="Target Location" type="text"/>
            </ion-item>

            <div class="">
                <ion-item>
                    <ion-textarea @click="getTargetLocation" class="df alm" v-model="body" placeholder="Your Question..."  required></ion-textarea>
                </ion-item>
                <br>

                <div class="" v-if="type == 'M'">
                    <ion-list class="">
                        <ion-item v-for="(entry, index) in options" :key="entry.key" class="century text12">
                            <ion-input type="text" v-model="entry.body"></ion-input>
                            <ion-checkbox slot="start" disabled>
                            </ion-checkbox>
                            <Icon icon="iconoir:cancel" class="text16" style="color:gray" slot="end" @click="Remove(index)" />
                        </ion-item>

                        <ion-item class="text12" @keypress.enter="save()">
                            <ion-input type="text" v-model="addOption" placeholder="Add Option"></ion-input>
                            <ion-checkbox slot="start">
                            </ion-checkbox>
                        </ion-item>
                    </ion-list>
                </div>

                <ion-button expand="block" style="width:100%" class="head ion-text-capitalize bodoni text14" type="submit">
                        Ask Question
                </ion-button>

            </div>
        </form>

        <!-- FORM FOR INAVAILABLE POINTS -->


        <form v-if="points < 30" class="pg">
            <ion-item class="ion-margin-top" disabled>
                <ion-select class="text14" v-model="type" interface="popover" no-lines disabled>
                    <ion-select-option value="N">Number</ion-select-option>
                    <ion-select-option value="M">MultiChoice</ion-select-option>
                    <ion-select-option value="S">Short text</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item disabled>
                <Icon icon="bx:bx-current-location" slot="end" style="color:blue" />
                <ion-input class="text14" placeholder="Target Location"></ion-input>
            </ion-item>
            <locate></locate>

            <div class="ion-padding ion-margin-top ion-text-center">
                <ion-item class="ion-no-padding ion-text-center" disabled no-padding>
                    <ion-textarea class="ion-text-center lgray" placeholder="Your Question..." required></ion-textarea>
                </ion-item>
                <br>

                <ion-button expand="" style="width:100%" class="head ion-text-capitalize text14" type="submit" disabled>
                        Ask Question
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
    showError,
    getAddress
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
        Icon,
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
        getAddress(){
            getAddress()
            this.getTargetLocation()
        },
        async getTargetLocation(){
            const _this = this
            let coords = {}

            let results = (await window.google.maps.Geocoder.prototype.geocode({
                address: _this.location
            })).results;
            
            //console.log(results, status)
            coords.lat = results[0].geometry.location.lat()
            coords.long = results[0].geometry.location.lng()

            return coords;
        },
        async getMyLocation(){
            const _this = this
            await Geolocation.getCurrentPosition().then((e) => {

            const lat = e.coords.latitude
            const long = e.coords.longitude
            const location =  new window.google.maps.LatLng(lat, long)

            window.google.maps.Geocoder.prototype.geocode({
                location:location
            },function(results, status) {
                _this.location = results[4].formatted_address
                if(status != 'OK'){
                    openToast("Invalid Location, Kindly choose from the dropdown")
                }
                console.log(results, status)
            })

            })
            .catch((e) => console.log(e))
        },
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
        rel() {
            this.body = ''
            this.location = ''
            this.type = 'S'
            this.options = [{
                    body: 'yes'
                },
                {
                    body: 'no'
                },
            ]
        },
        async createQuestion() {
            openLoading()
            let targetLocation  = await this.getTargetLocation()
            const lat = targetLocation.lat
            const long = targetLocation.long
            
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
                    this.rel()
                    dismiss()
                })
                .catch((error) => {
                    showError(error)
                    success = false
                })

            if (success) {
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
    padding: px;
}
Icon{
}
ion-item {
    --border-color: white;
}

ion-checkbox {
    --border-radius: 100%
}

ion-textarea {
    width: 100%;
    min-height: 150px;
    background-color:none;
}
textarea {
    min-height: 200px !important;
    
}
input{
    border:none !important;
    min-height:50px;
    background-color: white !important;

}
input:active{
    border:none !important; 
    
}
.ion-no-padding {
    --padding-bottom: 0px !important;
    --padding-top: 0px !important;
    --padding-start: 0px !important;
    --padding-end: 0px !important;
}

</style>
