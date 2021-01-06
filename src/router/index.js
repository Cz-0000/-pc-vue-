import Vue from 'vue';
import Router from 'vue-router';
import DefaultPage from '../layout/default';
import Blank from '../layout/blank';
import Index from '../page/index';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DefaultPage',
      component: DefaultPage,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: Index
        },
        {
          path: '/changeCity',
          name: 'changeCity',
          component: () => import('../page/changeCity')
        },
        {
          path: 's/:name',
          name: 'goods',
          component: () => import('../page/goodsList')
        }
      ]
    },
    {
      path: '/blank',
      name: 'Blank',
      component: Blank,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../page/login')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../page/register')
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})