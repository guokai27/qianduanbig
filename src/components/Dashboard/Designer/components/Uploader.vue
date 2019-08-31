<template>
  <input
    id="uploader"
    :multiple="multiple ? 'multiple' : false"
    type="file"
    name="image"
    accept="image/png, image/jpeg, image/gif"
    style="display: none"
    @change="handleUpload">
</template>

<script>
import vpd from '../mixins/vpd'
export default {
  name: 'VpdUploader',
  mixins: [vpd],
  props: {
    upload: Function,
    uploadOption: Object
  },
  data () {
    return {
      multiple: false, // 是否允许上传多张
      uploader: null, // input file
      cb: null // 回调函数
    }
  },

  computed: {
    // 图片初始位置纵坐标
    top () {
      return this.$vpd.state.top
    }
  },

  mounted () {
    this.uploader = document.getElementById('uploader')

    /**
     * 在全局通信中介上注册上传图片自定义事件
     * 所有需要上传图片的地方均可调用
     *
     * 调用方法：
     * this.$vpd.$emit('upload', function (payload) {/.../})
     * @param payload { Array } 图片上传、下载完成后的一个包含所有图片对象的数组
     * @param multiple { Boolean } 是否上传多张，默认为 false
     */
    this.$vpd.$on('upload', (cb, multiple) => {
      this.multiple = !!multiple
      this.cb = cb
      setTimeout(() => {
        this.uploader.click()
      }, 0)
    })
  },
  beforeDestroy () {
    this.$vpd.$off('upload')
  },
  methods: {
    // 处理添加图片操作，触发事件：change
    handleUpload () {
      var files = this.uploader.files

      if (!files || files.length === 0) return

      files = Array.prototype.slice.call(this.uploader.files)

      let uploadFn = this.defaultUpload

      uploadFn(files).then(res => {
        if (!res.ok) {
          return
        }
        res.text().then((data) => {
          var pData = JSON.parse(data)

          // 图片下载队列完成后执行回调
          new Promise(resolve => {
            const imgUrl = process.env.BASE_API + pData.imgUrl
            this.handleLoadQueue(resolve, imgUrl)()
          }).then(payload => {
            this.cb(payload)
          })
        })
      })
    },

    defaultUpload (files) {
      if (this.uploadOption.url) {
        var data = new FormData()
        files.forEach(file => data.append('file', file))
        console.log(files)
        return fetch(this.uploadOption.url, {
          method: 'POST',
          body: data
        })
      } else {
        alert('请配置图片上传api地址')
      }
    },

    /**
     * 处理下载队列
     * 图片按顺序下载完一张再下载下一张，以确保图片数组按上传的顺序排列
     */
    handleLoadQueue (resolve, url) {
      var payload = []

      var download = () => {
        new Promise(resolve => {
          this.getImageWidth(url, resolve)
        }).then(size => {
          payload.push({
            width: size.w,
            height: size.h,
            top: this.top,
            url: url, // 图片预览地址
            src: url // 图片实际地址
          })

          // 所有图片下载完毕，跳到下一步，否则继续下载
          resolve(payload)
        })
      }

      return download
    },

    /**
     * 使用 new Image 预加载的方式获取图片宽高
     * 这是一个异步操作，须采用 promise
     *
     * @param url { URL | base64 } 图片 url
     * @param res { Promise resolve }
     *
     * @return { Object } 包含图片宽高的对象
     */
    getImageWidth (url, res) {
      var img = new Image()
      img.src = url
      img.onload = function () {
        res({
          w: Math.round(img.width),
          h: Math.round(img.height)
        })
      }
    }
  }
}
</script>
