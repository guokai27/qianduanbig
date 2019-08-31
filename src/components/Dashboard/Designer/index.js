import VuePageDesigner from './index.vue'

import Slider from './components/Slider.vue'
import Icon from './components/Icon.vue'

import './style/app.scss'

const install = function (Vue, opts = {}) {
  Vue.component('VpdSlider', Slider)
  Vue.component('VpdIcon', Icon)

  Vue.component('VuePageDesigner', VuePageDesigner)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  VuePageDesigner
}
