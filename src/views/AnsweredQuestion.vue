<template>
<ion-page>
    <ion-header>
        <app-header title="Recent Question"></app-header>
    </ion-header>

    <ion-tab-bar class="ion-margin ion-border">
        <ion-tab-button tab="answered" class="" href="/questions/view">
            Recent
        </ion-tab-button>
        <ion-tab-button tab="recent" href="/questions/answered">
            Answered
        </ion-tab-button>
    </ion-tab-bar>
    <ion-content class="ion-padding-bottom">

        <div class="ion-text-center bodoni ion-padding ion-margin-hor" style="margin-top:20vh;color:#bbb" v-if="!answered">
            <h3>
                <b>
                    No Question Answered Yet
                </b>
            </h3>
        </div>

        <ion-list lines="full">
            <vue-collapsible-panel-group accordion>
                <vue-collapsible-panel v-for="q in answered" :key="q.id" :expanded="false" class="">
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
                            <form @submit.prevent="update(q.answer.id)">
                                    <ion-input placeholder="Answer" :value="q.answer ? q.answer.body : answer" :id="'answer' + q.answer.id" class="century button text14 ion-padding-vertical" v-if="q.type == 'S'"  @click="edit(q.answer.id)">
                                    </ion-input>
                                    <ion-input placeholder="Answer" :value="q.answer ? q.answer.body : answer" :id="'answer' + q.answer.id" class="century button text14 ion-padding-vertical" inputmode="numeric" v-else-if="q.type == 'N'" @click="edit(q.answer.id)"> 
                                    </ion-input>

                                    <ion-select :interface-options="Answer" :value="q.answer ? q.answer.body : answer" :id="'answer' + q.answer.id" v-else-if="q.type == 'M'" class="text14 century ion-text-Capitalize" @click="edit(q.answer.id)" placeholder="Choose Answer" interface="action-sheet" no-lines>
                                        <ion-select-option v-for="option in q.options" :key="option.key" :value="option.body" class="century text14">
                                            {{ option.body }}
                                        </ion-select-option>
                                    </ion-select>
                                    <ion-button expand="block" class="ion-text-capitalize bodoni button text16" type="submit">
                                        Update
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
    IonTabButton,
    IonTabBar
} from '@ionic/vue'
import {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
} from '@dafcoe/vue-collapsible-panel'
import {
    dismiss,
    Get,
    openLoading,
    openToast,
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
        IonHeader,
        IonTabButton,
        IonTabBar,
        VueCollapsiblePanelGroup,
        VueCollapsiblePanel,
    },
    data() {
        return {
            answered: [],
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
        edit($answer_id) {
            const ref = 'answer' + $answer_id
             document.getElementById(ref).disabled = false
        },
        async update($answer_id) {
            const token = await Get('token')

            const ref = 'answer' + $answer_id
            axios.put(this.$hostname + '/api/answer/update/' + $answer_id, {
                    body: document.getElementById(ref).value,
                }, {
                    headers: {
                        "Authorization": 'Bearer ' + token,
                        "Accept": 'application/json'
                    },
                })
                .then((res) => {
                    openToast(res.data.message)
                    this.close()
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    },
    async created() {
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
                    long: long
                }
            })
            .then((res) => {
                this.answered = res.data.answered
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
    --knob-size: 40px;
    z-index: 0 !important;
}

ion-list ion-item {
    cursor: pointer;
}

ion-tab-button.tab-selected {
    background: lightgray !important;
}

ion-tab-bar {
    border: 0.01rem solid #eee;
    color: #bbb;
    --padding-horizontal: 0;
    padding: 0px;
    --ion-color-primary: gray;
}

.text12 {
    font-size: 10px !important;
}

ion-tab-button:hover {
    background-color: lightgray;
}

ion-tab-button {
    display: flex !important;
}
</style>
