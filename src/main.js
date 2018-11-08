import Vue from 'vue'
import iView from 'iview';
import axios from 'axios'
import VueAxios from 'vue-axios'

import {router} from './config/router/index';
import store from './config/store/index';

import Dialog from './plugins/Dialog'
import Utils from './plugins/Utils'
import App from './App.vue'

import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(VueAxios, axios);

Vue.use(Dialog);
Vue.use(Utils);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
