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
          <div class="panel-row" v-show="activeElement.showYSplitLine">
            <div class="panel-label">标线颜色</div>
            <div class="panel-colormsg">{{ activeElement.splitLineColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.splitLineColor"
                show-alpha
                size="small"/>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowLine = !isShowLine" class="panel-item-title">图表设置<i :class="isShowLine ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowLine" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">上边距</div>
            <div>
              <input
                v-model="activeElement.gridTop">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">下边距</div>
            <div>
              <input
                v-model="activeElement.gridBottom">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">左边距</div>
            <div>
              <input
                v-model="activeElement.gridLeft">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">右边距</div>
            <div>
              <input
                v-model="activeElement.gridRight">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">标题</div>
            <div>
              <input
                v-model="activeElement.chartTitle">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">标题颜色</div>
            <div class="panel-colormsg">{{ activeElement.titleColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.titleColor"
                show-alpha
                size="small"/>
            </div>
          </div>
          <div class="panel-row" style="display:none;">
            <div class="panel-label">柱形图间距</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.seriesBarGap"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowSet = !isShowSet" class="panel-item-title">系列配置<i :class="isShowSet ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowSet" class="panel-item-new-set">

          <el-tabs class="panel-tab-mini" v-model="editableTabsValue" @edit="handleTabsEdit" @tab-click="handleClick">
            <el-tab-pane
              :key="item.name"
              v-for="item in editableTabs"
              :label="item.title"
              :name="item.name"
              size="mini"
            >
              <div>
                <div class="panel-row">
                  <div class="panel-label">配置颜色</div>
                  <div class="panel-colormsg">{{ activeElement.seriesColors[editableTabsValue] }}</div>
                  <div class="panel-colorpick">
                    <el-color-picker
                      v-model="activeElement.seriesColors[editableTabsValue]"
                      show-alpha
                      size="small"/>
                  </div>
                </div>
                <div class="panel-row" style="display: none;">
                  <div class="panel-label">配置颜色</div>
                  <div class="panel-setcolor">
                    <div
                      v-for="(item,index) in activeElement.lgArr[editableTabsValue]"
                      :key="index"
                      class="panel-setcolor-item">
                      <div class="panel-value-new">{{ item.color }}</div>
                      <div>
                        <input
                          v-model="item.color"
                          type="color">
                        <input
                          v-if="activeElement.lgArr[editableTabsValue].length > 1"
                          v-model="item.offset"
                          type="number"
                          step="0.1"
                          min="0"
                          max="1"
                          class="radiusInp">
                      </div>
                      <button style="display:none"
                        v-if="index == 0"
                        class="pannel-setcolor-item-btn"
                        @click="addLGColor">添加</button>
                      <button style="display:none"
                        v-else
                        class="pannel-setcolor-item-btn"
                        @click="delLGColor(index)">删除</button>
                    </div>
                  </div>
                </div>
                <div class="panel-row">
                  <div class="panel-label">柱形图宽度</div>
                  <div>
                    <input v-model="activeElement.seriesBarWidth[editableTabsValue]">
                  </div>
                </div>
                <div class="panel-row">
                  <div class="panel-label">圆角</div>
                  <div>
                    <input
                      v-model.number="activeElement.seriseRadiuses[editableTabsValue][0]"
                      type="number"
                      min="0"
                      max="99"
                      class="radiusInp">
                    <input
                      v-model.number="activeElement.seriseRadiuses[editableTabsValue][1]"
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
                      v-model.number="activeElement.seriseRadiuses[editableTabsValue][2]"
                      type="number"
                      min="0"
                      max="99"
                      class="radiusInp">
                    <input
                      v-model.number="activeElement.seriseRadiuses[editableTabsValue][3]"
                      type="number"
                      min="0"
                      max="99"
                      class="radiusInp">
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
    </div>

    <!-- 数据源设置 -->
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
      <div
        class="panel-row"
        flex>
        <div class="panel-label">显示提示框</div>
        <div class="panel-value">
          <label class="form-switch">
            <input
              v-model="activeElement.showTooltip"
              type="checkbox" >
            <i class="form-icon"/>
          </label>
        </div>
      </div>

      <!--图例设置-->
      <common-settings :activeElement="activeElement" />

    </div>
  </div>
</template>

<script>
import DataSettings from '../../CommonModule/DataSettings'
import BasicSettings from '../../CommonModule/BasicSettings'
import CommonSettings from '../../CommonModule/CommonSettings'

export default {
  name: 'BarsChartStyle',
  components: {
    DataSettings,
    BasicSettings,
    CommonSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowX: false,
      isShowY: false,
      isShowLine: false,
      isShowSet: true,
      icon: [
        {
          name: '无',
          value: 'none'
        }, {
          name: '圆形',
          value: 'circle'
        }, {
          name: '矩形',
          value: 'rectangle'
        }, {
          name: '圆角矩形',
          value: 'roundRect'
        }, {
          name: '三角形',
          value: 'triangle'
        }, {
          name: '空心圆',
          value: 'emptyCircle'
        }, {
          name: '菱形',
          value: 'diamond'
        }, {
          name: '标注',
          value: 'pin'
        }, {
          name: '箭头',
          value: 'arrow'
        }
      ],

      editableTabsValue: '0'
    }
  },
  computed: {
    editableTabs () {
      let data = this.activeElement.dataLength
      let tabs = new Array(data)
      for (let i = 0; i < data; i++) {
        tabs[i] = {
          title: 'Tab' + (i + 1),
          name: '' + i
        }
      }
      return tabs
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(this.editableTabsValue)
    },
    handleTabsEdit (targetName, action) {
      // console.log(targetName, this.editableTabsValue)
      if (action === 'add') {
        let newTabName = this.editableTabs.length + ''
        this.editableTabs.push({
          title: 'Tab' + (this.editableTabs.length + 1),
          name: newTabName
        })
        this.editableTabsValue = newTabName
      }
      if (action === 'remove') {
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }

        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      }
    },
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
