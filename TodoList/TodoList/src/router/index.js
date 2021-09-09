import Vue from 'vue'
import VueRouter from 'vue-router'


const todoMvcAllPage = () => import('../components/todoMvcAllPage');
const todoMvcActivePage = () => import('../components/todoMvcActivePage');
const todoMvcCompletePage = () => import('../components/todoMvcCompletePage')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect: '/all'
  },
  {
    // path:'/all/:content',
    path:'/all',
    name:'all',
    component:todoMvcAllPage,
    // props: true
  },
  {
    // path:'/active/:content',
    path:'/active',
    name:'active',
    component:todoMvcActivePage,
    // props: true
  },
  {
    // path:'/complete/:content',
    path:'/complete',
    name:'complete',
    component:todoMvcCompletePage,
    // props: true
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
