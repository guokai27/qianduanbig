<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>

      <div class="panel-item-new">
        <div @click="isShowProgress = !isShowProgress" class="panel-item-title">进度条设置<i :class="isShowProgress ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowProgress" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">环形颜色</div>
            <div class="panel-value">{{ activeElement.seriesBgColor }}</div>
            <div>
              <input
                v-model="activeElement.seriesBgColor"
                type="color">
            </div>
          </div>
          <div
            style="display: none;"
            class="panel-row"
            flex>
            <div class="panel-label">进度条渐变</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.isLinear"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.isLinear"
            class="panel-row">
            <div class="panel-label">配置颜色</div>
            <div class="panel-setcolor">
              <div
                v-for="(item,index) in activeElement.lgArr"
                :key="index"
                class="panel-setcolor-item">
                <div class="panel-value-new">{{ item.color }}</div>
                <div>
                  <input
                    v-model="item.color"
                    type="color">
                  <input
                    v-if="activeElement.lgArr.length > 1"
                    v-model="item.offset"
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    class="radiusInp">
                </div>
                <button
                  v-if="index == 0"
                  class="pannel-setcolor-item-btn"
                  @click="addLGColor">添加</button>
                <button
                  v-else
                  class="pannel-setcolor-item-btn"
                  @click="delLGColor(index)">删除</button>
              </div>
            </div>
          </div>
          <div
            v-show="!activeElement.isLinear"
            class="panel-row">
            <div class="panel-label">进度条颜色</div>
            <div class="panel-value">{{ activeElement.seriesColors[0] }}</div>
            <div>
              <input
                v-model="activeElement.seriesColors[0]"
                type="color">
            </div>
          </div>
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示文本</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showTitle"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.showTitle"
            class="panel-row">
            <div class="panel-label">文本大小</div>
            <div>
              <input
                v-model="activeElement.titleFontSize"
                type="number"
                min="0">
            </div>
          </div>
          <div
            v-show="activeElement.showTitle"
            class="panel-row">
            <div class="panel-label">文本颜色</div>
            <div class="panel-value">{{ activeElement.titleColor }}</div>
            <div>
              <input
                v-model="activeElement.titleColor"
                type="color">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">外圆大小</div>
            <div>
              <input
                v-model="activeElement.seriesRadius[1]"
                type="text">
            </div>
          </div>
          <div class="panel-row">
          <div class="panel-label">内圆大小</div>
          <div>
            <input
              v-model="activeElement.seriesRadius[0]"
              type="text">
          </div>
        </div>
        </div>
      </div>
    </div>

    <!-- 数据源设置 -->
    <div v-if="tab === 2">
      <data-settings :activeElement="activeElement"/>
    </div>

    <div v-show="tab === 3">

    </div>
  </div>
</template>

<script>
import DataSettings from '../../CommonModule/DataSettings'
import BasicSettings from '../../CommonModule/BasicSettings'

export default {
  name: 'CircularProgressBarStyle',
  components: {
    DataSettings,
    BasicSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowProgress: true
    }
  },
  methods: {
    addLGColor () {
      let params = {
        property: 'lgArr',
        data: {
          color: '#0000ff',
          offset: 1
        }
      }
      this.$vpd.commit('ADD_COLOR', params)
    },
    delLGColor (index) {
      let params = {
        property: 'lgArr',
        data: {
          index: index
        }
      }
      this.$vpd.commit('DELETE_COLOR', params)
    }
  }
}
</script>
