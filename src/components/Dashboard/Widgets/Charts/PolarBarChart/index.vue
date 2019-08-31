<template>
  <div
    :style="{
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      color: val.color
    }"
    contenteditable="true">
    <v-echart
      :options="options"
      autoresize
      class="ffff"/>
  </div>
</template>

<script>
import stylec from './style.vue'
import dataControl from '../../CommonModule/mixins/dataControl'

const WIDGET_NAME = 'PolarBarChart'
export default {
  name: WIDGET_NAME,
  group: 'chart',
  icon: require('./icon/thumb-barpolar.png'),
  title: '堆叠柱状图',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 300,
    height: 350,
    left: 100,
    top: 50,
    z: 0,
    color: '#f7f7f7',
    name: '堆叠柱状图', // 组件名称, 可自定义
    desc: '极坐标系下的堆叠柱状图', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    showX: false, // 是否显示 X 轴
    xLineWidth: 1, // X 轴轴线宽度
    xTextColor: '#f7f7f7', // X 轴文字颜色
    xTextFontSize: 14, // X 轴文字大小
    xLabelRotate: 0, // X轴文字旋转角度
    showYSplitLine: true, // 是否显示Y 轴网格线
    splitLineColor: '#2c213d', // y轴标线颜色
    colorArr: ['#fc8700', '#ff00c0', '#f33a00', '#2cbdff', '#0000ff', '#25da29', '#f1f10e', '#07ecf8', '#af28d7', '#20f807'], // 颜色数组
    polarSize: '70%', // 图表大小调整 如 70% / 300
    splitNumber: 10, // 分割段数
    polarType: 'bar', // 图表标线样式 如 line, bar

    seriesColors: [],

    legendShow: true, // 显示图例
    legendWidth: '80%', // 图例宽度
    legendHeight: '100', // 图例高度
    legendPositionX: 'center', // 图例位置（X 轴）
    legendPositionY: 'bottom', // 图例位置（Y 轴）
    legendFontSize: 12, // 图例文字大小
    legendTextColor: '#f7f7f7', // 图例文字颜色
    legendIcon: 'roundRect', // 图例 Icon 如 circle, rect, line, roundRect, triangle, diamond, pin, none
    legendIconWidth: 20, // 图例 Icon 宽度
    legendIconHeight: 10, // 图例 Icon 高度
    legendIconGap: 10, // 图例 Icon 间距

    dataAPI: 'https://mock.kunteng.org.cn/mock/5ca2cba34918866472494a14/quickv/api/demo', // API拉取地址
    dataAutoRefresh: false, // 是否自动刷新
    dataOrigin: 'local', // local 本地 api 远程接口
    dataRefreshTime: 5, // 自动刷新间隔（秒）
    dataRefresh: false, // 刷新图表, 控制面板中测试dataApi使用

    // 数据联动配置
    linkEnable: false, // 开启联动
    linkIsMain: false, // 是否是数据源
    linkMainUUID: '', // 上级的UUID, 通过此标志获取联动的数据

    keyPrimary: 'data',
    keyTarget: 'statistics', // 响应数据对应的字段名
    keyXAxis: 'x', // 从该字段取x轴数据
    keyYAxis: 'y', // 从该字段取y轴数据

    csvHash: '', // 选择的 csv 数据hash值 (通过该值获取表头信息)
    csvSeries: '', // 分组标签
    csvNum: '', // 取值标签 (堆叠图为数组)
    csvHeader: [], // 选中的表头关系
    csvGroup: 'single', // 组件分组(csv数据请求接口类型single/multiple/table/map)

    staticData: {
      'code': 0,
      'data': {
        'year': 2019,
        'statistics': [
          {
            'x': 'Samsung',
            'y': 33801
          },
          {
            'x': 'iPhone',
            'y': 63395
          },
          {
            'x': 'HUAWEI',
            'y': 89297
          },
          {
            'x': 'VIVO',
            'y': 76689
          },
          {
            'x': 'OPPO',
            'y': 32219
          },
          {
            'x': 'MI',
            'y': 98748
          },
          {
            'x': 'Meizu',
            'y': 18290
          },
          {
            'x': '8848',
            'y': 66282
          }
        ]
      }
    }
  },
  mixins: [dataControl],
  props: ['w', 'h', 'val'],
  data () {
    return {
      dynamicData: {}
    }
  },
  computed: {
    legends () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget]) {
        return this.dynamicData[this.val.keyPrimary][this.val.keyTarget].map(item => {
          return item[this.val.keyXAxis]
        })
      } else {
        return []
      }
    },
    dataSeries () {
      let seriesData = []

      if (this.dynamicData[this.val.keyPrimary]) {
        const origin = this.dynamicData[this.val.keyPrimary][this.val.keyTarget] || []
        const legends = this.legends

        for (let i in origin) {
          let item = {}
          item.type = this.val.polarType
          item.data = origin.map((value, index) => {
            if (index === Number(i)) {
              return value[this.val.keyYAxis]
            } else {
              return 0
            }
          })
          item.coordinateSystem = 'polar'
          item.name = legends[i]
          item.stack = 'a'

          seriesData[i] = item
        }
      }

      return seriesData
    },
    options () {
      return {
        angleAxis: {
          type: 'category',
          z: 1,
          axisLine: {
            show: false
          }
        },
        // color: this.val.colorArr,
        color: this.val.seriesColors,
        radiusAxis: {
          axisLine: { // 坐标 轴线
            show: this.val.showX, // 是否显示坐标轴轴线
            lineStyle: {
              color: this.val.xLineColor, // 颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
              type: 'solid', // 坐标轴线线的类型，solid，dashed，dotted
              width: this.val.xLineWidth // 坐标轴线线宽
            }
          },
          axisTick: { // 坐标轴刻度相关设置
            show: false
          },
          axisLabel: { // 坐标轴刻度标签的相关设置
            show: this.val.showXaxisTick, // 显示 X 轴刻度
            margin: 8,
            inside: false,
            rotate: this.val.xLabelRotate, // 刻度文字旋转角度
            formatter: function (value, index) { // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
              return value + ''
            },
            textStyle: {
              color: this.val.xTextColor, // X 轴文字颜色
              fontSize: this.val.xTextFontSize // X 轴文字大小
            }
          },
          max: function (value) {
            return Math.floor(value.max / 1)
          },
          splitLine: {
            show: this.val.showYSplitLine, // 是否显示分隔线
            interval: 'auto',
            lineStyle: {
              interval: 1,
              color: this.val.splitLineColor
            }
          },
          splitNumber: this.val.splitNumber,
          splitArea: {
            show: false
          }
        },
        polar: {
          center: ['50%', '50%'],
          radius: this.val.polarSize // 图表大小调整，如 70% / 200
        },
        series: this.dataSeries,
        legend: {
          show: this.val.legendShow, // 显示图例
          x: this.val.legendPositionX,
          y: this.val.legendPositionY,
          width: this.val.legendWidth,
          // height: this.val.lengendHeight,
          icon: this.val.legendIcon, // 图例图标
          itemWidth: parseInt(this.val.legendIconWidth), // 图里图标宽度
          itemHeight: parseInt(this.val.legendIconHeight), // 图里图标高度
          itemGap: parseInt(this.val.legendIconGap), // 图里图标间距
          textStyle: {
            color: this.val.legendTextColor,
            fontSize: this.val.legendFontSize
          },
          data: this.legends
        },
        tooltip: {
          trigger: 'axis'
        }
      }
    }
  },
  mounted () {
    if (this.$vpd.state.uuid === this.val.uuid) {
      let colors = this.$vpd.state.page.colors.value.slice(0, this.legends.length)
      let param = {
        name: 'seriesColors',
        value: colors
      }
      this.$vpd.commit('UPDATE_ACTIVE_ELEMENT', param)
    }
  }
}
</script>
