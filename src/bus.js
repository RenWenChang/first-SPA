import Vue from 'vue';
Vue.prototype.$bus=new Vue();

//messages:
//this.$bus.$emit('messsage:push',status,'timestamp');
//message:'',
//status:'',代字串內容
//timestamp:'',代bootstrap顏色樣式(字串)