<template>
        <!-- <ion-backdrop style="background:black;opacity:.5" v-if="this.$refreshing"></ion-backdrop> -->
<ion-refresher slot="fixed" pull-factor="1" pull-min="100" pull-max="200" @ionRefresh="refresh">
    <ion-refresher-content></ion-refresher-content>
</ion-refresher>
</template>

<script>
import {
    IonRefresher,
    IonRefresherContent
} from '@ionic/vue'

export default {
    name: 'refresh',
    components: {
        IonRefresher,
        IonRefresherContent
    },
    methods:{
        refresh(){
            this.$refreshing = true
            setTimeout(2000, function(){
                location.replace(window.location)
            })
        }
    },
    setup() {

    },
}
</script>

<style scoped>

</style>
