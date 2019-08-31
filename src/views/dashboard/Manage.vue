<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="'大屏名称'" v-model="listQuery.title" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="listQuery.status" :placeholder="'发布状态'" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(key, value) in publishTypeOptions" :key="key" :label="key" :value="value"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ '搜索' }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ '新建' }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column :label="'序号'" prop="id" align="center" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.sequenceNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'大屏名称'" min-width="150px">
        <template slot-scope="scope">

          <el-popover placement="bottom" width="300" height="168" trigger="hover">
            <el-image style="height:100%" :src="url + scope.row.imgUrl + '?t=' + scope.row.config.timestamp">
              <div slot="placeholder" class="image-slot">
                <span class="dot">加载中...</span>
              </div>
            </el-image>
            <el-button size="mini" type="text" slot="reference" plain  @click="handlePreview(scope.row.hash)">{{ scope.row.config.title }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="'分享链接'" min-width="250px">
        <template slot-scope="scope" >
          <div v-show="scope.row.publish.status === 'published'">
            <el-link type="primary" :href="scope.row.publish.hash | pubUrlFilter" target="_blank">{{ scope.row.publish.hash | pubUrlFilter }}</el-link>
            <el-tooltip effect="dark" :content="'复制'" placement="bottom">
              <el-button size="mini" type="primary" plain icon="el-icon-document-copy" @click="handleCopy(scope.row.publish.hash, $event)" circle></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" :content="'下载'" placement="bottom">
              <el-button size="mini" type="primary" plain icon="el-icon-download" @click="handleDownload(scope.row.publish.hash)" circle></el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="'发布'" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tooltip :disabled="scope.row | needRepublish" :content="'内容已更新, 未重新发布'" placement="left">
            <el-badge is-dot style="margin-top: 3px;" :hidden="scope.row | needRepublish">
              <el-dropdown trigger="click" placement="bottom" @command="handlePublish">
                <el-button size="mini" type="primary" plain>{{ scope.row.publish.status | statusFilter }}</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-tooltip effect="dark" :content="'删除已发布链接'" placement="left">
                    <el-dropdown-item
                      icon="el-icon-remove-outline"
                      v-show="scope.row.publish.status === 'published'"
                      :command="{hash:scope.row.hash, cmd:'unpublish'}">
                      {{ '停止发布' }}
                    </el-dropdown-item>
                  </el-tooltip>
                  <el-tooltip effect="dark" :content="'生成一个新的链接'" placement="left">
                    <el-dropdown-item
                      icon="el-icon-circle-plus-outline"
                      v-show="scope.row.publish.status === 'unpublish'"
                      :command="{hash:scope.row.hash, cmd:'published'}">
                      {{' 公开发布 '}}
                    </el-dropdown-item>
                  </el-tooltip>

                  <el-tooltip effect="dark" :content="'更新已发布链接的内容'" placement="left">
                    <el-dropdown-item
                      icon="el-icon-refresh"
                      v-show="scope.row.publish.status === 'published' && scope.row.config.timestamp > scope.row.publish.timestamp"
                      :command="{hash:scope.row.hash, cmd:'republish'}">
                      {{' 重新发布 '}}
                    </el-dropdown-item>
                  </el-tooltip>
                </el-dropdown-menu>
              </el-dropdown>
            </el-badge>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" width="400" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" slot="reference" plain @click="handlePreview(scope.row.hash)">{{ '预览' }}</el-button>
          <el-button size="mini" type="primary" plain @click="handleDesign(scope.row.hash)">{{ '编辑' }}</el-button>
          <el-button size="mini" type="primary" plain @click="handleClone(scope.row.hash, scope.row.config.title)">{{ '克隆' }}</el-button>
          <!-- 移动分组 -->
          <div style="display:inline-block; padding-left:10px">
            <el-dropdown trigger="click" placement="bottom" @command="handleMove">
              <el-button size="mini" type="primary" plain>{{ '移动' }}</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(project, key) in projects"
                  :key="key"
                  :command="{title:scope.row.config.title, hash:scope.row.hash, project: project, key:key}">
                  {{ project }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div style="display:inline-block; padding-left:10px">
            <el-popover  placement="bottom" width="200" :ref="`popover-${scope.$index}`">
              <p>{{ '确定要删除大屏' + scope.row.config.title + '吗?' }} </p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope._self.$refs[`popover-${scope.$index}`].doClose()">{{ '取消' }}</el-button>
                <el-button size="mini" type="primary" @click="scope._self.$refs[`popover-${scope.$index}`].doClose() === handleDelete(scope.row)">{{ '确定' }}</el-button>
              </div>
              <el-button size="mini" type="primary" plain slot="reference">{{ '删除' }}</el-button>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--新建大屏-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="createTable" label-position="top" label-width="70px">
        <el-form-item :label="'大屏名称'" :placeholder="'请输入大屏名称'" prop="title">
          <el-input v-model="createTable.name"/>
        </el-form-item>

        <el-form-item :label="'选择模板'" v-show="this.templateList">
          <template-list
            :templates="templateList"
            @onselect="onSelectTemplate">
          </template-list>
        </el-form-item>

        <el-form-item :label="'大屏简介'">
          <el-input type="textarea" :rows="3" :placeholder="'请填写关于大屏的描述信息'" v-model="createTable.about"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ '取消' }}</el-button>
        <el-button type="primary" @click="createSubmit()">{{ '创建' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createDashboard, deleteDashboard, publishDashboard, downloadDashboard, moveDashboard } from '@/api/dashboard'
import { fetchTemplateList } from '@/api/template'

import waves from '@/directive/waves' // Waves directive
import TemplateList from '@/components/Dashboard/Template'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import clip from '@/scripts/clipboard'

const publishTypeOptions = {
  published: '已发布',
  unpublish: '未发布'
}

export default {
  name: 'ManageDashboard',
  components: { Pagination, TemplateList },
  directives: { waves },
  filters: {
    statusFilter (status) {
      return publishTypeOptions[status] || '未发布'
    },
    pubUrlFilter (hash) {
      return hash ? window.location.protocol + '//' + window.location.host + '/#/dashboard/' + hash : ''
    },
    needRepublish (row) {
      return row.publish.status !== 'published' || row.config.timestamp <= row.publish.timestamp
    }
  },
  data () {
    return {
      url: process.env.BASE_API,
      time: new Date(),
      delPopover: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        status: undefined,
        project: this.$route.name || 'all'
      },
      publishTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      createTable: {},
      templateList: null,
      dialogTitle: '',
      dialogFormVisible: false,
      downloadLoading: false,
      isRouterAlive: true
    }
  },
  computed: {
    projects () {
      return this.$store.state.user.projects
    },
    group () {
      if (this.$route.name === 'all' || this.$route.name === 'ungrouped') {
        return ''
      } else {
        return this.$route.name
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        if (response.data.total > 0) {
          this.serialList(response.data.items)
        }
        this.list = response.data.items
        this.total = response.data.total || 0

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange (data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID (order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleCopy (text, event) {
      const pubUrlFilter = this.$options.filters['pubUrlFilter']

      clip(pubUrlFilter(text), event)
    },
    resetTemp () {
      this.createTable = {
        name: '',
        timestamp: Number(new Date()),
        template: 'blank',
        about: '',
        mode: 'create',
        project: this.group
      }
    },
    handleCreate () {
      fetchTemplateList().then(response => {
        this.templateList = response.data.items
      })

      this.resetTemp()
      this.dialogTitle = '新建大屏'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleClone (hash, title) {
      this.resetTemp()
      this.templateList = null
      this.dialogTitle = '大屏克隆 - <' + title + '>'

      this.createTable.template = hash
      this.createTable.mode = 'clone'

      this.dialogFormVisible = true
    },
    createSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createDashboard(this.createTable).then(response => {
            // 跳转到编辑页面
            this.handleDesign(response.hash)
          })
        }
      })
    },
    handleUpdate (row) {
      this.createTable = Object.assign({}, row) // copy obj
      this.createTable.timestamp = new Date(this.createTable.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete: function (row) {
      deleteDashboard(row.hash).then(response => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
        this.getList()
      })
    },
    handleDownload (hash) {
      this.downloadLoading = true
      downloadDashboard(hash).then(response => {
        if (response.code === 0) {
          window.location = process.env.BASE_API + '/' + response.data
        }
      })
    },
    handlePublish (param) {
      publishDashboard(param.hash, param.cmd).then(response => {
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })

        this.getList()
      })
    },
    handleDesign (hash) {
      this.$router.push('/edit/dashboard/' + hash + '?from=' + (this.$route.name || 'all'))
    },
    handlePreview (hash) {
      const routeUrl = this.$router.resolve({
        path: '/preview/' + hash
      })
      window.open(routeUrl.href, '_blank')
    },
    handleMove (param) {
      this.$confirm('确定将大屏"' + param.title + '"移动到 ' + param.project + ' 分组吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        moveDashboard(param.hash, param.key).then(response => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {})
    },
    serialList (list) {
      for (let i = 0; i < list.length; i++) {
        list[i]['sequenceNumber'] = i + 1
      }
    },
    onSelectTemplate: function (data) {
      this.createTable.template = data.hash
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 100px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
