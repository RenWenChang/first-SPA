<template>
<div>
<loading :active.sync="isLoading" ></loading>
     <table class="table table-dark mt-4 table-striped">
            <thead>
                <tr>
                    <th>訂單日期<th/>
                    <th>Email<th/>
                    <th>訂購品項<th/>
                    <th>應付帳款<th/>
                    <th>付款狀況<th/>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item) in orders" :key="item.id">
                    <td>{{date(item.create_at)}}</td>
                    <td></td>
                    <td>{{item.user.email}}</td>
                    <td></td>
                    <td><ul  style=" list-style: none" v-for="(product, i) in item.products" :key="i"><li>{{item.products[i].product.title}}
                    {{item.products[i].qty}}
                    {{item.products[i].product.unit}}</li></ul></td>
                    <td></td>
                    <td>{{item.total|currency}}</td>
                    <td></td>
                    <td><span v-if="item.is_paid":class="{'text-success': item.is_paid}" >已付款</span><span v-else="!item.is_paid" :class="{'text-danger': !item.is_paid}">未付款</span></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
</div>
</template>

<script>
import $ from 'jquery';
    export default{
        data(){
            return{
                orders:[
                    
                ],
                isLoading:false,
            }
        },
        methods:{
                getorderss(page=1){
                const api=`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/admin/orders?page=${page}`;
                const vm=this;
                vm.isLoading=true;
                console.log(vm.isLoading);
                this.$http.get(api).then((response) => {
                vm.orders=response.data.orders ;
                console.log(vm.orders );
                vm.isLoading=false;
                });
              },
              date(time){
                    const date = new Date(time * 1000);
                    return date.toLocaleDateString();
              },
            


        },
        created() {
          this.getorderss();
          

        },
    }
</script>   