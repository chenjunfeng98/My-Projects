import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home' 
  },
  {
    path:'/home',
    component: () => import('../components/ZhihuMain.vue')
  },
  {
    path:'/story',
    component: () => import('../components/ZhihuContent.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
