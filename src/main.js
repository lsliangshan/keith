// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'
import utils from './utils/index'
import * as filters from './filters'
import mixins from './mixins'
import jwt from 'jsonwebtoken'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

sync(store, router)

Vue.use(iView)

Vue.config.productionTip = false

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

router.beforeEach((to, from, next) => {
  const _state = router.app.$options.store.state
  let _localUserInfo = utils.storage.getItem(_state.localStorageKeys.userInfo)
  if (to.meta && to.meta.title) {
    utils.kit.title(to.meta.title)
  }
  if (to.meta && to.meta.role && to.meta.role.indexOf(_localUserInfo.role) < 0) {
    next({
      replace: true,
      name: 'NotFount'
    })
  } else {
    const secret = 'com.dei2'
    let _status = jwt.verify(_localUserInfo.token, secret, (err, decoded) => {
      return err || {}
    })
    if (_status.name === 'TokenExpiredError') {
      _localUserInfo = {}
      utils.storage.removeItem(_state.localStorageKeys.userInfo)
      next({
        replace: true,
        name: 'Login'
      })
    }
    if (utils.isEmptyObj(_localUserInfo)) {
      if (_state.needlessLogin.indexOf(to.name) === -1) {
        next({
          replace: true,
          name: 'Login'
        })
      }
    } else {
      _state.loginInfo = _localUserInfo
      if (to.name === 'Login') {
        next({
          replace: true,
          name: 'Home'
        })
      }
    }
    next()
  }
})

router.afterEach(to => {})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
