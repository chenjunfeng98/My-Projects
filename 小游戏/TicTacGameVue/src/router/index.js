import Vue from 'vue'
import Router from 'vue-router'
// import Game from '../components/Game'
import Home from '../components/Home'
import About from '../components/About'
import Prolife from '../components/Prolife'



Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path:'',
    //   redirect: '/game'
    // },
    {
      path: '/prolife',
      component: Prolife
    },
    {
      path:'/home',
      component :Home,
      name:'home',
      children:[{
        path:'/home/about/:id',
        name:'about',
        props:true,
        component:About,
      }]
    },

      

  ],
  mode:'history'
  
    
})
