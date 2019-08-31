<template>
  <div
    v-if="!activeElement.page && tab === 1"
    class="panel-wrap">
    <ul class="tab tab-block panel-tab">
      <li
        :class="{active: activeTab === 1}"
        class="tab-item"
        @click="activeTab = 1"><a>参数</a></li>
      <li
        :class="{active: activeTab === 2}"
        class="tab-item"
        @click="activeTab = 2"><a>数据</a></li>
      <li
        :class="{active: activeTab === 3}"
        class="tab-item"
        @click="activeTab = 3"><a>高级</a></li>
    </ul>

    <!-- 组件配置 -->
    <component
      :is="widgetStyle"
      :tab="activeTab"
      :active-element="activeElement" />
  </div>
</template>

<script>
import widget from '../../plugins/widget'
import vpd from '../../mixins/vpd'

export default {
  name: 'PanelStyle',
  mixins: [vpd],
  props: ['activeElement', 'tab'],
  data () {
    return {
      activeTab: 1
    }
  },

  computed: {
    widgetStyle () {
      let panel = ''
      if (this.activeElement.type) {
        const styles = widget.getWidgetStyle()
        Object.keys(styles).filter(key => {
          if (styles[key].type === this.activeElement.type) {
            panel = key
          }
        })
      }

      return panel
    }
  }
}
</script>
