// 共用的入口文件，每个页面的入口都需要引用这个文件

import 'es6-promise/auto'

import Vue from 'vue'
import './styles/base.scss'

Vue.config.productionTip = false

function createApp(App) {
  /* eslint-disable */
  const root = new Vue({
    el: '#app',
    template: '<div id="app"><App /></div>',
    components: { App },
  })
  /* eslint-enable */
}

export default createApp
