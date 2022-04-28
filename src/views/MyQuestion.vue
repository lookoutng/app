<template>
<ion-page>
    <ion-header>
        <app-header title="My Questions"></app-header>
    </ion-header>
    <ion-content class="ion-padding-bottom">
        <div class="ion-padding text14 century ion-text-center" style="margin-top:20px !important">
            <ion-text class="ion-margin">
                All Question disappear after 24 hours
            </ion-text>
        </div>

        <div class="ion-text-center bodoni" style="margin-top:20vh;color:#bbb" v-if="!myquestions[0]">
            <h1>
                <b>
                    No Question Asked
                </b>
            </h1>
        </div>

        <ion-list lines="full ion-margin-top">
            <ion-item v-for="myq in myquestions" :key="myq.id" :href="'/question/' + myq.id">
                <ion-thumbnail>
                    <img src="/img/number.png" v-if="myq.type == 'N'" class="-img" />
                    <img src="/img/option.png" v-else-if="myq.type == 'M'" class="-img" />
                    <img src="/img/short-text.jpg" v-else-if="myq.type == 'S'" class="-img" />
                </ion-thumbnail>
                <ion-label class="">
                    <ion-text class="century ion-text-nowrap text12">
                        {{ myq.body }}
                    </ion-text>
                </ion-label>
                <ion-badge slot="end" class="" v-if="myq.answers">
                    {{ myq.answers }}
                </ion-badge>
            </ion-item>
        </ion-list>
    </ion-content>
    <ion-footer>
        <Footer></Footer>
    </ion-footer>
</ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonList, IonItem, IonText, IonBadge} from '@ionic/vue'
import { openLoading, openToast } from '@/functions/widget'
import { getUserQuestion } from '@/services/question'

export default {
    name: 'MyQuestion',
    components: {
        IonContent,
        IonPage,
        IonList,
        IonItem,
        IonText,
        IonHeader,
        IonBadge
    },
    data() {
        return {
            myquestions: []
        }
    },
    async ionViewDidEnter() {
        openLoading()
        getUserQuestion()
        .then((res) => 
            {
                this.myquestions = res.data.question
            }
        )
        .catch((error) => {
            openToast(error.message)
        })
    },
    
};
</script>

<style scoped>
.-img {
    padding: 10px;
}

ion-item {
    --border-color: #eee !important
}
</style>
