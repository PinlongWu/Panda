import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import SearchTypes from '../components/search/searchTypes.vue'
import Recommend from '../components/chilendrouter/recommend.vue'
import Girl from '../pages/home/girl.vue'
import GrilHome from '../pages/home/girlHome.vue'
import GirlLists from '../pages/home/girllists.vue'
import Empty from '../pages/empty'
import Commoditylist from '../pages/empty/Commodity_list.vue'
import SearchBox from '../components/search/Search_box.vue'
import Special from '../components/base/Special.vue'
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
    path: '/SearchBox',
    component: SearchBox,
    redirect: '/SearchTypes',
    children: [
      {
        path: '/SearchTypes',
        component: SearchTypes
      },
      {
        path: '/commoditylist',
        name: 'commoditylist',
        component: Commoditylist
      }
    ]
  },
  {
    path: '/empty',
    name: 'empty',
    component: Empty
  },
  {
    path: '/special',
    name: 'special',
    component: Special
  }
]

const router = new VueRouter({
  routes
})

export default router
