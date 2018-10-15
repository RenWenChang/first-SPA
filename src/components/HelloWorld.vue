<template>
 <a href="#" @click.prevent="logout">登出</a>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
    methods:{
      logout(){    
        const api=`${process.env.APIPATH}/logout`;
        const vm=this;
        this.$http.post(api).then((response) => {
          console.log(response.data.success);
          if(response.data.success){
            vm.$router.push('/login');
          }
    })

      },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
