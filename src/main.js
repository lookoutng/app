import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import  './storage.js';

// import VuePlaceAutocomplete from 'vue-place-autocomplete';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import '../src/theme/styles.css';
import './theme/variables.css';
/* Theme variables */

import AppHeader  from './views/Layouts/AppHeader.vue';
import Footer  from './views/Layouts/Footer.vue';
import Refresh  from './views/Layouts/Refresh.vue';

const app = createApp(App)
  .use(IonicVue)
  .use(router)

app.component('app-header',AppHeader);
app.component('Footer',Footer);
app.component('refresh',Refresh);
app.config.globalProperties.$hostname = 'https://lookout-ng.herokuapp.com';
// app.config.globalProperties.$hostname = 'http://127.0.0.1:3000';

router.isReady().then(() => {
  app.mount('#app');
});