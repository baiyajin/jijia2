import Vue from 'vue'
import Router from 'vue-router'
import baiyajin from '@/components/baiyajin'
import bai20 from '@/components/20.组件-组件中的data.vue'


Vue.use(Router)

/*解决跨域*/


export default new Router({
  menus:[
    {
      icon:"",
      name:"",
      path:"/bai20",
    }
  ],
  routes: [
    {
      path: '/index.html',
      name: 'index',
    },{
      path: '/bai20',
      name: 'bai20',
      component: bai20
    },{
      path: '/baiyajin',
      name: 'baiyajin',
      component: baiyajin
    }
  ]


})

