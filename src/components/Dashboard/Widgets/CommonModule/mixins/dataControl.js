import axios from 'axios'
let Base64 = require('js-base64').Base64
export default {
  data () {
    return {
      timer: null,
      materialList: null,
      type: { // 对应api地址中的type值
        single: 'uuid1',
        multiple: 'uuid6',
        table: 'uuid9',
        map: 'uuid5'
      }
    }
  },
  computed: {
    linkage () {
      return this.$vpd.state.linkage[this.val.linkMainUUID] || null
    }
  },
  beforeMount () {
    this.setOptionData()
  },
  beforeDestroy () {
    this.clearTimer()
  },
  watch: {
    'val.dataOrigin': function () {
      this.setOptionData()
    },
    'val.dataAutoRefresh': function () {
      this.setOptionData()
    },
    'val.dataRefresh': function () {
      this.setOptionData()
    },
    '$vpd.state.linkage': function () {
      if (this.val.linkEnable && !this.val.linkIsMain) {
        this.applyLinkage()
      }
    },
    'val.linkIsMain': function (n, o) {
      if (n) {
        this.$vpd.commit('UPDATE_LINKAGE', { uuid: this.val.uuid, value: this.dynamicData })
      }
    },
    'dynamicData': function (newValue, o) {
      if (this.val.linkEnable && this.val.linkIsMain) {
        this.$vpd.commit('UPDATE_LINKAGE', { uuid: this.val.uuid, value: newValue })
      }
    },
    'val.staticData': function (newValue, o) {
      if (this.val.dataOrigin === 'local') {
        this.dynamicData = newValue
      }
    },
    'val.csvSeries': function (newValue) {
      if (!this.checkChose()) {
        return false
      }
      this.getCsvOptionData()
    },
    'val.csvNum': function (newValue) {
      if (!this.checkChose()) {
        return false
      }
      this.getCsvOptionData()
    }
  },
  methods: {
    setOptionData () { // API 拉取数据
      if (this.val.linkEnable && !this.val.linkIsMain) {
        this.applyLinkage()
        return
      }

      if (this.val.dataOrigin === 'local') {
        this.dynamicData = this.val.staticData
        return
      }

      if (this.val.dataOrigin === 'api') {
        axios({
          type: 'get',
          headers: { 'Content-Type': 'application/json' },
          url: this.val.dataAPI
        }).then(response => {
          if (response.data.code === 0) {
            this.dynamicData = response.data
          }
        })
      }

      if (this.val.dataOrigin === 'csv') {
        this.getCsvOptionData()
      }
      this.clearTimer()
      if (this.val.dataAutoRefresh) {
        let _this = this
        this.timer = setTimeout(() => { _this.setOptionData() }, _this.val.dataRefreshTime * 1000)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    applyLinkage () {
      const linkage = this.$vpd.state.linkage
      if (this.val.linkMainUUID !== '' && linkage[this.val.linkMainUUID]) {
        this.dynamicData = linkage[this.val.linkMainUUID]
      }
    },
    checkChose () {
      // if (Object.prototype.toString.call(this.val.csvSeries) === '[object Array]') { // 表格组件
      if (this.val.csvGroup === 'table') { // 表格组件
        if (!this.val.csvSeries) {
          return false
        }
      } else {
        if (!this.val.csvSeries) {
          return false
        }
        // if (Object.prototype.toString.call(this.val.csvNum) === '[object Array]' && !this.val.csvNum.length) { // 多系列组件
        if (this.val.csvGroup === 'multiple' && !this.val.csvNum.length) { // 多系列组件
          return false
        } else {
          if (!this.val.csvNum) {
            return false
          }
        }
      }

      return true
    },
    getCsvOptionData () {
      // if (Object.prototype.toString.call(this.val.csvSeries) === '[object Array]') {
      if (this.val.csvGroup === 'table') {
        if (this.val.csvSeries.length <= 0) {
          return false
        }
      } else {
        if (!this.val.csvSeries) {
          return false
        }
        if (!this.val.csvNum) {
          return false
        }
      }
      let params = {
        source: this.val.csvHash,
        hash: this.$route.params.hash
      }
      // if (Object.prototype.toString.call(this.val.csvSeries) === '[object Array]') { // 表格组件
      if (this.val.csvGroup === 'table') { // 表格组件
        params.groups = encodeURIComponent(Base64.encode(this.val.csvSeries.join('-')))
        params.values = ''
        // params.type = 'uuid9'
        params.type = this.type.table
      } else {
        params.groups = encodeURIComponent(Base64.encode(this.val.csvSeries))
        // if (Object.prototype.toString.call(this.val.csvNum) === '[object Array]') { // 多列图表组件
        if (this.val.csvGroup === 'multiple') { // 多列图表组件
          params.values = Base64.encode(this.val.csvNum.join('-')).replace('%2B', '+')
          // params.type = 'uuid6'
          params.type = this.type.multiple
        } else { // 单列图表组件
          params.values = encodeURIComponent(Base64.encode(this.val.csvNum))
          params.type = this.val.csvGroup === 'map' ? this.type.map : this.type.single
        }
      }
      let url = `${process.env.BASE_API}/material/jsonapi?groups=${params.groups}&values=${params.values}&type=${params.type}&source=${params.source}&hash=${params.hash}`

      axios({
        type: 'get',
        url: url,
        data: params
      }).then(res => {
        // console.log(res)
        if (res.data.statusCode === 0) {
          this.dynamicData = res.data
        } else {
          console.log('数据请求错误')
        }
      })
    }
  }
}
