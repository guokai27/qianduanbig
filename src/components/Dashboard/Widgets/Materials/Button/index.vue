<template>
  <button
    :style="{
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      color: val.color,
      backgroundColor: val.bgColor,
      fontSize: val.fontSize + 'px',
      borderRadius: val.borderRadius + 'px',
      fontFamily: val.fontFamily,
      fontWeight: val.fontWeight ? 'bold': 'normal'
    }"
    @mouseover="mouseOver($event)"
    @mouseleave="mouseLeave($event)"
    contenteditable="true"
    class="widget-btn"
    v-html="val.text"/>
</template>

<script>
import stylec from './style.vue'

const WIDGET_NAME = 'BraidButton'

export default {
  name: WIDGET_NAME,
  group: 'material',
  icon: require('./icon/thumb-button.png'),
  title: '按钮',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 150,
    height: 40,
    left: 400,
    top: 400,
    z: 0,
    fontSize: 14,
    isHover: false,
    bgColor: '#42b983',
    bgColorHover: '#42b983',
    color: '#ffffff',
    colorHover: '#ffffff',
    borderRadius: 4,
    name: '按钮', // 组件名称, 可自定义
    desc: '普通按钮', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    fontFamily: 'Microsoft YaHei',
    fontWeight: false,

    text: '提交'
  },
  props: ['w', 'h', 'val'],
  methods: {
    mouseOver (e) {
      // let param = {
      //   name: 'isHover',
      //   value: true
      // }
      // this.$vpd.commit('updataData', param)
    },
    mouseLeave (e) {
      // let param = {
      //   name: 'isHover',
      //   value: false
      // }
      // this.$vpd.commit('updateData', param)
    }
  }
}
</script>

<style scoped>
.lz-container {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
  .widget-btn{
    outline: none;
    border: none;
    cursor: pointer;
  }
</style>
