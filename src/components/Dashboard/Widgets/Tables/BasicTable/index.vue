<template>
  <div
    :style="{
      display: val.display,
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      fontSize: val.fontSize,
      background: val.bgColor,
      borderStyle: 'solid',
      borderRadius: val.radius + 'px',
      borderColor: val.borderColor,
      borderWidth: val.borderWidth + 'px',
      flexDirection: val.dir,
      justifyContent: val.justify,
      alignItems: val.align
    }"
    class="table">
    <div class="lay-cont"></div>
    <div
      class="table-title table-tr"
      :style="{
        height: val.showTh ? val.thHeight + 'px' : '0px',
        textAlign: val.tbAlign
      }">
      <div
        v-show="val.showTh && val.showNum"
        class="table-th"
        :style="{
        color: val.thColor,
        fontSize: val.thFontSize + 'px',
        background: val.thBgColor,
        display: val.showTh ? 'flex' : 'none',
        flex: val.showNum ? 1 : 0
        }">{{val.thNumText}}</div>
      <div
        v-for="(item, index) in dynamicData.data.columns"
        :key="item.id"
        class="table-th"
        :style="{
          color: val.thColor,
          fontSize: val.thFontSize + 'px',
          background: val.thBgColor,
          display: val.showTh ? 'flex' : 'none',
          flex: val.tbPercent[index],
          borderRight: index === dynamicData.data.columns.length-1 ? '' : val.tbBorderRgiht
        }"><span>{{item.name}}</span></div>
    </div>

    <!-- 表身 -->
    <div
      :style="{
        height: val.showTh ? val.height - val.thHeight + 'px' : val.height + 'px'
      }"
      class="table-body">
      <!-- 表内容块 -->
      <div
        v-for="(item, index) in dynamicData.data.rows.slice(0, val.dataLength)"
        :key="item.id"
        class="table-tr" >
        <div
          v-show="val.showNum"
          class="table-td table-td-num">
          <span
            :style="{
            width: val.thNumWidth + 'px',
            height: val.thNumWidth + 'px',
            color: val.thNumColor,
            fontSize: val.thNumFontSize + 'px',
            lineHeight: val.thNumWidth + 'px',
            borderRadius: val.thNumWidth / 2 + 'px',
            backgroundColor: val.thNumType === 'none' ? '' : (val.seriesColors[index] || val.seriesColors[val.seriesColors.length-1])
          }">{{index + 1}}</span>
        </div>
        <div
          v-for="(value, key, index) in item"
          :key="item[value]"
          :style="{
          color: val.tbColor,
          fontSize: val.tbFontSize + 'px',
          flex: val.tbPercent[index],
          textAlign: val.tbAlign,
          borderRight: value === dynamicData.data.columns.length-1 ? '' : val.tbBorderRgiht
          }"
          class="table-td"><span>{{item[key]}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import stylec from './style.vue'
import dataControl from '../../CommonModule/mixins/dataControl'
const WIDGET_NAME = 'BasicTable'

export default {
  name: WIDGET_NAME,
  group: 'table',
  icon: require('./icon/thumb-table.png'),
  title: '表格',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    hasGuide: true,
    isUpload: false,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 450,
    height: 260,
    left: 100,
    top: 20,
    z: 0,
    name: '表格', // 组件名称, 可自定义
    desc: '', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    display: 'block',
    bgColor: '',
    backPic: '',
    backPicUrl: '',
    radius: 0,
    borderColor: '#2c213d',
    borderWidth: 0,
    dir: 'row',
    justify: 'flex-start',
    align: 'flex-start',
    fontSize: '14px',

    seriesColors: [],

    showTh: true, // 是否显示表头
    thHeight: 40, // 表头高度
    thFontSize: 12, // 表头文本大小
    thBgColor: '#eeeeee', // 表头背景色
    thColor: '#f7f7f7', // 表头文本颜色

    showNum: true, // 是否添加序号
    thNumText: '序号', // 序号显示文字
    thNumColor: '#ffffff', // 序号文本颜色
    thNumFontSize: 12, // 序号文本字体大小
    thNumWidth: 30, // 序号圆大小
    thNumType: 'circle', // 序号样式 none:无样式，circle: 圆形
    thNumBg: ['#42b983', '#c03639', '#2196f3'], // 序号背景色

    tbColor: '#f7f7f7', // 表格文本颜色
    tbFontSize: 12, // 表格文本字体大小
    tbAlign: 'left', // 表格对齐方式
    tbBorderRgiht: '',
    // tbPercent: '1, 1, 1, 1', // 个列比例
    tbPercent: [1, 1, 1, 1], // 个列比例
    dataLength: 4, // 表格行数

    dataAPI: 'https://easy-mock.com/mock/5c7ce20ccdc04f0e04185d9b/example/echart/basictable', // API拉取地址
    dataAutoRefresh: false, // 是否自动刷新
    dataOrigin: 'local', // local 本地 api 远程接口(api/local/csv)
    dataRefreshTime: 5, // 自动刷新间隔（秒）
    dataRefresh: false, // 刷新图表, 控制面板中测试dataApi使用

    // 数据联动配置
    linkEnable: false, // 开启联动
    linkIsMain: false, // 是否是数据源
    linkMainUUID: '', // 上级的UUID, 通过此标志获取联动的数据

    keyPrimary: 'data',
    keyTarget: 'rows', // 响应数据对应的字段名
    keyXAxis: 'x', // 从该字段取x轴数据
    keyYAxis: 'y', // 从该字段取y轴数据

    csvHash: '', // 选择的 csv 数据hash值 (通过该值获取表头信息)
    csvSeries: [], // 分组标签
    // csvNum: [], // 取值标签 (堆叠图为数组)
    csvHeader: [], // 选中的表头关系
    csvGroup: 'table', // 组件分组(csv数据请求接口类型single/multiple/table/map)

    staticData: {
      'code': 0,
      'data': {
        'columns': [
          {
            'id': 'area',
            'name': '区域'
          },
          {
            'id': 'lastMonth',
            'name': '上月业绩'
          },
          {
            'id': 'thisMonth',
            'name': '本月业绩'
          },
          {
            'id': 'diff',
            'name': '增长业绩'
          }
        ],
        'rows': [
          {
            'area': '吉林',
            'lastMonth': 4922913,
            'thisMonth': 9997721,
            'diff': 5074808
          },
          {
            'area': '内蒙古',
            'lastMonth': 1222913,
            'thisMonth': 9567721,
            'diff': 3474808
          },
          {
            'area': '云南',
            'lastMonth': 3222913,
            'thisMonth': 6597721,
            'diff': 5674808
          },
          {
            'area': '广西',
            'lastMonth': 3452913,
            'thisMonth': 6787721,
            'diff': 3904808
          },
          {
            'area': '广东',
            'lastMonth': 3452913,
            'thisMonth': 6787721,
            'diff': 3904808
          },
          {
            'area': '湖南',
            'lastMonth': 3222913,
            'thisMonth': 6597721,
            'diff': 5674808
          },
          {
            'area': '乌鲁木齐',
            'lastMonth': 3222913,
            'thisMonth': 6597721,
            'diff': 5674808
          }
        ]
      }
    }
  },
  mixins: [dataControl],
  props: ['w', 'h', 'val'],
  data () {
    return {
      color: '',
      timer: null,
      dynamicData: {}
    }
  },
  watch: {
    dynamicData () {
      let dataLength = this.dynamicData.data.rows.length
      let tbPercent = this.dynamicData.data.columns.length
      let newarr = new Array(tbPercent)
      for (let i = 0; i < tbPercent; i++) {
        newarr[i] = 1
      }
      let params = [
        {
          name: 'dataLength',
          value: dataLength
        },
        {
          name: 'tbPercent',
          value: newarr
        }
      ]
      this.$vpd.commit('UPDATE_DATAS', params)
    }
  },
  mounted () {
    if (this.$vpd.state.uuid === this.val.uuid) {
      let colors = this.$vpd.state.page.colors.value.slice(0, this.val.dataLength)
      let param = {
        name: 'seriesColors',
        value: colors
      }
      this.$vpd.commit('UPDATE_ACTIVE_ELEMENT', param)
      this.$vpd.commit('UPDATE_ACTIVE_ELEMENT', { name: 'thBgColor', value: colors[0] })
    }
  }
}
</script>

<style scoped>
  .table{
    margin: 0 auto;
  }
  .table-title .table-tr{
    height:100%;
  }
  .table-tr{
    display: flex;
    flex: 1;
    flex-direction: row;
    overflow: hidden;
    border-top:0;
  }
  .table-title{
    width: 100% ;
  }
  .table-body{
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .table-th, .table-td {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex:1;
    height:100%;
    width:0;
  }
  .table-td:last-child{
    border-right:0 !important;
  }
  .table-td-num{
    flex: 1;
  }
  .table-td-num span{
    display: block;
    text-align: center;
    line-height: 36px;
    color:#ffffff;
  }
  .table-th span, .table-td span{
    width: 90%;
    display: block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
