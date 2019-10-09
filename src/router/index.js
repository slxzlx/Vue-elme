import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import goods from '../components/goods/goods'
import rating from '../components/rating/rating'
import seller from '../components/seller/seller'
export default new Router({
  routes:[
    {
      path:'/',
      name:'goods',
      component:goods
    },
    {
      path:'/rating',
      name:'rating',
      component:rating
    },
    {
      path:'/seller',
      name:'seller',
      component:seller
    },
  ],
  linkExactActiveClass :'active'
})
