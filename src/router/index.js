import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Menu from '@/components/Menu'
import Home from '@/components/Home'
import CloudDoc from '@/components/CloudDoc'
import Notificationn from '@/components/Notification'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/doc',
      name: 'CloudDoc',
      component: CloudDoc
    },
    {
      path: '/notification',
      name: 'Notification',
      component: Notificationn
    },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to.name, localStorage.getItem('DatabaseName'))
  if (to.name === 'Login' && localStorage.getItem('DatabaseName')) {
    next('/Menu')
  }
  if ((to.name !== 'Login' && from.name !== 'Login') && !localStorage.getItem('DatabaseName')) {
    next('/')
  }
  // if (to.name === 'Login' && localStorage.getItem('Token')) {
  //   next('/');
  // }
  // if ((to.name !== 'Login' && from.name !== 'Login')
  //     && !localStorage.getItem('Token')) {
  //   next('/login');
  // }
  next()
})
export default router
