<template>
  <div
    class="txt"
    v-html="val.text"
    contenteditable="false"
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
      letterSpacing: val.fontSpacing + 'px',
      color: val.color,
      textAlign: val.textAlign,
      fontWeight: val.fontWeight ? 'bold': 'normal'
    }">
  </div>
</template>

<script>
import stylec from './style.vue'

const WIDGET_NAME = 'BasicTxtBox'

export default {
  name: WIDGET_NAME,
  group: 'text',
  icon: require('./icon/thumb-text.png'),
  title: '文本框',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 250,
    height: 60,
    left: 400,
    top: 400,
    z: 0,
    lineHeight: 1.6,
    fontSize: 20,
    fontFamily: 'Microsoft YaHei',
    fontWeight: false,
    fontSpacing: 0,
    color: '#000000',
    textAlign: 'center',
    text: '文本',
    name: '文本框', // 组件名称, 可自定义
    desc: '', // 描述, 可自定义
    href: '',
    belong: 'page',
    animationName: ''
  },
  // 属性含义参照 widgets/pic/index.vue
  props: ['val', 'h', 'w']
}
</script>

<style scoped>
  .txt {
    outline: none;
    font-size: 28px;
  }
</style>
