<template>
<ion-page>
    <ion-content class="ion-padding-bottom">
        <ion-item style="overflow:unset !important;">
            <ion-back-button default-href="/user/question" slot="start"></ion-back-button>
            <ion-button style="max-height:30px !important" v-if="editing" slot="end" @click="update" class="ion-text-capitalize text12" no-padding>
                Save
            </ion-button>
            <Question :editable="answers" slot="end" @edit="editable()" v-else></Question>
        </ion-item>

        <div class="df alm jcm ion-margin-horizontal ion-margin-top ion-padding look-blue" style="min-height:200px;border-radius:5px">
            <ion-input v-model="question.body" color="light century text16 ion-text-wrap ion-text-center" id="quest" readonly style="font-style:bold;color:white !important">
            </ion-input>
        </div>
        <div class="ion-padding-horizontal text12 century ion-text-end" style="margin-top:10px">
            {{ currentDateTime(time) }}
        </div>

        <div class="df jcm alm ion-padding ion-text-center" style="width:100%;height:50%;opacity:.7" v-if="!answers[0]">
            <div>
                <h1 class="bodoni">
                    <ion-text class="bodoni" style="color:#bbb">
                        <b>No Answers Yet</b>
                    </ion-text>
                </h1>
            </div>

        </div>
        <ion-list class="ion-margin-top" v-if="answers">
            <answers v-for="(answers,index) in answers" :key="answers.id">
                <ion-item class="">
                    <ion-thumbnail class="ion-margin-top">
                        <img :src="this.$hostname + '/images/' +answers.user.dp " class="">
                    </ion-thumbnail>
                    <ion-label>
                        <div class="lgray ion-padding" style="border-radius:10px">
                            <ion-text class="century">
                                <b class="bodoni text18">
                                    {{ answers.user.username }}
                                </b><br>
                                <ion-text class="ion-text-wrap">
                                    {{ answers.body }}
                                </ion-text><br>
                            </ion-text>
                            <div class="ion-text-end  msg-info century">
                                <i class="ion-padding-top">{{ created_at }}
                                </i>
                            </div>
                        </div>
                    </ion-label>
                </ion-item>
                <div class="ion-text-end ion-padding-end">
                    <button class="ion-text-capitalize ion-no-padding" @click="liked(index)">
                        <ion-text color="success">
                            <b v-if="answers.status == 1">Liked</b>
                            <font v-if="answers.status != 1">Like</font>
                        </ion-text>
                    </button>
                    <button @click="openModal(answers.id)" class="ion-text-capitalize ion-no-padding" style="max-height:10px!important">
                        <ion-text color="danger" slot="icon-only">
                            Report
                        </ion-text>
                    </button>
                </div>
            </answers>

        </ion-list>

    </ion-content>
</ion-page>
</template>

<script>
import Report from './Layouts/Report.vue'
import {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonText,
    IonBackButton,
    IonInput,
    modalController
} from '@ionic/vue'
import {
    dismiss,
    Get,
    openLoading,
    openToast,
    showError
} from '../storage'
import axios from 'axios'
import moment from 'moment'
import Question from './Layouts/Question.vue'

export default {
    name: 'SingleQuestion',
    components: {
        IonContent,
        IonPage,
        IonList,
        IonItem,
        IonText,
        IonBackButton,
    IonInput,
        Question
    },
    data() {
        return {
            question: '',
            time: '',
            editing: '',
            answers: []
        }
    },
    methods: {
        editable() {
            var ion = document.getElementById("quest")
            ion.readonly = false
            this.editing = true
            ion.setFocus()
        },
        async update() {
            openLoading()
            this.editing = false

            const token = await Get('token')
            axios.put(this.$hostname + '/api/question/update/' + this.$route.params.id, {
                    body: this.question.body,
                }, {
                    headers: {
                        "Authorization": 'Bearer ' + token,
                        "Accept": 'application/json'
                    },
                })
                .then((res) => {
                    openToast(res.data.message)
                    dismiss()
                })
                .catch((error) => {
                    console.error(error)
                    dismiss()
                })
        },
        async openModal(id) {
            const modal = await modalController.create({
                component: Report,
                componentProps: {
                    answer_id: id
                }
            });
            return modal.present();
        },
        async liked(id) {
            var status = this.answers[id].status;

            if (status == 1) {
                status = 0
            } else {
                status = 1
            }
            this.answers[id].status = status
            const token = await Get('token')

            axios.put(this.$hostname + '/api/answer/update/' + this.answers[id].id, {
                    status: status,
                }, {
                    headers: {
                        "Authorization": 'Bearer ' + token,
                        "Accept": 'application/json'
                    },
                })
                .then(() => {
                    this.$forceUpdate();
                    // location.href = "/dashboard"
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        currentDateTime(time) {
            return moment(time, "YYYY-MM-DD").fromNow(); // 9 years ago
        }

    },
    setup() {

    },
    async created() {
        openLoading()
        console.log(this.$route.params.id);
        const token = await Get('token')
        axios.get(this.$hostname + '/api/question/id/' + this.$route.params.id, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then((res) => {
                dismiss()
                console.log(res.data)
                this.answers = res.data.answers
                this.question = res.data.question
                this.time = res.data.question.created_at

            })
            .catch((error) => {
                dismiss()
                showError(error.message)
                console.log(error)
            })
    }
};
</script>

<style scoped>
.profile {
    min-width: 210px;
    min-height: 210px;
    height: 20vh;
    width: 20vh;
    border-radius: 100%;
    align-self: center
}

.msg-info {
    font-size: 9px !important;
    color: black;
    padding: 2px 2px;
    margin-left: 10px;
}

.-img {
    padding: 10px;
}

.no-line {
    --border-color: white !important;
}

ion-header::after,
ion-toolbar {
    border: none !important;
}

answers ion-item {
    --border-color: transparent;
    font-size: 12px;
    border-radius: 5px;
}

button {
    background: none;
    border: none;
    margin: 2px;
    padding: 5px 10px
}

img {
    border-radius: 100%;
    padding: 7px;
}

.oops {
    max-height: 30vh;
    border-radius: 0 !important;
}

.dimo {
    padding: 7px;
    position: absolute;
    right: 0;
    bottom: 0px;
}
</style>
