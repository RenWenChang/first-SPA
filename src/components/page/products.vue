<template lang="">
<div>
        <loading :active.sync="isLoading" ></loading>
        <div class="text-right mt-4"><button class='btn btn-outline-primary btn-sm' data-toggle="modal" @click="openmodal(true)">建立新產品</button></div>
        <table class="table table-dark mt-4">
            <thead>
                <tr>
                    <th>產品分類<th/>
                    <th>產品名稱<th/>
                    <th>產品原價<th/>
                    <th>產品售價<th/>
                    <th>啟用狀態<th/>
                    <th>編輯按鈕<th/>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item) in products" :key="item.id">
                    <td>{{item.category}}</td>
                    <td></td>
                    <td>{{item.title}}</td>
                    <td></td>
                    <td class="text-right">{{item.origin_price |currency}}</td>
                    <td></td>
                    <td class="text-right">{{item.price|currency}}</td>
                    <td></td>
                    <td>
                        <span v-if="item.is_enabled==1">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td></td>
                    <td>
                    <button class="btn btn-outline-primary btn-sm" @click="openmodal(false,item)">編輯</button>
                    <button class="btn btn-outline-danger btn-sm" @click="opendelProductModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="Page navigation example ">
          <ul class="pagination">
            <li class="page-item" :class="{'disabled':!pagination.has_pre}"><a class="page-link bg-dark text-light" @click.prevent="getproducts(pagination.current_page-1)" href="#" >Previous</a></li>
            <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page===page}"><a class="page-link bg-dark text-light" @click.prevent="getproducts(page)" href="#">{{page}}</a></li>
            <li class="page-item" :class="{'disabled':!pagination.has_next}"><a class="page-link bg-dark text-light" @click.prevent="getproducts(pagination.current_page+1)" href="#">Next</a></li>
          </ul>
        </nav>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>新增產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="image">輸入圖片網址</label>
              <input type="text" class="form-control" id="image"
                placeholder="請輸入圖片連結" v-model="tempproduct.imageUrl">
            </div>
            <div class="form-group">
              <label for="customFile">或 上傳圖片
                <i class="fas fa-spinner fa-pulse" v-if="status.fileUploading"></i>
              </label>
              <input type="file" id="customFile" class="form-control"
                ref="files" @change='uploadFile'>
            </div>
            <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
              class="img-fluid":src="tempproduct.imageUrl" alt="">
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title"
                placeholder="請輸入標題" v-model="tempproduct.title">
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input type="text" class="form-control" id="category"
                  placeholder="請輸入分類" v-model="tempproduct.category" >
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input type="unit" class="form-control" id="unit"
                  placeholder="請輸入單位" v-model="tempproduct.unit">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
              <label for="origin_price">原價</label>
                <input type="number" class="form-control" id="origin_price"
                  placeholder="請輸入原價" v-model="tempproduct.origin_price">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input type="number" class="form-control" id="price"
                  placeholder="請輸入售價"v-model="tempproduct.price">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea type="text" class="form-control" id="description"
                placeholder="請輸入產品描述" v-model="tempproduct.description"></textarea>
            </div>
            <div class="form-group">
              <label for="content">說明內容</label>
              <textarea type="text" class="form-control" id="content"
                placeholder="請輸入產品說明內容" v-model="tempproduct.content"></textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  id="is_enabled" v-model="tempproduct.is_enabled"
                  :true-value="1"
                  :false-value="0">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click='updateproduct()'>確認</button>
      </div>
    </div>
    
  </div>
</div>


<div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        是否刪除 <strong class="text-danger">{{ tempproduct.title }}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click='delProductModal(id)'>確認刪除</button>
      </div>
    </div>
  </div>
</div>




</div>
</template>
<script>
import $ from 'jquery';
    export default{
        data(){
            return{
                pagination:{},
                products:[],
                tempproduct:{},
                isNew:false,
                id:'',
                isLoading:false,
                status:{
                  fileUploading:false,
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
                vm.isLoading=false;
                vm.pagination=response.data.pagination;
                });
              },
            openmodal(isNew,item){
                if(isNew){
                    this.tempproduct={};
                    this.isNew=true;
                }else{
                    this.tempproduct=  Object.assign({},item);//ES6
                    this.isNew=false;
                }
                $('#exampleModal').modal('show');
            },
            updateproduct(){
                let api=`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/admin/product`; //const區塊作用域 無法被修改 let區塊作用域 可以被修改
                let HTTPmethods="post";
                const vm=this;
                if(!vm.isNew){
                    api=`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/admin/product/${vm.tempproduct.id}`;
                    HTTPmethods="put";
                }
                vm.isLoading=true;
                this.$http[HTTPmethods](api,{data:vm.tempproduct}).then((response) => {
                console.log(response.data);
                vm.isLoading=false;
                    if(response.data.success){
                        $('#exampleModal').modal('hide');
                        vm.getproducts();
                    }
                    else{
                        $('#exampleModal').modal('hide');
                        window.alert('新增失敗'); 
                    }
                });
            },
            opendelProductModal(item){
                $('#delProductModal').modal('show');
              const vm= this;
              vm.id = item.id;
              vm.$set(vm.tempproduct,'title',item.title);
                
            },
            delProductModal(id){
            const vm= this;
            let api=`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/admin/product/${id}`;
            vm.isLoading=true;
            this.$http.delete(api).then((response) => {
            console.log(response.data);
            vm.isLoading=false;
            }); 
            setTimeout('window.location.reload()',1000 );
            $('#delProductModal').modal('hide');
              
            },

            uploadFile(){
             const uploadedFile = this.$refs.files.files[0];
             console.log(uploadedFile);
             const vm=this;
             const formData=new FormData();
             formData.append('file-to-upload',uploadedFile);
             const url =`${process.env.APIPATH}/api/${process.env.COSTOMPATH}/admin/upload`
              vm.status.fileUploading=true;
             this.$http.post(url,formData,{
               headers:{
                 'Content-type':'multipart/form-data'
               }
             }).then((response) => {
               if(response.data.success){
                // vm.tempproduct.imageUrl=response.data.imageUrl; 此方法無雙向綁定 以下是解方
                  vm.$set(vm.tempproduct,'imageUrl',response.data.imageUrl);
                  
               }else{
                  this.$bus.$emit('messsage:push',response.data.message,'danger');
               }
                  vm.status.fileUploading=false;
            }); 

            },


        },
        created() {
            this.getproducts();

        },
    }
</script>   