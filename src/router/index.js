import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Search from '../components/chilendrouter/search.vue'
import Recommend from '../components/chilendrouter/recommend.vue'
import Girl from '../pages/home/girl.vue'
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
      }
    ]
  },
  {
    path: '/search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
