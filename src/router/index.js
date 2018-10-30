import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'
import dashboard from '@/components/dashboard'
import products from '@/components/page/products'
import customer_info_form from '@/components/page/customer info form'
import ordercheck from '@/components/page/ordercheck'

import customerpage from '@/components/page/customerpage'
import coupon from '@/components/page/coupon'
import orderlist from '@/components/page/orderlist'


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
        },
        {
        path: 'coupon',
        name: 'coupon',
        component: coupon, 
       meta: { requiresAuth: true }, 
        },
        {
        path: 'orderlist',
        name: 'orderlist',
        component: orderlist, 
        meta: { requiresAuth: true }, 
        },
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
        
        },
        {
        path: 'customer info form',
        name: 'customer info form',
        component: customer_info_form,

        },
        {
        path: 'ordercheck/:orderId',
        name: 'ordercheck',
        component: ordercheck,
        },
      ]
    },

  ]
})
