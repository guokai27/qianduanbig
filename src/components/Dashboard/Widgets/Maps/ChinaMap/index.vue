<template>
  <div
    :style="{
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      backgroundColor: val.bgColor,
      color: val.color
    }"
    contenteditable="true">
    <v-echart
      :id="chartId"
      :options="options"
      autoresize
      class="ffff"/>
  </div>
</template>

<script>
import stylec from './style.vue'
import dataControl from '../../CommonModule/mixins/dataControl'

import 'echarts/map/js/china.js'
import echarts from 'echarts'
import autoToolTip from '../../CommonModule/scripts/echartsAutoToolTip.js'
const WIDGET_NAME = 'BraidChinaMap'
export default {
  name: WIDGET_NAME,
  group: 'map',
  icon: require('./icon/thumb-chartMap.png'),
  title: '全国分布图',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 400,
    height: 260,
    left: 100,
    top: 20,
    z: 0,
    color: '#555555',
    name: '全国分布图', // 组件名称, 可自定义
    desc: '中国地图', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    chartTitle: '', // 图表标题
    titleColor: '#666666', // 标题颜色

    seriesColors: ['#1ccada', '#d2f4f8'],
    colorArr: ['#1ccada', '#d2f4f8'],
    bgMapColor: '', // 地图背景颜色
    mapBorderColor: '#ffffff', // 地图地域边框颜色
    mapEmphasisAreaColor: 'rgba(231,235,13,0.9)', // 高亮区域颜色
    showVisualMap: true, // 是否显示值域条
    visualTextColor: '#aaaaaa', // 值域条文本颜色
    autoToolTip: false, // 是否开启自动轮播
    autoToolTipTime: 5000, // 自动轮播时间

    dataAPI: 'https://mock.kunteng.org.cn/mock/5ca2cba34918866472494a14/chartMap', // API拉取地址
    dataAutoRefresh: false, // 是否自动刷新
    dataOrigin: 'local', // local 本地 api 远程接口
    dataRefreshTime: 5, // 自动刷新间隔（秒）
    dataRefresh: false, // 刷新图表, 控制面板中测试dataApi使用

    // 数据联动配置
    linkEnable: false, // 开启联动
    linkIsMain: false, // 是否是数据源
    linkMainUUID: '', // 上级的UUID, 通过此标志获取联动的数据

    keyPrimary: 'data',
    keyTarget: 'china', // 响应数据对应的字段名
    keyXAxis: '', // 从该字段取x轴数据
    keyYAxis: '', // 从该字段取y轴数据

    csvHash: '',
    csvSeries: '',
    csvNum: '',
    csvHeader: '',
    csvGroup: 'map',

    staticData: {
      'code': 0,
      'data': {
        'year': 2019,
        'china': [
          { name: '北京', value: Math.round(Math.random() * 100) },
          { name: '天津', value: Math.round(Math.random() * 100) },
          { name: '上海', value: Math.round(Math.random() * 100) },
          { name: '重庆', value: Math.round(Math.random() * 100) },
          { name: '河北', value: Math.round(Math.random() * 100) },
          { name: '河南', value: Math.round(Math.random() * 100) },
          { name: '云南', value: Math.round(Math.random() * 100) },
          { name: '辽宁', value: Math.round(Math.random() * 100) },
          { name: '黑龙江', value: Math.round(Math.random() * 100) },
          { name: '湖南', value: Math.round(Math.random() * 100) },
          { name: '安徽', value: Math.round(Math.random() * 100) },
          { name: '山东', value: Math.round(Math.random() * 100) },
          { name: '新疆', value: Math.round(Math.random() * 100) },
          { name: '江苏', value: Math.round(Math.random() * 100) },
          { name: '浙江', value: Math.round(Math.random() * 100) },
          { name: '江西', value: Math.round(Math.random() * 100) },
          { name: '湖北', value: Math.round(Math.random() * 100) },
          { name: '广西', value: Math.round(Math.random() * 100) },
          { name: '甘肃', value: Math.round(Math.random() * 100) },
          { name: '山西', value: Math.round(Math.random() * 100) },
          { name: '内蒙古', value: Math.round(Math.random() * 100) },
          { name: '陕西', value: Math.round(Math.random() * 100) },
          { name: '吉林', value: Math.round(Math.random() * 100) },
          { name: '福建', value: Math.round(Math.random() * 100) },
          { name: '贵州', value: Math.round(Math.random() * 100) },
          { name: '广东', value: Math.round(Math.random() * 100) },
          { name: '青海', value: Math.round(Math.random() * 100) },
          { name: '西藏', value: Math.round(Math.random() * 100) },
          { name: '四川', value: Math.round(Math.random() * 100) },
          { name: '宁夏', value: Math.round(Math.random() * 100) },
          { name: '海南', value: Math.round(Math.random() * 100) },
          { name: '台湾', value: Math.round(Math.random() * 100) },
          { name: '香港', value: Math.round(Math.random() * 100) },
          { name: '澳门', value: Math.round(Math.random() * 100) }
        ]
      }
    }
  },
  mixins: [dataControl],
  props: ['w', 'h', 'val'],
  data () {
    return {
      timer: null,
      chartId: 'char' + this.val.uuid,
      dynamicData: {}
    }
  },
  computed: {
    dataSeries () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget]) {
        return this.dynamicData[this.val.keyPrimary][this.val.keyTarget]
      } else {
        return []
      }
    },
    options () {
      return {
        backgroundColor: this.val.bgMapColor, // 地图背景色
        title: {
          text: this.val.chartTitle, // 图表标题
          textStyle: {
            color: this.val.titleColor
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}：{c}'
        },
        roamController: {
          show: true,
          x: 'right',
          mapTypeControl: {
            'china': true
          }
        },
        visualMap: {
          show: this.val.showVisualMap, // 显示值域条
          type: 'continuous', // 连续型
          min: 0,
          max: 100, // 值域最大值，必须参数
          left: 'left',
          top: 'bottom',
          color: this.val.seriesColors,
          textStyle: {
            color: this.val.visualTextColor // 值域条文本颜色
          },
          calculable: true // 是否启用值域漫游
        },
        series: [{
          name: '销量',
          type: 'map',
          mapType: 'china',
          roam: false,
          itemStyle: {
            normal: { // 普通状态下样式
              areaColor: this.val.seriesColors[1],
              borderColor: this.val.mapBorderColor, // 地图地域边框颜色
              textStyle: {
                color: 'red'
              }
            },
            emphasis: { // 高亮状态下样式
              areaColor: this.val.mapEmphasisAreaColor
            }
          },
          data: this.dataSeries
        }, {
          name: '',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: [
            { name: '合肥', value: [117.27, 31.86, 56] },
            { name: '牡丹江', value: [129.58, 44.6, 94] },
            { name: '库尔勒', value: [86.06, 41.68, 150] }
          ],
          encode: {
            value: 2
          },
          symbolSize: function (val) {
            return val[2] / 10
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        }]
      }
    }
  },
  watch: {
    'val.autoToolTip': function (val) {
      this.drawBar(val ? this.val.autoToolTipTime : 0)
    },
    'val.autoToolTipTime': function (val) {
      this.drawBar(val)
    }
  },
  mounted () {
    if (this.val.autoToolTip) {
      this.drawBar(this.val.autoToolTipTime)
    }
    if (this.$vpd.state.uuid === this.val.uuid) {
      let colors = this.$vpd.state.page.colors.value.slice(0, 2)
      let param = {
        name: 'seriesColors',
        value: colors
      }
      this.$vpd.commit('UPDATE_ACTIVE_ELEMENT', param)
    }
    this.getProJSON()
  },
  methods: {
    drawBar (time) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.chartId))
      // 使用刚指定的配置项和数据显示图表
      myChart.setOption(this.options)
      // 使用轮播插件
      clearInterval(this.timer)
      this.timer = autoToolTip.autoHover(myChart, this.options, this.dataSeries.length, time)
    }
  }
}
</script>
