<template>
  <div
    class="txt"
    v-html="timeStr"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      left: val.belong === 'page' ? val.left / w * 100 + '%' : '0',
      top: val.belong === 'page' ? val.top / h * 100 + '%' : '0',
      width: val.width / w * 100 + '%',
      minHeight: val.height / h * 100 + '%',
      zIndex: val.z,
      lineHeight: val.height + 'px',
      fontSize: val.fontSize + 'px',
      fontFamily: val.fontFamily,
      color: val.color,
      textAlign: val.textAlign,
      fontWeight: val.fontWeight ? 'bold': 'normal',
      letterSpacing: val.fontSpacing + 'px'
    }">
  </div>
</template>

<script>
import stylec from './style.vue'

const WIDGET_NAME = 'BasicRTClock'

export default {
  name: WIDGET_NAME,
  group: 'text',
  icon: require('./icon/thumb-time.png'),
  title: '实时时间',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 350,
    height: 60,
    left: 400,
    top: 400,
    z: 0,
    name: '实时时间',
    belong: 'page',
    animationName: '',

    lineHeight: 1.6,
    fontSize: 20,
    fontFamily: 'Microsoft YaHei',
    fontWeight: false,
    color: '#000000',
    textAlign: 'center',
    href: '',

    fontSpacing: 0,
    timeType: 'y-m-d-h-m-s'
  },
  props: ['val', 'h', 'w'],
  data () {
    return {
      timeStr: ''
    }
  },
  mounted () {
    let _this = this
    this.timer = setInterval(function () { _this.timeStr = _this.dateFormat() })
  },
  beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    dateFormat: function () {
      var date = new Date()
      var year = date.getFullYear()
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      // 拼接
      let str = ''
      switch (this.val.timeType) {
        case 'y-m-d':
          str = year + '-' + month + '-' + day
          break
        case 'y-m-d-h-m-s':
          str = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
          break
        default:
          str = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
      }
      return str
    }
  }
}
</script>

<style scoped>
  .txt {
    outline: none;
    font-size: 28px;
  }
</style>
