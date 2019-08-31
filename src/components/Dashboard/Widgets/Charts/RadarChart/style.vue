<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>

      <div class="panel-item-new">
        <div @click="isShowLine = !isShowLine" class="panel-item-title">图表设置<i :class="isShowLine ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowLine" class="panel-item-new-set">
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
          <div class="panel-row">
            <div class="panel-label">区域背景</div>
            <div class="panel-colormsg">{{ activeElement.seriesAreaStyleBgColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.seriesAreaStyleBgColor"
                show-alpha
                size="small"/>
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">文本颜色</div>
            <div class="panel-colormsg">{{ activeElement.seriesTextColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.seriesTextColor"
                show-alpha
                size="small"/>
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">标线颜色</div>
            <div class="panel-colormsg">{{ activeElement.seriesLineColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.seriesLineColor"
                show-alpha
                size="small"/>
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
  name: 'RadarChartStyle',
  components: {
    DataSettings,
    BasicSettings,
    CommonSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowLine: false,
      isShowSet: true,

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
    }
  }
}
</script>
