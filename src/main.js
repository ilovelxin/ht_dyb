import Vue from 'vue'
import './assets/common.css'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import echarts from 'echarts'           // 引入echarts组件
Vue.prototype.$echarts = echarts        //  在Vue原型上挂载$echarts方法

Vue.config.productionTip = false

// 引入文本框
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

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
