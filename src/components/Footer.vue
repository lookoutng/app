<template>
<ion-tabs>
    <slot/>
    <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/dashboard"  >
            <span style="">
                <Icon icon="clarity:home-solid" /><br>
                <ion-text class="text12 century">
                    Home
                </ion-text>    
            </span>
        </ion-tab-button>
        <ion-tab-button tab="MyQuestion" href="/user/question">
            <span style="">
                <Icon icon="eva:question-mark-circle-fill" /><br>
                <ion-text class="text12 century">
                    My Questions
                </ion-text>    
            </span>
        </ion-tab-button>
        <ion-tab-button tab="QuestionHistory" href="/questions/view">
            <span style="">
                <Icon icon="fluent:book-question-mark-24-filled" /><br>
                <ion-text class="text12 century">
                    Question History
                </ion-text>    
            </span>
        </ion-tab-button>
    </ion-tab-bar>
</ion-tabs>
</template>

<script>
import {
    IonTabBar,
    IonTabButton
} from '@ionic/vue';
import {
    Icon
} from '@iconify/vue';

export default {
    name: 'Footer',
    props: ['home', 'reminder', 'health-vital', 'notifications'],
    components: {

        Icon,
        IonTabBar,
        IonTabButton,

    },
    methods: {
    },

}
</script>

<style scoped>
ion-tab-button {
    font-size: 20px;
    color: #96b4ff;
}
.text12{
    font-size: 10px !important;
}
ion-tab-button:hover {
    font-size: 20px;
    color:#96b4ff
}

.red {
    color: blue;
}

Icon:hover {
    color: blue !important;
}

ion-tab-button.tab-selected {
    color: blue !important;
    --ion-color-base: blue !important;
}

ion-tab-bar {
    --ion-color-primary: blue;
}
ion-text{
    color: black;
}
span{
    line-height: 10px !important;
}
</style>
