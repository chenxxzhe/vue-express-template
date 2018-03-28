// 共用的入口文件，每个页面的入口都需要引用这个文件

import 'es6-promise/auto'

import Vue from 'vue'
import './styles/base.scss'

Vue.config.productionTip = false

function createApp (app) {
  /* eslint-disable */
  new Vue({
    el: '#app',
    render: h => h(app),
  })
  /* eslint-enable */
}

export default createApp
