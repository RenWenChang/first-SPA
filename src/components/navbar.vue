<template lang="">
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
      <i class="fas fa-shopping-cart fa-3x m-2" style="color:#000000" @click='getcart()'></i>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
        </li>
      </ul>

<div class="modal fade" id="Modalcart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"> 
<div class="modal-dialog" role="document">    
<div class="modal-content">   

        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">購物車</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
        </div>
<div class="modal-body">        


<table class="table">
  <thead>
    <th></th>
    <th>品名</th>
    <th>數量</th>
    <th class="align-middle text-right">單價</th>
  </thead>
  <tbody>
    <tr v-for="item in carts">
      <td class="align-middle">
        <button type="button" class="btn btn-outline-danger btn-sm">
          <i class="far fa-trash-alt" @click="remove_cart_item(item.id)"></i>
        </button>
      </td>
      <td class="align-middle">{{ item.product.title}}</td>
      <td class="align-middle"><button type="" class="btn btn-outline-dark btn-sm" disabled>{{ item.product.num}}{{ item.product.unit }}</button></td>
      <td class="align-middle text-right">{{ item.final_total*item.product.num}}</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3" class="text-right">總計</td>
      <td class="text-right">{{total }}</td>
    </tr>
    <tr>
      <td colspan="3" class="text-right text-success">折扣價</td>
      <td class="text-right text-success">{{ final_total}}</td>
    </tr>
  </tfoot>
</table>


</div>

<div class="modal-footer">
<div class="input-group mb-3 input-group-sm">
  <input type="text" class="form-control" placeholder="請輸入優惠碼">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">
      套用優惠碼
    </button>    
    <button class="btn btn-danger" type="button">
      結帳
    </button>
  </div>
</div>

</div>


</div>
</div>
</div>

    </nav>

</template>
<script>
import $ from "jquery";
  export default {

    data () {
    return {
carts:[],
total: '', 
final_total:'',
            }
          },
  name: 'navbar',
  methods:{
    signout(){
      const vm=this;
      const api=`${process.env.APIPATH}/logout`;
          this.$http.post(api).then((response) => {
          console.log(response.data.success);
          if(response.data.success){
            vm.$router.push('/signin');
          }
    })
    },
            getcart(){
                const api=`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/cart`;
                const vm=this;
                this.$http.get(api).then((response) => {
                console.log(response.data.data );
                vm.carts=response.data.data.carts;
                console.log(vm.carts);
                vm.total=response.data.data.total;
                console.log(vm.total);
                vm.final_total=response.data.data.final_total;
                console.log(vm.final_total);
                 $('#Modalcart').modal('show');
                });
            },

            remove_cart_item(id){
            const api=`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/cart/${id}`;
            const vm=this;
            this.$http.delete(api).then((response) => {
              vm.getcart();
                });
            
            },


  },
      created() {



    },

}
</script>


<style>
#Modalcart{
z-index:999999;
}

.modal-backdrop{
z-index:499;
}

</style>