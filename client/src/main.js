import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import wysiwyg from "vue-wysiwyg";
import ArgonDashboard from './plugins/argon-dashboard';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueCountryRegionSelect from 'vue-country-region-select';
import VueMask from 'v-mask'

Vue.config.productionTip = false;

Vue.use(VueMask);
Vue.use(vueCountryRegionSelect)
Vue.use(ArgonDashboard);
Vue.use(wysiwyg, {}); // config is optional. more below
Vue.use(ElementUI);

// global variable
Vue.prototype.$serverUrl = "http://networking.test";

window.axios = require('axios');
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = "http://networking.test";

window._ = require('lodash');

new Vue({
  router,
  store,
  created(){
    window.axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App),
}).$mount('#app');
