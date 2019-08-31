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
      :options="options"
      autoresize
      class="ffff"/>
  </div>
</template>

<script>
import stylec from './style.vue'
// import echarts from 'echarts/lib/echarts'
import dataControl from '../../CommonModule/mixins/dataControl'

const WIDGET_NAME = 'RadarChart'
export default {
  name: WIDGET_NAME,
  group: 'chart',
  icon: require('./icon/thumb-radarchart.png'),
  title: '雷达图',
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
    color: '#555555',
    name: '雷达图', // 组件名称, 可自定义
    desc: '', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    chartTitle: '', // 图表标题
    textStyleColor: '#666666', // 文本颜色

    lgArr: ['rgba(39, 214, 227, 1)', 'rgba(70, 227, 39, 1)', 'rgba(239, 249, 43, 1)'],

    legendShow: true, // 显示图例
    legendWidth: '80%', // 图例宽度
    legendHeight: '100', // 图例高度
    legendPositionX: 'center', // 图例位置（X 轴）
    legendPositionY: 'top', // 图例位置（Y 轴）
    legendFontSize: 12, // 图例文字大小
    legendTextColor: '#f7f7f7', // 图例文字颜色
    legendIcon: 'roundRect', // 图例 Icon 如 circle, rect, line, roundRect, triangle, diamond, pin, none
    legendIconWidth: 20, // 图例 Icon 宽度
    legendIconHeight: 10, // 图例 Icon 高度
    legendIconGap: 10, // 图例 Icon 间距

    seriesAreaStyleBgColor: 'rgba(255, 255, 255, 0.1)',
    seriesTextColor: '#666666',
    seriesLineColor: 'rgba(255, 255, 255, 0.6)',
    seriesLineWidth: [2, 2, 2], // 折线宽度
    showTooltip: false, // 是否显示提示框
    seriesColors: [],

    legend: [],

    dataAPI: 'https://easy-mock.com/mock/5c7ce20ccdc04f0e04185d9b/example/mock_copy_1560491079589/charts-radar', // API拉取地址
    dataAutoRefresh: false, // 是否自动刷新
    dataOrigin: 'local', // local 本地 api 远程接口
    dataRefreshTime: 5, // 自动刷新间隔（秒）
    dataRefresh: false, // 刷新图表, 控制面板中测试dataApi使用

    // 数据联动配置
    linkEnable: false, // 开启联动
    linkIsMain: false, // 是否是数据源
    linkMainUUID: '', // 上级的UUID, 通过此标志获取联动的数据

    keyPrimary: 'data',
    keyTarget: 'dataseries', // 响应数据对应的字段名
    keyXAxis: 'categories', // 从该字段取x轴数据
    keyYAxis: 'statistics', // 从该字段取y轴数据

    csvHash: '', // 选择的 csv 数据hash值 (通过该值获取表头信息)
    csvSeries: '', // 分组标签
    csvNum: [], // 取值标签 (堆叠图为数组)
    csvHeader: [], // 选中的表头关系
    csvGroup: 'multiple', // 组件分组(csv数据请求接口类型single/multiple/table/map)

    dataLength: 3, // 数据共有几项
    staticData: {
      'code': 0,
      'data': {
        'year': 2019,
        'dataseries': {
          'categories': ['A', 'B', 'C', 'D', 'E', 'F'],
          'statistics': [
            {
              name: '视频广告',
              data: [4500, 3400, 2800, 5100, 2200, 3000]
            },
            {
              name: '手机访问',
              data: [3780, 3012, 2060, 4054, 2090, 2205]
            },
            {
              name: '直接访问',
              data: [3000, 2300, 1090, 2000, 1000, 1500]
            }
          ]
        }
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
  mounted () {
    if (this.$vpd.state.uuid === this.val.uuid) {
      let colors = this.$vpd.state.page.colors.value.slice(0, this.legend.length)
      let param = {
        name: 'seriesColors',
        value: colors
      }
      this.$vpd.commit('UPDATE_ACTIVE_ELEMENT', param)
    }
  },
  computed: {
    categories () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyXAxis]) {
        let arr = this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyXAxis]
        return arr.map(item => {
          return { text: item }
        })
      } else {
        return []
      }
    },
    dataSeries () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyYAxis]) {
        const orign = this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyYAxis]
        if (this.$vpd.state.uuid === this.val.uuid) {
          let datalen = orign.length
          if (datalen > this.val.seriesColors.length) {
            let param = [
              {
                name: 'seriesColors',
                value: '#f94f2b'
              },
              {
                name: 'seriesLineWidth',
                value: 2
              }
            ]
            this.$vpd.commit('UPDATE_DATAS_ADD', param)
          } else if (datalen < this.val.seriesColors.length) {
            let paramDel = {
              name: ['seriesLineWidth', 'seriesColors'],
              value: datalen
            }
            this.$vpd.commit('UPDATE_DATAS_DEL', paramDel)
          }
          this.$vpd.commit('UPDATE_ACTIVE_ELEMENT', {
            name: 'dataLength',
            value: datalen
          })
        }

        return orign.map((item, i) => {
          let serieItem = {
            type: 'radar',
            data: [{
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: this.val.seriesLineWidth[i], // 折线宽度
                    type: 'solid', // 折线样式
                    color: this.val.seriesColors[i] // 折线颜色
                  }
                }
              },
              areaStyle: {
                show: false,
                normal: {
                  color: this.val.seriesColors[i] // 折线区域渐变色
                }
              },
              name: item.name,
              value: item.data
            }]
          }
          return serieItem
        })
      } else {
        return []
      }
    },
    legend () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyYAxis]) {
        // if (this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyYAxis]) {
        const orign = this.dynamicData[this.val.keyPrimary][this.val.keyTarget][this.val.keyYAxis]
        return orign.map(item => {
          return item.name
        })
      } else {
        return []
      }
    },
    options () {
      return {
        title: {
          text: this.val.chartTitle, // 图表标题
          textStyle: {
            color: this.val.titleColor
          }
        },
        color: this.val.seriesColors,
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
          data: this.legend
        },
        radar: {
          shape: '', // 雷达图形状
          splitNumber: 5, // 雷达图圈数
          name: {
            textStyle: {
              color: this.val.seriesTextColor // 文本颜色
            }
          },
          axisLine: { // 中间射线的颜色
            lineStyle: {
              color: this.val.seriesLineColor
            }
          },
          splitArea: {
            areaStyle: {
              color: this.val.seriesAreaStyleBgColor
            }
          },
          splitLine: {
            lineStyle: {
              width: 1,
              color: this.val.seriesLineColor
            }
          },
          indicator: this.categories
        },
        tooltip: {
          show: this.val.showTooltip, // 是否显示提示框
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: this.val.axisReverse ? this.yAxis : this.xAxis,
        yAxis: this.val.axisReverse ? this.xAxis : this.yAxis,
        series: this.dataSeries
      }
    }
  }
}
</script>
