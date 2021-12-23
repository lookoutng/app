<template>
<ion-page>
    <ion-header>
        <app-header title="Recent Question"></app-header>

    </ion-header>
    <ion-tab-bar class="ion-margin pg ion-border" slot="top">
        <ion-tab-button tab="answered" class="" href="/questions/view">
            Recent
        </ion-tab-button>
        <ion-tab-button tab="recent" href="/questions/answered">
            Answered
        </ion-tab-button>
    </ion-tab-bar>
    <ion-content class="ion-padding-bottom">

        <ion-item class="no-line ion-margin-top century" style="overflow:unset !important">
            <ion-range min="1" max="30" v-model="range" step="1" style="" pin="true" @ionBlur="getRanged">
                <ion-label slot="start">km</ion-label>
                <ion-label slot="end">30km</ion-label>
            </ion-range>
        </ion-item>

        <div class="ion-text-center bodoni ion-padding head" style="margin-top:12vh;color:#bbb" v-if="!questions[0]">
            <h3>
                <b>
                    No Question Found for the Selected Range
                </b>
            </h3>
        </div>

        <ion-list lines="full" class="pg">
            <vue-collapsible-panel-group accordion>
                <vue-collapsible-panel v-for="q in questions" :key="q.id" :expanded="false" class="">
                    <template #title>
                        <ion-item :id="'question'+q.id" @click="open(q.id)" class="ion-no-margin">
                            <ion-thumbnail>
                                <img src="/img/number.png" v-if="q.type == 'N'" class="-img" />
                                <img src="/img/option.png" v-else-if="q.type == 'M'" class="-img" />
                                <img src="/img/short-text.jpg" v-else-if="q.type == 'S'" class="-img" /><img :src="q.avatar" class="-img" />
                            </ion-thumbnail>
                            <ion-label class="">
                                <ion-text class="century ion-text-wrap text12">
                                    {{ q.body }}
                                </ion-text>
                            </ion-label>
                        </ion-item>

                    </template>
                    <template #content>
                        <div class="ion-text-center ion-padding" :id="'Div'+q.id" style="width:100%;border-bottom:1px solid lightgray">
                            <form @submit.prevent="send(q.id)">
                                <ion-input placeholder="Answer" :id="'answer' + q.id" class="century button text14 ion-padding-vertical" v-if="q.type == 'S'" required>
                                </ion-input>
                                <ion-input placeholder="Answer" :id="'answer' + q.id" class="century button text14 ion-padding-vertical" inputmode="numeric" v-else-if="q.type == 'N'" required>
                                </ion-input>

                                <ion-select :interface-options="Answer" :id="'answer' + q.id" v-else-if="q.type == 'M'" class="text14 century ion-text-Capitalize" placeholder="Choose Answer" interface="action-sheet" no-lines required>
                                    <ion-select-option v-for="option in q.options" :key="option.key" :value="option.body" class="century text14">
                                        {{ option.body }}
                                    </ion-select-option>
                                </ion-select>
                                <ion-button expand="block" class="ion-text-capitalize bodoni button text16" type="submit">
                                    <b>
                                        Answer
                                    </b>
                                </ion-button>
                            </form>
                        </div>
                    </template>
                </vue-collapsible-panel>

            </vue-collapsible-panel-group>
        </ion-list>

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
    IonItem,
    IonRange,
    IonTabButton,
    IonTabBar,
    IonInput,
    IonThumbnail,
    IonText,
} from '@ionic/vue'
import {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
} from '@dafcoe/vue-collapsible-panel'
import {
    dismiss,
    Get,
    openLoading,
    showError,
} from '../storage'
import axios from 'axios'
import {
    Geolocation
} from '@capacitor/geolocation';

export default {
    name: 'QuestionHistory',
    components: {
        IonContent,
        IonPage,
        IonItem,
        IonHeader,
        IonRange,
        IonTabButton,
        IonTabBar,
        IonInput,
        IonThumbnail,
        IonText,
        VueCollapsiblePanelGroup,
        VueCollapsiblePanel,
    },
    data() {
        return {
            questions: [],
            range: 3,

        }
    },
    methods: {
        open(id) {

            var open = document.getElementsByClassName('ion-item')
            open.forEach(element => {
                element.classList.remove("ion-item")
            });
            document.getElementById('question' + id).classList.add("ion-item");

            console.log(this.range)
        },
        async send($question_id) {
            const token = await Get('token')

            const ref = 'answer' + $question_id
            axios.post(this.$hostname + '/api/answer/create/question/' + $question_id, {
                    body: document.getElementById(ref).value,
                }, {
                    headers: {
                        "Authorization": 'Bearer ' + token,
                        "Accept": 'application/json'
                    },
                })
                .then(() => {
                    for (const key in this.questions) {
                        if (this.questions[key].id == $question_id) {
                            this.splice(key, 1)
                        }
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        async getRanged(){
            openLoading()

            const token = await Get('token')
            const coordinates = await Geolocation.getCurrentPosition();
            
            const lat = coordinates.coords.latitude
            const long = coordinates.coords.longitude

            axios.get(this.$hostname + '/api/questions', {
                    headers: {
                        "Authorization": 'Bearer ' + token,
                        "Accept": 'application/json'
                    },
                    params: {
                        lat: lat,
                        long: long,
                        range: this.range
                    }
                })
                .then((res) => {
                    this.questions = res.data.questions
                    console.log(this.questions)
                    dismiss()
                })
                .catch((error) => {
                    console.log(error)
                    showError(error)
                    dismiss()
                })

            console.log(this.range)
        }
    },
    async ionViewDidEnter() {
        openLoading()

     
        const token = await Get('token')
        const coordinates = await Geolocation.getCurrentPosition();
        
        const lat = coordinates.coords.latitude
        const long = coordinates.coords.longitude

        axios.get(this.$hostname + '/api/questions', {
                headers: {
                    "Authorization": 'Bearer ' + token,
                    "Accept": 'application/json'
                },
                params: {
                    lat: lat,
                    long: long,
                    range: this.range
                }
            })
            .then((res) => {
                this.questions = res.data.questions
                console.log(this.questions)
                dismiss()
            })
            .catch((error) => {
                console.log(error)
                showError(error)
                dismiss()
            })
    },
    setup() {

    }
};
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

.ion-item {
    --border-color: white !important;
}

ion-range {
    z-index: 0 !important;
}

ion-range {
    --knob-size: 30px;

}

ion-list ion-item {
    cursor: pointer;
}

ion-tab-button.tab-selected {
    background-color: lightgray !important;
}

ion-tab-bar {
    border: 0.01rem solid #eee;
    color: #bbb;
}

.text12 {
    font-size: 10px !important;
}

ion-tab-button:hover {
    background-color: lightgray;
}

ion-tab-bar {
    --ion-color-primary: gray;
}
</style>
