<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>
      <div class="panel-item-new">
        <div @click="isShowHead = !isShowHead" class="panel-item-title">表头<i :class="isShowHead ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowHead" class="pane l-item-new-set">
          <div
            class="panel-row"
            flex>
            <div class="panel-label">显示表头</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showTh"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div class="panel-row" v-show="activeElement.showTh">
            <div class="panel-label">文本颜色</div>
            <div class="panel-colormsg">{{ activeElement.thColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.thColor"
                show-alpha
                size="small"/>
            </div>
          </div>
          <div class="panel-row" v-show="activeElement.showTh">
            <div class="panel-label">背景色</div>
            <div class="panel-colormsg">{{ activeElement.thBgColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.thBgColor"
                show-alpha
                size="small"/>
            </div>
          </div>
          <div
            v-show="activeElement.showTh"
            class="panel-row">
            <div class="panel-label">表头高度</div>
            <div class="panel-value">
              <input
                v-model="activeElement.thHeight"
                type="number" >
            </div>
          </div>
          <div
          v-show="activeElement.showTh"
          class="panel-row">
          <div class="panel-label">表头文本</div>
          <div class="panel-value">
            <input
              v-model="activeElement.thFontSize"
              type="number" >
          </div>
        </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowNum = !isShowNum" class="panel-item-title">序号<i :class="isShowNum ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowNum" class="panel-item-new-set">
          <div class="panel-row" flex>
            <div class="panel-label">显示序号</div>
            <div class="panel-value">
              <label class="form-switch">
                <input
                  v-model="activeElement.showNum"
                  type="checkbox" >
                <i class="form-icon"/>
              </label>
            </div>
          </div>
          <div v-show="activeElement.showNum" class="panel-row">
            <div class="panel-label">序号文字</div>
            <div class="panel-value">
              <input
                v-model="activeElement.thNumText"
                type="text" >
            </div>
          </div>
          <div v-show="activeElement.showNum" class="panel-row">
            <div class="panel-label">序号大小</div>
            <div class="panel-value">
              <input
                v-model="activeElement.thNumWidth"
                type="number" >
            </div>
          </div>
          <div v-show="activeElement.showNum" class="panel-row">
            <div class="panel-label">文本大小</div>
            <div class="panel-value">
              <input
                v-model="activeElement.thNumFontSize"
                type="number" >
            </div>
          </div>
          <div class="panel-row" v-show="activeElement.showNum">
            <div class="panel-label">文本颜色</div>
            <div class="panel-colormsg">{{ activeElement.thNumColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.thNumColor"
                show-alpha
                size="small"/>
            </div>
          </div>
          <div v-show="activeElement.showNum" class="panel-row">
            <div class="panel-label">样式</div>
            <div class="panel-value">
              <el-radio-group class="panel-radio-cont" v-model="activeElement.thNumType" size="small">
                <el-radio label="none">无样式</el-radio>
                <el-radio label="circle">圆形背景</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="panel-row" v-show="activeElement.showNum && activeElement.thNumType === 'circle'">
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
                <el-tooltip class="item" effect="dark" :content="index == 0 ? '添加' : '删除'" placement="top-end">
                  <i v-if="index == 0" class="panel-color-icon el-icon-plus" @click="addthNumBgColor"></i>
                  <i v-else class="panel-color-icon el-icon-close" @click="delthNumBgColor(index)"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div style="display: none" class="panel-row">
            <div class="panel-label">配置颜色</div>
            <div class="panel-setcolor">
              <div
                v-for="(item,index) in activeElement.thNumBg"
                :key="index"
                class="panel-setcolor-item">
                <div class="panel-value-new">{{ item }}</div>
                <div>
                  <input
                    v-model="activeElement.thNumBg[index]"
                    type="color">
                </div>
                <button
                  v-if="index == 0"
                  class="pannel-setcolor-item-btn"
                  @click="addthNumBgColor">添加</button>
                <button
                  v-else
                  class="pannel-setcolor-item-btn"
                  @click="delthNumBgColor(index)">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowTable = !isShowTable" class="panel-item-title">表格<i :class="isShowTable ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowTable" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">每列占比</div>
            <div class="panel-value panel-basicTable-tbPercent-cont">
              <span
                class="panel-basicTable-inp-span"
                v-for="(item, index) in activeElement.tbPercent"
                :key="index">
              <input
                class="panel-basicTable-inp"
                v-model.number="activeElement.tbPercent[index]"
                type="number"
                max="9" >{{index === activeElement.tbPercent.length - 1 ? '' : ' ： '}}
                </span>
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">文本大小</div>
            <div class="panel-value">
              <input
                v-model="activeElement.tbFontSize"
                type="number" >
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">文本颜色</div>
            <div class="panel-colormsg">{{ activeElement.tbColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.tbColor"
                show-alpha
                size="small"/>
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">对齐方式</div>
            <div class="panel-value">
              <el-radio-group class="panel-radio-cont" v-model="activeElement.tbAlign" size="small">
                <el-radio label="left">居左</el-radio>
                <el-radio label="center">居中</el-radio>
                <el-radio label="right">居右</el-radio>
              </el-radio-group>
              <div class="panel-setcolor-item radioscont">
              </div>
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">边的宽度</div>
            <div class="panel-value">
              <input
                v-model="activeElement.borderWidth"
                type="number"
                min="0" >
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">边的颜色</div>
            <div class="panel-colormsg">{{ activeElement.borderColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.borderColor"
                show-alpha
                size="small"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="tab === 2">
      <data-settings :activeElement="activeElement"/>
    </div>
    <div v-show="tab === 3">
      <div class="panel-row">
        <div class="panel-label">行数</div>
        <div>
          <input
            v-model="activeElement.dataLength"
            type="number"
            min="1">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicSettings from '../../CommonModule/BasicSettings'
import axios from 'axios'
import DataSettings from '../../CommonModule/DataSettings'

export default {
  name: 'BasicTableStyle',
  components: {
    BasicSettings, DataSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowHead: true,
      isShowNum: true,
      isShowTable: true,
      dataJSON: JSON.stringify(this.activeElement.dataJSON, null, 2),
      selectStatus: '1'
    }
  },
  methods: {
    addthNumBgColor () {
      let params = {
        property: 'seriesColors',
        data: '#0000ff'
      }
      this.$vpd.commit('ADD_COLOR', params)
    },
    delthNumBgColor (index) {
      let params = {
        property: 'seriesColors',
        data: {
          index: index
        }
      }
      this.$vpd.commit('DELETE_COLOR', params)
    },
    handleBind () {
      // console.log("取到的值是"+this.selectStatus);
    },
    refreshAPIurl () { // API 拉取数据
      let url = this.activeElement.dataAPI
      axios({
        type: 'get',
        headers: { 'Content-Type': 'application/json' },
        url: url
      }).then(res => {
        let data = res.data.data
        let JSONData = {
          status: 0,
          msg: '',
          data: {
            categories: [],
            series: []
          }
        }
        for (let i in data) {
          JSONData.data.categories.push(data[i].unit)
          JSONData.data.series.push(data[i].schedule)
        }
        this.$vpd.commit('UPDATE_STATIC_DATA', JSONData)
      })
    },
    inpTime (e) {
      let time = e.target.value
      let param = {
        name: 'dataAPITime',
        value: time
      }
      this.$vpd.commit('UPDATE_WIDGET', param)
      // this.refreshData()
    },
    jsonOnMounted (edit) {
      // console.log(edit);
    },
    jsonOnCodeChange (value, event) {
      this.$vpd.commit('UPDATE_STATIC_DATA', JSON.parse(value))
    }
  }
}
</script>
<style scoped>
  .panel-basicTable-tbPercent-cont{
    width: 200px;
    display: inline-block;
  }
  .panel-basicTable-inp-span{
    display: inline-block;
    width:46px;
  }
  .panel-basicTable-inp{
    width:30px;
  }
</style>
