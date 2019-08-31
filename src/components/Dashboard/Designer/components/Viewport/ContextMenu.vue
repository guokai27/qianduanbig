<template>
  <div class="right-menu" :style="style"  v-show="show"
    @mousedown.stop
    @contextmenu.prevent
  >
    <a href="javascript:;" @click="handleCopy">复制</a>
    <a href="javascript:;" @click="HandleDelete">删除</a>
  </div>
</template>

<script>
import vpd from '../../mixins/vpd'
export default {
  name: 'context-menu',
  mixins: [vpd],
  data () {
    return {
      triggerShowFn: () => {},
      triggerHideFn: () => {},
      x: null,
      y: null,
      style: {},
      show: false,
      target: null
    }
  },
  mounted () {
    this.bindEvents()
    this.bindHideEvents()
  },
  beforeDestroy () {
    this.unbindEvents()
    this.unbindHideEvents()
  },
  watch: {
    show (show) {
      if (show) {
        this.bindHideEvents()
      } else {
        this.unbindHideEvents()
      }
    },
    target (target) {
      this.bindEvents()
    }
  },
  methods: {
    HandleDelete () {
      this.$vpd.commit('DELETE_WIDGET')
      this.show = false
    },
    handleCopy () {
      this.$vpd.commit('COPY_WIDGET')
      this.show = false
    },
    // 初始化事件
    bindEvents () {
      if (!this.target) return
      this.triggerShowFn = this.contextMenuHandler.bind(this)
      this.target.addEventListener('contextmenu', this.triggerShowFn)
    },
    // 取消绑定事件
    unbindEvents () {
      if (!this.target) return
      this.target.removeEventListener('contextmenu', this.triggerShowFn)
    },
    // 绑定隐藏菜单事件
    bindHideEvents () {
      this.triggerHideFn = this.clickDocumentHandler.bind(this)
      document.addEventListener('mousedown', this.triggerHideFn)
      document.addEventListener('mousewheel', this.triggerHideFn)
    },
    // 取消绑定隐藏菜单事件
    unbindHideEvents () {
      if (!this.target) return
      this.target.removeEventListener('mousedown', this.triggerHideFn)
      this.target.removeEventListener('mousewheel', this.triggerHideFn)
    },
    // 鼠标点击事件处理器
    clickDocumentHandler (e) {
      if (!this.target) {
        this.target = document.getElementById('viewport')
      }

      this.show = false
    },
    // 右键事件事件处理
    contextMenuHandler (e) {
      this.x = e.pageX
      this.y = e.pageY

      // 选中组件时显示右键菜单
      if (this.$vpd.state.type !== 'page' || this.$vpd.state.multiSelect) {
        this.show = true
        this.layout()
      }
      e.preventDefault()
    },
    // 布局
    layout () {
      this.style = {
        left: this.x + 'px',
        top: this.y + 'px'
      }
    }
  }
}
</script>

<style scoped>
.right-menu {
  position: fixed;
  border-radius: 3px;
  z-index: 999;
  display: block;
  background: #27343e;
  color: #bcc9d4;
}
.right-menu a {
  width: 75px;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  text-align: center;
  display: block;
  /*color: #1a1a1a;*/
}
.right-menu a:hover {
  background: #eee;
  color: #fff;
}

.right-menu {
  box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1);
  border-radius: 1px;
}
.right-menu a {
  padding: 2px;
}
.right-menu a:hover {
  background-color: #1d262e;
  color: #00baff;
}
</style>
