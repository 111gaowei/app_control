import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import login from '@/views/login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // 主页
    {
      path: '/index',
      name: 'index',
      component: index
    },
    // 登录
    {
      path: '/',
      name: 'login',
      component: login
    },
  ]
})
