<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>

      <div class="panel-item-new">
        <div @click="isShowJiao = !isShowJiao" class="panel-item-title">角度轴<i :class="isShowJiao ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowJiao" class="panel-item-new-set">
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示轴</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showX"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.showX"
            class="panel-row">
            <div class="panel-label">轴线颜色</div>
            <div class="panel-value">{{ activeElement.xLineColor }}</div>
            <div>
              <input
                v-model="activeElement.xLineColor"
                type="color">
            </div>
          </div>
          <div
            v-show="activeElement.showX"
            class="panel-row">
            <div class="panel-label">轴线宽度</div>
            <div>
              <input
                v-model="activeElement.xLineWidth"
                type="number">
            </div>
          </div>
          <div class="panel-row"
               flex>
            <div class="panel-label">显示刻度</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showXaxisTick"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.showXaxisTick"
            class="panel-row">
            <div class="panel-label">文字颜色</div>
            <div class="panel-value">{{ activeElement.xTextColor }}</div>
            <div>
              <input
                v-model="activeElement.xTextColor"
                type="color">
            </div>
          </div>
          <div
            v-show="activeElement.showXaxisTick"
            class="panel-row">
            <div class="panel-label">文字大小</div>
            <div>
              <input
                v-model="activeElement.xTextFontSize"
                type="number">
            </div>
          </div>
          <div
          v-show="activeElement.showXaxisTick"
          class="panel-row">
          <div class="panel-label">文字旋转</div>
          <div>
            <input
              v-model="activeElement.xLabelRotate"
              type="number">
          </div>
        </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowJing = !isShowJing" class="panel-item-title">径向轴<i :class="isShowJing ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowJing" class="panel-item-new-set">
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示标线</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showYSplitLine"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
          v-show="activeElement.showYSplitLine"
          class="panel-row">
          <div class="panel-label">标线颜色</div>
          <div class="panel-value">{{ activeElement.splitLineColor }}</div>
          <div>
            <input
              v-model="activeElement.splitLineColor"
              type="color">
          </div>
        </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowPolar = !isShowPolar" class="panel-item-title">图表设置<i :class="isShowPolar ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowPolar" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">大小调整</div>
            <div>
              <input
                v-model="activeElement.polarSize">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">分割段数</div>
            <div>
              <input
                v-model="activeElement.splitNumber"
                type="number"
                min="1">
            </div>
          </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowColor = !isShowColor" class="panel-item-title">配置颜色<i :class="isShowColor ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowColor" class="panel-item-new-set">

          <div class="panel-row">
            <div class="panel-label">配置颜色</div>
            <div class="panel-setcolor">
              <div
                v-for="(value, index) in activeElement.seriesColors"
                :key="index"
                :data-val="value"
                :data-ind="index"
                class="panel-setcolor-item">
                <div class="panel-value-new panel-color-cont">{{ value }}</div>
                <div>
                  <el-color-picker
                    v-model="activeElement.seriesColors[index]"
                    show-alpha
                    size="mini"/>
                </div>
                <el-tooltip class="item" effect="dark" :content="index == 0 ? '添加' : '删除'" placement="top-end">
                  <i v-if="index == 0" class="panel-color-icon el-icon-plus" @click="addLGColor"></i>
                  <i v-else class="panel-color-icon el-icon-close" @click="delLGColor(index)"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据源设置 -->
    <div v-if="tab === 2">
      <data-settings :activeElement="activeElement"/>
    </div>

    <!-- 其他设置 -->
    <div v-show="tab === 3">
      <!--图例设置-->
      <common-settings :activeElement="activeElement" />

      <div class="panel-item-new">
        <div @click="isShowItem = !isShowItem" class="panel-item-title">图表样式<i :class="isShowItem ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowItem" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">样式</div>
            <div class="panel-value">
              <select v-model="activeElement.polarType">
                <option value="bar">扇形</option>
                <option value="line">折线</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataSettings from '../../CommonModule/DataSettings'
import BasicSettings from '../../CommonModule/BasicSettings'
import CommonSettings from '../../CommonModule/CommonSettings'

export default {
  name: 'PolarBarChartStyle',
  components: {
    DataSettings,
    BasicSettings,
    CommonSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowJiao: true,
      isShowJing: true,
      isShowPolar: true,
      isShowColor: true,
      isShowItem: true
    }
  },
  methods: {
    addLGColor () {
      const params = {
        property: 'seriesColors',
        data: '#0000ff'
      }
      this.$vpd.commit('ADD_COLOR', params)
    },
    delLGColor (index) {
      console.log('dd')
      const params = {
        property: 'seriesColors',
        data: {
          index: index
        }
      }
      this.$vpd.commit('DELETE_COLOR', params)
    }
  }
}
</script>
