<template>
  <div v-show="elm">
    <!-- 左 -->
    <div
      :style="{
        height: elm.height + 'px',
        top: elm.top + 'px',
        left: elm.left + 'px'
      }"
      class="verti"
      @mousedown="handlemousedown($event, 'left', 'left', 'width')">
      <div class="square"/>
    </div>

    <!-- 右 -->
    <div
      :style="{
        height: elm.height + 'px',
        top: elm.top + 'px',
        left: elm.left + elm.width + 'px'
      }"
      class="verti"
      @mousedown="handlemousedown($event, 'right', 'width')">
      <div class="square"/>
    </div>

    <!-- 上 -->
    <div
      :style="{
        width: elm.width + 'px',
        top: elm.top + 'px',
        left: elm.left + 'px'
      }"
      class="horiz"
      @mousedown="handlemousedown($event, 'up', 'top', 'height')">
      <div class="square"/>
    </div>

    <!-- 下 -->
    <div
      :style="{
        width: elm.width + 'px',
        top: elm.top + elm.height + 'px',
        left: elm.left + 'px'
      }"
      class="horiz"
      @mousedown="handlemousedown($event, 'down', 'height')">
      <div class="square"/>
    </div>

    <!-- 左上 -->
    <div
      :style="{
        width: elm.width + 'px',
        top: elm.top + 'px',
        left: elm.left - (elm.width / 2)  + 'px'
      }"
      class="slope"
      @mousedown="handlemousedown($event, 'upLeft', 'width', 'height')">
      <div class="square"/>
    </div>

    <!-- 右上 -->
    <div
      :style="{
        width: elm.width + 'px',
        top: elm.top + 'px',
        left: elm.left + (elm.width / 2)  + 'px'
      }"
      class="slant"
      @mousedown="handlemousedown($event, 'upRight', 'width', 'height')">
      <div class="square"/>
    </div>

    <!-- 左下 -->
    <div
      :style="{
        width: elm.width + 'px',
        top: elm.top + elm.height + 'px',
        left: elm.left - (elm.width / 2)  + 'px'
      }"
      class="slant"
      @mousedown="handlemousedown($event, 'downLeft', 'width', 'height')">
      <div class="square"/>
    </div>

    <!-- 右下 -->
    <div
      :style="{
        width: elm.width + 'px',
        top: elm.top + elm.height + 'px',
        left: elm.left + (elm.width / 2)  + 'px'
      }"
      class="slope"
      @mousedown="handlemousedown($event, 'downRight', 'width', 'height')">
      <div class="square"/>
    </div>
  </div>
</template>

<script>
import vpd from '../../mixins/vpd'

export default {
  mixins: [vpd],
  data () {
    return {
      type: '' // 调整方向 left | right | up | down | upLeft | upRight | downLeft | downRight
    }
  },
  computed: {
    elm () {
      var target = this.$vpd.state.activeElement

      if (!target.resizable || target.belong !== 'page') return ''

      return target
    }
  },

  methods: {
    handlemousedown (e, type, originX, originY) {
      e.stopPropagation()
      this.type = type
      this.$vpd.commit('INIT_MOVE', {
        startX: e.pageX,
        startY: e.pageY,
        originX: this.elm[originX],
        originY: this.elm[originY],
        originTop: this.elm['top'],
        originLeft: this.elm['left']
      })

      document.addEventListener('mousemove', this.handlemousemove, true)
      document.addEventListener('mouseup', this.handlemouseup, true)
    },

    handlemousemove (e) {
      e.stopPropagation()
      e.preventDefault()

      this.$vpd.commit('RESIZE_WIDGET', {
        x: e.pageX,
        y: e.pageY,
        type: this.type
      })
    },

    handlemouseup () {
      document.removeEventListener('mousemove', this.handlemousemove, true)
      document.removeEventListener('mouseup', this.handlemouseup, true)
      this.$vpd.commit('STOP_MOVE')
    }
  }
}
</script>

<style scoped>
.verti,
.horiz,
.slope,
.slant {
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.verti {
  width: 0;
  cursor: ew-resize;
}
.horiz {
  height: 0;
  cursor: ns-resize;
}
.slope {
  height: 0;
  cursor: se-resize;
}
.slant {
  height: 0;
  cursor: ne-resize;
}
.square {
  width: 6px;
  height: 6px;
  border: 1px solid #2196f3;
  background-color: #fff;
  flex-shrink: 0;
}
</style>
