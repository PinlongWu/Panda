import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Search from '../components/chilendrouter/search.vue'
import Recommend from '../components/chilendrouter/recommend.vue'
import Girl from '../pages/home/girl.vue'
import GrilHome from '../pages/home/girlHome.vue'
import GirlLists from '../pages/home/girllists.vue'
import Empty from '../pages/empty'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/recommend',
    children: [
      {
        path: '/recommend',
        component: Recommend
      },
      {
        path: '/girl/:id',
        name: 'girl',
        component: Girl
      },
      {
        path: '/girlhome',
        name: 'girlhome',
        component: GrilHome
      },
      {
        path: '/girllists',
        name: 'girllists',
        component: GirlLists
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/empty',
    name: 'empty',
    component: Empty
  }
]

const router = new VueRouter({
  routes
})

export default router
