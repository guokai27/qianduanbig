<template>
<div>
  <div class="panel-item-new">
    <div @click="isShowLegend = !isShowLegend" class="panel-item-title">图例设置<i :class="isShowLegend ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
    <div v-show="isShowLegend" class="panel-item-new-set">
      <div
        class="panel-row"
        flex>
        <div class="panel-label">显示图例</div>
        <div class="panel-value">
          <label class="form-switch">
            <input
              v-model="activeElement.legendShow"
              type="checkbox" >
            <i class="form-icon"/>
          </label>
        </div>
      </div>
      <div
        v-show="activeElement.legendShow"
        class="panel-row">
        <div class="panel-label">宽度</div>
        <div>
          <input v-model="activeElement.legendWidth">
        </div>
      </div>
      <div
        v-show="activeElement.legendShow"
        class="panel-row">
        <div class="panel-label">文字大小</div>
        <div>
          <input
            v-model="activeElement.legendFontSize"
            type="number" min="8">
        </div>
      </div>
      <div class="panel-row" v-show="activeElement.legendShow">
        <div class="panel-label">文字颜色</div>
        <div class="panel-colormsg">{{ activeElement.legendTextColor }}</div>
        <div class="panel-colorpick">
          <el-color-picker
            v-model="activeElement.legendTextColor"
            show-alpha
            size="small"/>
        </div>
      </div>
      <div
        v-show="activeElement.legendShow"
        class="panel-row"
        flex>
        <div class="panel-label">对齐</div>
        <div class="panel-value">
          <el-radio-group class="panel-radio-cont" v-model="activeElement.legendPositionX" size="small">
            <el-radio label="left">居左</el-radio>
            <el-radio label="center">居中</el-radio>
            <el-radio label="right">居右</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div
        v-show="activeElement.legendShow"
        class="panel-row"
        flex>
        <div class="panel-label"></div>
        <div class="panel-value">
          <el-radio-group class="panel-radio-cont" v-model="activeElement.legendPositionY" size="small">
            <el-radio label="top">居上</el-radio>
            <el-radio label="center">居中</el-radio>
            <el-radio label="bottom">居下</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div>
        <div
          v-show="activeElement.legendShow"
          class="panel-row">
          <div class="panel-label">图例图标</div>
          <div class="panel-value">
            <select v-model="activeElement.legendIcon">
              <option
                v-for="(val, index) in icon"
                :key="index" :value="val.value">{{ val.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div
        v-show="activeElement.legendShow"
        class="panel-row">
        <div class="panel-label">图标宽度</div>
        <div>
          <input
            v-model="activeElement.legendIconWidth"
            type="number" min="1">
        </div>
      </div>
      <div
        v-show="activeElement.legendShow"
        class="panel-row">
        <div class="panel-label">图标高度</div>
        <div>
          <input
            v-model="activeElement.legendIconHeight"
            type="number" min="1">
        </div>
      </div>
      <div
        v-show="activeElement.legendShow"
        class="panel-row">
        <div class="panel-label">图标间距</div>
        <div>
          <input
            v-model="activeElement.legendIconGap"
            type="number" min="0">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import vpd from '@/components/Dashboard/Designer/mixins/vpd'

export default {
  name: 'CommonSettings',
  mixins: [vpd],
  props: ['activeElement'],
  data () {
    return {
      isShowLegend: false,
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
      ]
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
