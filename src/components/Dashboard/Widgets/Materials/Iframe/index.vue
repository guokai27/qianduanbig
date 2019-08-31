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
    }"
    class="">
    <div class="lay-cont"></div>
    <iframe
      :src="val.url"
      class="left-panel-cont"
      width="100%"
      height="100%"
      frameborder=0
      name="showHere"
      scrolling=auto></iframe>
  </div>
</template>

<script>
import stylec from './style.vue'
const WIDGET_NAME = 'braidIframe'

export default {
  name: WIDGET_NAME,
  group: 'material',
  icon: require('./icon/thumb-iframe.png'),
  title: 'iframe',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    hasGuide: true,
    isUpload: false,
    isChild: false,
    dragable: true,
    resizable: true,
    name: 'iframe',
    desc: '内嵌网页', // 描述, 可自定义
    width: 350,
    height: 300,
    left: 50,
    top: 0,
    z: 0,
    belong: 'page',
    animationName: '',

    url: 'https://www.baidu.com/'

  },
  props: ['w', 'h', 'val'],
  watch: {
    'val.bgType': function (newVal, oldVal) {
      console.log(this.val.bgType)
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
</style>
