<template>
  <div
    :style="{
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      fontSize: val.fontSize + 'px',
      backgroundColor: val.bgColor,
      color: val.color
    }">
    <div class="lay-cont"></div>
    <div
      :style="{
        width: val.width / w * 100 + 'em',
        height: val.width / w * 100 + 'em'
      }"
      class="loader">

      <div class="face" :class="[val.reverse ? 'anti' : 'clockwise']">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import stylec from './style.vue'

const WIDGET_NAME = 'RotateLine'
export default {
  name: WIDGET_NAME,
  group: 'effect',
  icon: require('./icon/rotate-line.png'),
  title: '光圈',
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 200,
    height: 200,
    left: 400,
    top: 400,
    z: 0,
    color: '#ff8000',
    name: '光圈', // 组件名称, 可自定义
    desc: '', // 描述, 可自定义
    belong: 'page',
    animationName: '',

    reverse: false,
    fontSize: 18
  },
  props: ['w', 'h', 'val'],
  data () {
    return {
    }
  },
  computed: {
    rotate () {
      return this.reverse ? this.anti : this.clockwise
    }
  }
}
</script>

<style scoped>
.loader {
    /* width: 20em; */
    /* height: 20em; */
    /* font-size: 10px; */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.clockwise {
    border-color: currentColor transparent transparent currentColor;
    border-width: 0.2em 0.2em 0em 0em;
    --deg: -45deg;
    animation: animate 3s linear infinite;
    animation-direction: normal;
}

.anti {
    border-color: currentColor currentColor transparent transparent;
    border-width: 0.2em 0em 0em 0.2em;
    --deg: -135deg;
    animation: animate 3s linear infinite;
    animation-direction: reverse;
}

.face {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    border-style: solid;
}

.face .circle {
    position: absolute;
    width: 50%;
    height: 0.1em;
    top: 50%;
    left: 50%;
    background-color: transparent;
    transform: rotate(var(--deg));
    transform-origin: left;
}

.face .circle::before {
    position: absolute;
    top: -0.5em;
    right: -0.5em;
    content: '';
    width: 0.6em;
    height: 0.6em;
    background-color: currentColor;
    border-radius: 50%;
    box-shadow: 0 0 1em,
                0 0 2em,
                0 0 3em,
                0 0 4em,
                0 0 5em,
                0 0 0 0.3em rgba(255, 255, 0, 0.1);
}

@keyframes animate {
  to {
      transform: rotate(1turn);
  }
}
</style>
