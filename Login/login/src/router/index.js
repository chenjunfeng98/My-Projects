import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'member',
    component:() => import('../views/Member.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    children:[
      {
        path:'/',
        redirect: '/message'
      },
      {
        path: '/message',
        name: 'MessageLogin',
        component: () => import('../components/MessageLogin.vue')
      },
      {
        path: '/password',
        name: 'PasswordLogin',
        component: () => import('../components/PasswordLogin.vue')
      }
    ]
  }
  
]

const router = new VueRouter({
  routes
})

export default router
