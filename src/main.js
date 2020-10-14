import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import echarts from 'echarts'           // 引入echarts组件
Vue.prototype.$echarts = echarts        //  在Vue原型上挂载$echarts方法
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
