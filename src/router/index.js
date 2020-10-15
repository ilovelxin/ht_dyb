import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login',
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/home',
    name:"Home",
    component:()=> import ('../views/Home'),
    redirect:'/home/index',
    children:[
      {path:'index',name:"Index",component:()=>import('../Home/Index')},
      {path:"users",name:"Users",component:()=>import('../Home/Users')},
      {path:"roles",name:"Roles",component:()=>import('../Home/Roles')},
      {path:"rights",name:"Rights",component:()=>import('../Home/Rights')},
      {path:"goods",name:"Goods",component:()=>import('../Home/Goods')},
      {path:"params",name:"Params",component:()=>import('../Home/Params')},
      {path:"categories",name:"Categories",component:()=>import('../Home/Categories')},
      {path:"orders",name:"Orders",component:()=>import('../Home/Orders')},
      {path:"reports",name:"Reports",component:()=>import('../Home/Reports')},
      {path:"addgoods",name:"AddGoods",component:()=>import('../Home/AddGoods')},
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
