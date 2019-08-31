<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>

      <div class="panel-item-new">
        <div class="panel-item-title">样式</div>
        <div class="panel-row" flex>
          <div class="panel-label">大小</div>
          <div>
            <input
              v-model="activeElement.fontSize"
              type="number">
          </div>
        </div>

        <div class="panel-row" flex>
          <div class="panel-label">颜色</div>
          <div class="panel-value">{{ activeElement.color }}</div>
          <div>
            <input type="color" v-model="activeElement.color">
          </div>
        </div>

        <div class="panel-row" flex>
          <div class="panel-label">反转</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.reverse"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicSettings from '../../CommonModule/BasicSettings'

export default {
  name: 'effectsRotateLineStyle',
  components: {
    BasicSettings
  },
  props: ['activeElement', 'tab']
}
</script>
