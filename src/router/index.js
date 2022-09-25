import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/city/:cityName',
    name: 'city',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "city" */ '@/components/City.vue')
  },
  {
    path: '/travelPolicy',
    name: 'travelPolicy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "TravelPolicy" */ '@/views/TravelPolicy')

  }
]

const router = new VueRouter({
  // scrollBehavior: () => ({ y: 0 }),
  routes

})

export default router
