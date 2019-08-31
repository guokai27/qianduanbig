<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>

      <div class="panel-item-new">
        <div @click="isShowX = !isShowX" class="panel-item-title">{{activeElement.axisReverse ? 'Y 轴' : 'X 轴'}}<i :class="isShowX ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowX" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">名称</div>
            <div>
              <input v-model="activeElement.xName" type="text">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">文本颜色</div>
            <div class="panel-colormsg">{{ activeElement.xTextColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.xTextColor"
                show-alpha
                size="small"/>
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">文本旋转</div>
            <div>
              <input
                v-model.number="activeElement.xRotate" type="number">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">轴线颜色</div>
            <div class="panel-colormsg">{{ activeElement.xLineColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.xLineColor"
                show-alpha
                size="small"/>
            </div>
          </div>
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
            class="panel-row"
            flex>
            <div class="panel-label">显示网格</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showXSplitLine"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            class="panel-row"
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
          class="panel-row"
          v-show="activeElement.showXaxisTick"
          flex>
          <div class="panel-label">刻度偏移</div>
          <div class="panel-value">
            <label class="form-switch">
              <input
                v-model="activeElement.xAxisLabel"
                type="checkbox" >
              <i class="form-icon"/>
            </label>
          </div>
        </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowY = !isShowY" class="panel-item-title">{{activeElement.axisReverse ? 'X 轴' : 'Y 轴'}}<i :class="isShowY ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowY" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">名称</div>
            <div>
              <input v-model="activeElement.yName" type="text">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">文本颜色</div>
            <div class="panel-colormsg">{{ activeElement.yTextColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.yTextColor"
                show-alpha
                size="small"/>
            </div>
          </div>
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示轴</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showY"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示网格</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showYSplitLine"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div class="panel-row" v-show="activeElement.showYSplitLine">
            <div class="panel-label">网格颜色</div>
            <div class="panel-colormsg">{{ activeElement.splitLineColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.splitLineColor"
                show-alpha
                size="small"/>
            </div>
          </div>
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示刻度</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showYTick"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示轴线</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showYLine"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div class="panel-row" v-show="activeElement.showYLine">
            <div class="panel-label">轴线颜色</div>
            <div class="panel-colormsg">{{ activeElement.yLineColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.yLineColor"
                show-alpha
                size="small"/>
            </div>
          </div>
          <div
            class="panel-row"
            flex>
            <div class="panel-label">是否翻转</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.yInverse"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowBar = !isShowBar" class="panel-item-title">图表设置<i :class="isShowBar ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowBar" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">上边距</div>
            <div>
              <input
                v-model="activeElement.gridTop"
                type="text">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">下边距</div>
            <div>
              <input
                v-model="activeElement.gridBottom"
                type="text">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">左边距</div>
            <div>
              <input
                v-model="activeElement.gridLeft"
                type="text">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">右边距</div>
            <div>
              <input
                v-model="activeElement.gridRight"
                type="text">
            </div>
          </div>
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示标题</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showTitle"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div v-show="activeElement.showTitle" class="panel-row">
            <div class="panel-label">标题</div>
            <div>
              <input
                v-model="activeElement.chartTitle"
                type="text">
            </div>
          </div>
          <div v-show="activeElement.showTitle" class="panel-row">
            <div class="panel-label">标题颜色</div>
            <div class="panel-value">{{ activeElement.titleColor }}</div>
            <div>
              <input
                v-model="activeElement.titleColor"
                type="color">
            </div>
          </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowBarItem = !isShowBarItem" class="panel-item-title">柱体设置<i :class="isShowBarItem ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowBarItem" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">宽度</div>
            <div>
              <input v-model="activeElement.seriseBarWidth" type="text">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">圆角</div>
            <div>
              <input
                v-model.number="activeElement.seriseRadiuses[0]"
                type="number"
                min="0"
                max="99"
                class="radiusInp">
              <input
                v-model.number="activeElement.seriseRadiuses[1]"
                type="number"
                min="0"
                max="99"
                class="radiusInp">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label"></div>
            <div>
              <input
                v-model.number="activeElement.seriseRadiuses[2]"
                type="number"
                min="0"
                max="99"
                class="radiusInp">
              <input
                v-model.number="activeElement.seriseRadiuses[3]"
                type="number"
                min="0"
                max="99"
                class="radiusInp">
            </div>
          </div>
          <div class="panel-row" style="display: none">
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
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowColor = !isShowColor" class="panel-item-title">配置颜色<i :class="isShowColor ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowColor" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">配置颜色</div>
            <div class="panel-colormsg">{{ activeElement.seriesColors[0] }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.seriesColors[0]"
                show-alpha
                size="small"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="tab === 2">
      <data-settings :activeElement="activeElement"/>
    </div>

    <div v-show="tab === 3">
      <div
        class="panel-row"
        flex>
        <div class="panel-label">X/Y轴翻转</div>
        <div class="panel-value">
          <label class="form-switch">
            <input
              v-model="activeElement.axisReverse"
              type="checkbox" >
            <i class="form-icon"/>
          </label>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowTooltip = !isShowTooltip" class="panel-item-title">ToolTip设置<i :class="isShowTooltip ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowTooltip" class="panel-item-new-set">
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示提示框</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showToolTip"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.showToolTip"
            class="panel-row"
            flex>
            <div class="panel-label">开启轮播</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.autoToolTip"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.showToolTip && activeElement.autoToolTip"
            class="panel-row">
            <div class="panel-label">轮播时间</div>
            <div>
              <input
                v-model="activeElement.autoToolTipTime"> ms
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

export default {
  name: 'BasicBarChartStyle',
  components: {
    DataSettings,
    BasicSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowX: true,
      isShowY: true,
      isShowBar: true,
      isShowBarItem: true,
      isShowColor: true,
      isShowTooltip: true
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
