<template>
<div>
    <loading :active.sync="isLoading" ></loading>
    <div class='row mt-4'>
        <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                        <div class="card border-0 shadow-sm">
                            <div style="height: 150px; background-size: cover; background-position: center" :style="{backgroundImage:`url(${item.imageUrl})`}">
                            </div>
                            <div class="card-body">
                            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                            <h5 class="card-title">
                                <a href="#" class="text-dark">{{item.title}}</a>
                            </h5>
                            <p class="card-text">{{item.content}}</p>
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <!-- <div class="h5">2,800 元</div> -->
                                    <div class="h5" v-if="!item.price">{{item.origin_price}}元</div>
                                    <del class="h6" v-if="item.price">原價{{item.origin_price}}元</del>
                                    <div class="h5" v-if="item.price">現在只要{{item.price}}元</div>
                                </div>
                            </div>
                            <div class="card-footer d-flex">
                                <button type="button" class="btn btn-outline-secondary btn-sm" @click="getproduct(item.id)">
                                    <i class="fas fa-spinner fa-spin" v-if="status.lodingItem===item.id"></i>
                                    查看更多
                                </button>
                                <button type="button" class="btn btn-outline-danger btn-sm ml-auto"@click="add_to_cart(item.id)">
                                    <i class="fas fa-spinner fa-spin" v-if="status.lodingItem===item.id"></i>
                                    加到購物車
                                </button>
                            </div>
                        </div>



<!-- Modal -->
<div class="modal fade" id="productModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">{{product.title}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img :src="product.imageUrl" class="img-fluid" alt="">
        <blockquote class="blockquote mt-3">
        <p class="mb-0">{{product.content}}</p>
        <footer class="blockquote-footer text-right">{{product.description}}</footer>
        </blockquote>
        <div class="d-flex justify-content-between align-items-baseline">
                                    <!-- <div class="h5">2,800 元</div> -->
        <div class="h5" v-if="!product.price">{{product.origin_price}}元</div>
        <del class="h6" v-if="product.price">原價{{product.origin_price}}元</del>
        <div class="h5" v-if="product.price">現在只要{{product.price}}元</div>

        </div>

        <select  name="" class="font-control mt-3 w-100 "  v-model="product.num">
            <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
        </select>

      </div>
      <div class="modal-footer">
      <div class="text-muted text-nowrap mr-3">小記<strong> {{product.num*product.price}} 元</strong></div>
        <button type="button" class="btn btn-primary" @click="add_to_cart(product.id)">加至購物車</button>
      </div>

    </div>
  </div>
</div>
<!-- Modal /-->
        </div>    
    </div>

        <nav aria-label="Page navigation example ">
          <ul class="pagination">
            <li class="page-item" :class="{'disabled':!pagination.has_pre}"><a class="page-link bg-dark text-light" @click.prevent="getproducts(pagination.current_page-1)" href="#" >Previous</a></li>
            <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page===page}"><a class="page-link bg-dark text-light" @click.prevent="getproducts(page)" href="#">{{page}}</a></li>
            <li class="page-item" :class="{'disabled':!pagination.has_next}"><a class="page-link bg-dark text-light" @click.prevent="getproducts(pagination.current_page+1)" href="#">Next</a></li>
          </ul>
        </nav>  





  
</div>
</template>

<script>
import $ from "jquery";

export default {
  data () {
    return {
            products:[],
            product:{},
            isLoading:false,
            pagination:{},
            status:{
                lodingItem:'',
            },

            }
          },

  methods:{
            getproducts(page=1){
                const api=`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/products?page=${page}`;
                const vm=this;
                vm.isLoading=true;
                this.$http.get(api).then((response) => {
                console.log(response.data );
                vm.products = response.data.products;
                vm.pagination=response.data.pagination;
                vm.isLoading=false;
                });
            },
            getproduct(id){
                const api=`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/product/${id}`;
                const vm=this;
                vm.status.lodingItem=id;
                this.$http.get(api).then((response) => {
                    $('#productModalLong').modal('show');
                console.log(response.data );
                vm.product = response.data.product;
                vm.status.lodingItem='';
                });
            },
            add_to_cart(id,qty=1){
                const api=`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/cart`;
                const vm=this;
                vm.status.lodingItem=id;
                const cart={
                    product_id:id,
                    qty,
                };
                this.$http.post(api,{data:cart}).then((response) => {
                console.log(response.data );
                vm.getcart();
                vm.status.lodingItem='';

                });
                $('#productModalLong').modal('hide');
            },
            getcart(){
                const api=`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/cart`;
                const vm=this;
                vm.isLoading=true;
                this.$http.get(api).then((response) => {
                console.log(response.data );
                vm.isLoading=false;
                });
            },
            remove_cart_item(id){
                const api=`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/cart/${id}`;
                const vm=this;
                vm.isLoading=true;
                this.$http.delete(api).then((response) => {
                vm.getcart();
                vm.isLoading=false;
                });
            },

         },
    created() {
        this.getproducts();


    },
}
</script>