<template>
<div class="my-5 row justify-content-center">
  <form class="col-md-6" @submit.prevent="cereatorder()">
    <div class="form-group">
      <label for="useremail">Email</label>
      <input type="email" class="form-control" name="email" id="useremail"
        v-model="form.user.email" placeholder="請輸入 Email"  v-validate="'required|email'" :class="{'is-invalid':errors.has('email')}">
      <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
    </div>
  
    <div class="form-group">
      <label for="username">收件人姓名</label>
      <input type="text" class="form-control" name="name" id="username" 
        v-model="form.user.name" placeholder="輸入姓名"
        v-validate="'required'" :class="{'is-invalid':errors.has('name')}">
      <span class="text-danger" v-if="errors.has('name')">必須輸入姓名</span>
    </div>
  
    <div class="form-group">
      <label for="usertel">收件人電話</label>
      <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話" name="tel" v-validate="'required'" :class="{'is-invalid':errors.has('tel')}">
      <span class="text-danger"v-if="errors.has('tel')">電話不得留空</span>
    </div>
  
    <div class="form-group">
      <label for="useraddress">收件人地址</label>
      <input type="address" class="form-control" name="address" id="useraddress" v-model="form.user.address"
        placeholder="請輸入地址" v-validate="'required'" :class="{'is-invalid':errors.has('address')}">
      <span class="text-danger"v-if="errors.has('address')">地址欄位不得留空</span>
    </div>
  
    <div class="form-group">
      <label for="useraddress">留言</label>
      <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
    </div>
    <div class="text-right">
      <button class="btn btn-danger" >送出訂單</button>
    </div>
  </form>
</div>
</template>

<script>
import $ from 'jquery';
export default {

  data () {
    return {
      product:[],
      product:{},
      status:{
        loadingItem:'',
      },
      form:{
        user: {
          name:'',
          email: '',
          tel: '',
          address: ''
               },
        message:'',
          },
      cart:{},
      isLoading:false,



  }

},
methods:{

    cereatorder(){
                const api=`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/order`;
                const vm=this;
                const order=vm.form;
                vm.isLoading=true;
                this.$validator.validate().then((result) => {
                      if (result) {
                        this.$http.post(api,{data:order}).then((response) => {
                        console.log(response);
                        if(response.data.success){
                          vm.$router.push(`/ordercheck/${response.data.orderId}`);
                        }
                        vm.isLoading=false;
                   });
                      }
                    else{
                      console.log('欄位不完整');
                    }
                    });


    },
    

},
created(){

},


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
