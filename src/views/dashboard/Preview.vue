<template>
  <div v-wechat-title="title">
    <vue-page-preview
      :page="config"
      :widgets="widget"/>
  </div>
</template>

<script>
import vuePagePreview from '@/components/Dashboard/Preview/index'
import { fetchDashboard, fetchPublication } from '@/api/dashboard'

export default {
  name: 'PreviewDashboard',
  components: { vuePagePreview },
  data () {
    return {
      config: null,
      widget: [],
      title: ''
    }
  },
  computed: {
    isPublished () {
      return this.$route.path.indexOf('/dashboard') !== -1
    }
  },
  created () {
    this.$nextTick(() => {
      this.getDashboardConfig()
    })
  },

  methods: {
    getDashboardConfig () {
      const fetchConfig = (this.isPublished) ? fetchPublication : fetchDashboard

      fetchConfig(this.$route.params.hash).then(response => {
        if (response.data) {
          this.details = response.data

          if (response.data.config) {
            this.config = response.data.config
            this.widget = response.data.widget
            this.title = this.config.title
          }
        }
      })
    }
  }
}
</script>
