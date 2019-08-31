<template>
  <div class="menu-wrapper">

    <el-submenu ref="subMenu" :index="resolvePath('/project')">
      <template slot="title">
        <item :icon="'list'" :title="'大屏管理'" />
      </template>

      <app-link :to="resolvePath('./all')">
        <el-menu-item :index="resolvePath('./all')" :class="{'submenu-title-noDropdown':!isNest}">
          <i :class="$route.path.indexOf('all') < 0 ? 'el-icon-folder' :'el-icon-folder-opened'"></i>
          <span class="menu-item" slot="title">{{ '全部大屏' }}</span>
        </el-menu-item>
      </app-link>

      <app-link :to="resolvePath('./ungrouped')">
        <el-menu-item :index="resolvePath('./ungrouped')" :class="{'submenu-title-noDropdown':!isNest}">
          <i :class="$route.path.indexOf('ungrouped') < 0 ? 'el-icon-folder' :'el-icon-folder-opened'"></i>
          <span class="menu-item" slot="title">{{ '未分组' }}</span>
        </el-menu-item>
      </app-link>

      <el-menu-item v-for="(group, path) in projects" :key="path" :index="resolvePath('./' + path)" :class="{'submenu-title-noDropdown':!isNest}">
        <app-link :to="resolvePath('./' + path)">
          <i :class="$route.path.indexOf(path) < 0 ? 'el-icon-folder' :'el-icon-folder-opened'"></i>
          <template v-if="projectKey == path">
            <el-input v-focus="projectKey == path" v-model="projectName" class="edit-input" @blur="handleRename" size="small"/>
          </template>
          <span class="menu-item" v-else >{{ group }}</span>
        </app-link>
        <div class="action-icon" v-show="projectKey == ''">
          <i class="el-icon-edit-outline" @click="projectKey = path; projectName = group"></i>
          <i class="el-icon-delete" @click="handleDelete(group, path)"></i>
        </div>
      </el-menu-item>

      <el-menu-item :class="{'submenu-title-noDropdown':!isNest}" :key="menuKey">
        <i class="el-icon-folder-add"></i>
        <template v-if="addProject">
          <el-input v-focus="addProject" v-model="newProject" @class="edit-input" @blur="handleAdd" size="small"/>
        </template>
        <span v-else class="menu-item" slot="title" @click="addProject = true">{{ '添加组' }}</span>
      </el-menu-item>

    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import AppLink from './Link'
import Item from './Item'
import FixiOSBug from './FixiOSBug'

import { isExternal } from '@/scripts/validate'
import { updateProject, deleteProject } from '@/api/user'

export default {
  name: 'ProjectItem',
  components: { AppLink, Item },
  mixins: [FixiOSBug],
  directives: {
    focus: {
      inserted: function (el, { value }) {
        if (value) {
          el.querySelector('input').focus()
        }
      }
    }
  },
  props: {
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: '/project'
    }
  },
  data () {
    this.onlyOneChild = null
    return {
      menuKey: 0,
      projectKey: '',
      projectName: '',
      newProject: '',
      addProject: false
    }
  },
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    },
    projects () {
      return this.$store.state.user.projects
    }
  },
  methods: {
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    handleDelete (group, key) {
      this.$confirm(group + '删除后, 分组内的大屏将移动到未分组中, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteProject', key)
        deleteProject({ projects: this.projects }, key)

        // 删除tagview
        this.visitedViews.forEach(v => {
          if (v.name === key) {
            this.$store.dispatch('delView', v)
          }
        })

        this.$message({
          type: 'success',
          message: '删除分组成功!'
        })

        ++this.menuKey
        this.$router.push(this.resolvePath('./ungrouped?r=' + this.menuKey))
      }).catch(() => {})
    },
    handleAdd () {
      this.addProject = false
      if (this.newProject !== '') {
        this.$store.dispatch('addProject', this.newProject)
        updateProject({ projects: this.projects })
      }

      this.newProject = ''
    },
    handleRename () {
      if (this.projectName !== '') {
        let obj = {}
        obj[this.projectKey] = this.projectName
        this.$store.dispatch('renameProject', obj)
        updateProject({ projects: this.projects })
        this.$router.push(this.resolvePath('./' + this.projectKey))

        // 修改tagview
        this.$store.dispatch('updateVistedViewTitle', { name: this.projectKey, title: this.projectName })
      }
      this.projectKey = ''
    }
  }
}
</script>
<style>
.action-icon{
  display: none;
  margin-left: -14px;
}
.el-menu-item:hover .action-icon{
  display: inline-block;
}
</style>
<style scoped>
  .action-icon .el-icon-edit-outline{
    width:14px;
  }
  .el-menu-item.submenu-title-noDropdown{
    padding-left:20px!important;
  }
  .el-menu-item.submenu-title-noDropdown .menu-item{
    display: inline-block;
    width:70px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-menu-item i{
    color: #f7f7f8;
  }
  .el-menu-item.is-active i{
    color: rgb(109, 221, 255);
  }
</style>
