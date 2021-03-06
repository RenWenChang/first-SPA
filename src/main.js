// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
    // Import component
import Loading from 'vue-loading-overlay';
    // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import VeeValidate from 'vee-validate';
import zhTWVeeValidate from'Vee-Validate/dist/locale/zh_TW'

import App from './App';
import router from './router';
import './bus';
import currency from './currency';

Vue.component('Loading',Loading);
Vue.filter('currency',currency);
Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW',zhTWVeeValidate);
axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to,from,next) => {
 
  if(to.meta.requiresAuth){
    const api=`${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if(response.data.success){
        next();
      }
      else{
        next({path:'/login'});
      }

  })


  }
  else{
    next();
  }
  

})
