import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const LoginRouter = {
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录'
  },
  components: {
    HomeRouter: () => import('../components/Login.vue')
  }
}

export const HomeRouter = {
  path: '/',
  name: 'Home',
  meta: {
    title: 'Robot'
  },
  components: {
    HomeRouter: () => import('../components/Home.vue')
  }
}

export const page404 = {
  path: '/*',
  name: 'NotFound',
  meta: {
    title: '页面丢了'
  },
  components: {
    HomeRouter: () => import('../components/404.vue')
  }
}

export default new Router({
  mode: 'history',
  routes: [
    LoginRouter,
    HomeRouter,
    page404
  ]
})
