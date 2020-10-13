import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

// 路由全局守卫
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  if (to.path == '/login') {
    sessionStorage.clear()
    next()
  } else {
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
