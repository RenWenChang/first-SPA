import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'
import dashboard from '@/components/dashboard'
import products from '@/components/page/products'

import customerpage from '@/components/page/customerpage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      redirect:'login'
    },
 
    {
      path: '/login',
      name: 'login',
      component: login
    },
   {
      path: '/admin',
      name: 'dashboard',
      component: dashboard,
      children:[
        {
        path: 'products',
        name: 'products',
        component: products,  
        meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: '/',
      name: 'dashboard',
      component: dashboard,
      children:[
        {
        path: 'customerpage',
        name: 'customerpage',
        component: customerpage,  

        }
      ]
    },
  ]
})
