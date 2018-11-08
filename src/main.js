import Vue from 'vue'
import iView from 'iview';
Vue.use(iView);

import {router} from './config/router/index';
import store from './config/store/index';
import axios from './config/axios/index';

import Dialog from './plugins/Dialog'
import Utils from './plugins/Utils'
import App from './App.vue'

import 'iview/dist/styles/iview.css';

Vue.use(Dialog);
Vue.use(Utils);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
