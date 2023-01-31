import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入element库
import './plugins/element.js'

// 样式文件
import './assets/css/global.css'
import './assets/fonts/iconfont.css'

// 导入todomov 样式
// import '../node_modules/todomvc-common/base.css'
// import'../node_modules/todomvc-app-css/index.css'

// import'../node_modules/vue/dist/vue.js'

//  <script src="/node_modules/vue/dist/vue.js"></script>
// 导入axios 函数库
import axios from 'axios'

import './plugins/iview.js'
axios.defaults.baseURL = 'http://127.0.0.1:5000/'
Vue.prototype.$http = axios

// 自定义命令 focus  文本框聚焦
Vue.directive('focus', {

 inserted: function(el) {
     el.focus()
 }
})

Vue.directive('todos-focus', {
  update: function(el, binding) {
      if (binding.value) {
          el.focus()
      }

  }

})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
