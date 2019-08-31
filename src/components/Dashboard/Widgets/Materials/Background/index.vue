<template>
  <img
    width="100%"
    :src="val.url">
</template>

<script>
const WIDGET_NAME = 'braid-bg'

export default {
  name: WIDGET_NAME,
  group: 'material',
  icon: require('./icon/thumb-bg.png'),
  title: '背景图',
  panel: null,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    hasGuide: false,
    isUpload: true,
    isChild: false,
    dragable: false,
    resizable: false,
    href: '',
    belong: 'page'
  },
  props: [
    'val' // 图片对象
  ]
}
</script>
