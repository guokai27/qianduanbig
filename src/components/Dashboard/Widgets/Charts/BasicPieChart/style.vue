<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>

      <div class="panel-item-new">
        <div @click="isShowBarItem = !isShowBarItem" class="panel-item-title">饼图设置<i :class="isShowBarItem ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowBarItem" class="panel-item-new-set">
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
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示标线</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showLabel"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div class="panel-row" v-show="activeElement.showLabel">
            <div class="panel-label">标线长度</div>
            <div>
              <input
                v-model.number="activeElement.labelLineLength"
                type="number">
            </div>
          </div>
          <div class="panel-row"  v-show="activeElement.showLabel">
            <div class="panel-label">标线颜色</div>
            <div class="panel-colormsg">{{ activeElement.labelLineColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.labelLineColor"
                show-alpha
                size="small"/>
            </div>
          </div>
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
                    size="small"/>
                </div>
                <!--<button-->
                  <!--v-if="index == 0"-->
                  <!--class="pannel-setcolor-item-btn"-->
                  <!--@click="addLGColor">添加</button>-->
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

    <div v-if="tab === 2">
      <data-settings :activeElement="activeElement"/>
    </div>

    <div v-show="tab === 3">
      <!--图例设置-->
      <common-settings :activeElement="activeElement" />
      <div class="panel-item-new">
        <div @click="isShowTITLE = !isShowTITLE" class="panel-item-title">标题设置<i :class="isShowTITLE ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowTITLE" class="panel-item-new-set">
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
            <div class="panel-label">标题文本</div>
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
          <div v-show="activeElement.showTitle" class="panel-row">
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
            class="panel-row"
            flex>
            <div class="panel-label">对齐</div>
            <div class="panel-value">
              <label class="radiolabel">
                <input
                  v-model="activeElement.titleX"
                  type="radio"
                  class="inpRadio"
                  name="x"
                  value="left">居左
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.titleX"
                  type="radio"
                  class="inpRadio"
                  name="x"
                  value="center">居中
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.titleX"
                  type="radio"
                  class="inpRadio"
                  name="x"
                  value="right">居右
              </label>
            </div>
          </div>
          <div
            v-show="activeElement.showTitle"
            class="panel-row"
            flex>
            <div class="panel-label"></div>
            <div class="panel-value">
              <label class="radiolabel">
                <input
                  v-model="activeElement.titleY"
                  type="radio"
                  class="inpRadio"
                  name="y"
                  value="top">居上
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.titleY"
                  type="radio"
                  class="inpRadio"
                  name="y"
                  value="center">居中
              </label>
              <label class="radiolabel">
                <input
                  v-model="activeElement.titleY"
                  type="radio"
                  class="inpRadio"
                  name="y"
                  value="bottom">居下
              </label>
            </div>
          </div>
          <div v-show="activeElement.showTitle" class="panel-row">
            <div class="panel-label">副标题文本</div>
            <div>
              <input
                v-model="activeElement.titleSubText"
                type="text">
            </div>
          </div>
          <div v-show="activeElement.showTitle" class="panel-row">
            <div class="panel-label">副标题颜色</div>
            <div class="panel-value">{{ activeElement.titleSubColor }}</div>
            <div>
              <input
                v-model="activeElement.titleSubColor"
                type="color">
            </div>
          </div>
          <div v-show="activeElement.showTitle" class="panel-row">
            <div class="panel-label">副文本大小</div>
            <div>
              <input
                v-model="activeElement.titleSubFontSize"
                type="number"
                min="0">
            </div>
          </div>
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
      <div class="panel-item-new">
        <div @click="isShowChart = !isShowChart" class="panel-item-title">图表设置<i :class="isShowChart ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowChart" class="panel-item-new-set">
          <div
            class="panel-row"
            flex>
            <div class="panel-label">转为饼图</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.toPie"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div class="panel-row" v-show="activeElement.toPie">
            <div class="panel-label">外圆大小</div>
            <div>
              <input
                v-model="activeElement.seriesRadius[1]"
                type="text">
            </div>
          </div>
          <div class="panel-row" v-show="activeElement.toPie">
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
  </div>
</template>

<script>
import DataSettings from '../../CommonModule/DataSettings'
import BasicSettings from '../../CommonModule/BasicSettings'
import CommonSettings from '../../CommonModule/CommonSettings'

export default {
  name: 'BasicPieChartStyle',
  components: {
    DataSettings,
    BasicSettings,
    CommonSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowX: true,
      isShowY: true,
      isShowBar: true,
      isShowBarItem: true,
      isShowTooltip: false,
      isShowTITLE: false,
      isShowChart: false
    }
  },
  methods: {
    addLGColor () {
      const params = {
        property: 'colorArr',
        data: '#0000ff'
      }
      this.$vpd.commit('ADD_COLOR', params)
    },
    delLGColor (index) {
      const params = {
        property: 'colorArr',
        data: {
          index: index
        }
      }
      this.$vpd.commit('DELETE_COLOR', params)
    }
  }
}
</script>
