import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/common.css'
import Echarts from '@/plugins/Echarts.js'
import '@/plugins/CityName'
// import Tabs from '@/components/tabs'
// 引入vant组件
import { Cascader, Field, Popup, Button, NavBar, Sticky, Skeleton, Tab, Tabs } from 'vant'
import MMarkdownPreview from 'm-markdown-preview'

Vue.use(MMarkdownPreview)

// Vue.use(Tabs)
Vue.use(NavBar)
Vue.use(Cascader)
Vue.use(Field)
Vue.use(Popup)
Vue.use(Button)
Vue.use(Button)
Vue.use(Sticky)
Vue.use(Skeleton)
Vue.use(Tab)
Vue.use(Tabs)

Vue.config.productionTip = false
Vue.use(Echarts)

if (process.env.NODE_ENV !== 'development') { // process是Node环境全部变量, 运行时根据敲击的命令不同, 脚手架会取环境变量给env添加属性和值
  console.log = function () { }
  console.error = function () { }
  console.dir = function () { }
}
new Vue({
  router,
  store,
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
