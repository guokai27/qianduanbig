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
    :data-h="val.top  + ',' + h"
    contenteditable="true">
    <v-echart
      :options="options"
      autoresize/>
  </div>
</template>

<script>
import stylec from './style.vue'
import echarts from 'echarts/lib/echarts'
import dataControl from '../../CommonModule/mixins/dataControl'

const WIDGET_NAME = 'CircularProgressBar'
export default {
  name: WIDGET_NAME,
  group: 'indicator',
  icon: require('./icon/thumb-progressBar.png'),
  title: '环形进度条',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 100,
    height: 100,
    left: 300,
    top: 50,
    z: 0,
    color: '#555555',
    name: '环形进度条', // 组件名称, 可自定义
    desc: '', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    chartTitle: '销量', // 图表标题
    textStyleColor: '#f7f7f7', // 文本颜色
    showTitle: true, // 显示文本
    titleColor: '#f7f7f7', // 标题颜色
    titleFontSize: 20,

    lgArr: [{ // 设置渐变颜色数组
      color: '#fc8700',
      offset: 0
    }, {
      color: '#ba3ba3',
      offset: 1
    }],
    seriesColors: [],
    seriesBgColor: '#1e1e1e',

    colorArr: ['#2c213d', '#fc8700'],
    isLinear: false, // 圆环是否渐变
    seriesRadius: ['78%', '90%'], // 圆环大小

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
    keyTarget: 'progress', // 响应数据对应的字段名
    keyXAxis: '', // 从该字段取x轴数据
    keyYAxis: '', // 从该字段取y轴数据

    staticData: {
      'code': 0,
      'data': {
        'progress': 80
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
      let colors = this.$vpd.state.page.colors.value.slice(0, 1)
      let param = {
        name: 'seriesColors',
        value: colors
      }
      this.$vpd.commit('UPDATE_ACTIVE_ELEMENT', param)
    }
  },
  computed: {
    progress () {
      if (this.dynamicData[this.val.keyPrimary] && this.dynamicData[this.val.keyPrimary][this.val.keyTarget]) {
        return this.dynamicData[this.val.keyPrimary][this.val.keyTarget]
      } else {
        return 0
      }
    },
    options () {
      return {
        title: {
          show: this.val.showTitle,
          text: this.progress + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: this.val.titleFontSize,
            color: this.val.titleColor,
            fontWeight: 'normal'
          }
        },
        color: this.val.seriesColors,
        series: [{
          name: '',
          type: 'pie',
          radius: this.val.seriesRadius,
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false
            }
          },
          data: [
            {
              value: this.progress,
              name: '',
              itemStyle: {
                normal: {
                  color: this.val.isLinear ? new echarts.graphic.LinearGradient(0, 0, 0, 1, this.val.lgArr) : this.val.seriesColors[0]
                }
              }
            },
            {
              value: 100 - this.progress,
              name: '',
              itemStyle: {
                normal: {
                  color: this.val.seriesBgColor
                }
              }
            }
          ]
        }]
      }
    }

  }
}
</script>
