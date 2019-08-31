<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="'数据表名称、表头名称'" v-model="listQuery.fileName" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleSearch"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">{{ '搜索' }}</el-button>
      <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".csv" @change="handleClick">
      <el-button class="filter-item" style="margin-left:16px;" type="primary" @click="handleUpload">新建表格</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="materialDataList"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column :label="'序号'" type="index" align="center" width="60" />
      <el-table-column :label="'数据表名称'" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.fileName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'表头'" min-width="250px">
        <template slot-scope="scope">
          <span>{{ showTitle(scope.row.title) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width" width="260px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary"  @click="handleView(scope.row.hash)">{{ '查看' }}</el-button>
          <input ref="update" class="excel-upload-input" type="file" accept=".csv" @change="handleUpdateCsv">
          <el-button size="mini" type="success" @click="updateCsv(scope.row.hash)">{{ '更新' }}</el-button>
          <div style="display:inline-block;">
            <el-popover
              placement="top"
              width="160" :ref="`popover-${scope.$index}`">
              <p>{{ '确定要删除表格吗' }}</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text"  @click="scope._self.$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                <el-button type="primary" size="mini" @click="scope._self.$refs[`popover-${scope.$index}`].doClose() === handleDelete(scope.row)">确定</el-button>
              </div>
              <el-button size="mini" type="danger"  slot="reference">删除</el-button>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getMaterialList" />
    <el-dialog title="新建表格" :visible.sync="dialogTableVisible" width="620" :close-on-click-modal="false" @close="quitCreate"  class="material-dialog">
      <el-form :model="excelData" :rules="rules" ref="excelData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="表格名称" prop="fileName">
          <el-input class="dialog-inp-fileName" v-model="excelData.fileName"></el-input>
        </el-form-item>
      </el-form>
      <table class="material-table">
        <thead>
        <th
          v-for="(head, key) in excelData.data[0]"
          :data-head="key"
          :key="key">
          <span>{{ key }}</span>
          <el-select size="mini" class="material-sel" :value="setHeaderType(key)" @change="changeProp(key,$event)"  placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </th>
        </thead>
        <tbody>
        <tr v-for="(items, index) in showData" :key="index">
          <td v-for="(key,i) in items" :key="i">{{ key[1] }}</td>
        </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quitCreate">取 消</el-button>
        <el-button type="primary" @click="saveCreate('excelData')">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogViewVisible" width="600px" class="material-dialog">
      <table class="material-table">
        <thead>
        <th
          v-for="(head, key) in viewData.data[0]"
          :data-head="key"
          :key="key">
          <a>{{ key }} <span class="mt-head-span">（{{ getUnHeaderType(key) }}）</span></a>
        </th>
        </thead>
        <tbody>
        <tr v-for="(items, index) in viewData.data" :key="index">
          <td v-for="(key,i) in items" :key="i">
            <span :style="{color: key[0] == 'true' ? '' : 'red'}">{{ key[1] }}</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogViewVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import XLSX from 'xlsx'
import { fetchMaterialList, getView, uploadCsv, createType, deleteMaterial, updateCsv, cancelType } from '@/api/material'
import Pagination from '@/components/Pagination'
let Base64 = require('js-base64').Base64
export default {
  components: { Pagination },
  data () {
    return {
      materialDataList: null,

      total: 1,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        fileName: undefined,
        status: undefined
        // project: this.$route.name || 'all'
        // project: 'all'
      },
      excelData: {
        hash: '',
        fileName: '',
        title: [],
        data: []
      },
      showData: [],
      rules: {
        fileName: [
          { required: true, message: '请输入表格名称', trigger: 'blur' }
        ]
      },
      originalTableData: null,
      dialogTableVisible: false,
      dialogViewVisible: false,
      viewData: {
        fileName: '',
        title: [],
        data: []
      },
      options: [
        { value: 'text', label: '文本' },
        { value: 'date', label: '日期' },
        { value: 'number', label: '数字' },
        { value: 'position', label: '位置' }
      ],
      curUpdateHash: ''

    }
  },
  computed: {

  },
  watch: {
    'dialogTableVisible': function () {
      if (!this.dialogTableVisible) {
        this.$refs['excel-upload-input'].value = ''
      }
    }
  },
  created () {
    this.getMaterialList()
  },
  methods: {
    getMaterialList () { // 获取列表
      this.listLoading = true
      fetchMaterialList(this.listQuery).then(response => {
        this.materialDataList = response.data.items
        this.total = response.data.total || 0
        this.listLoading = false
      })
    },
    showTitle (data) {
      let arr = data.map(item => {
        return item.title
      })
      return arr.join('，')
    },
    updateCsv (hash) { // 点击更新
      this.curUpdateHash = hash
      this.$refs['update'].click()
    },
    handleUpdateCsv (e) { // 更新数据表
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return

      let fileFormData = new FormData()
      fileFormData.append('file', rawFile)
      updateCsv(fileFormData, this.curUpdateHash).then(res => {
        this.$refs['update'].value = ''
        if (res && res.code === 0) {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleDelete: function (row) { // 删除数据表
      deleteMaterial(row.hash).then(response => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getMaterialList()
      })
    },
    handleView (hash) { // 查看数据表数据
      getView(hash).then(res => {
        this.reqView(res.data)
      })
    },

    filterData (data) { // 筛选
      let newData = data.filter((item, i) => {
        let isTrue = [] // 将每行各个数据的判断存到该数组
        Object.keys(item).forEach(key => {
          let val = item[key] // val为数值 key为表头数据 prop为数据类型
          let prop = this.excelData.header.find(head => {
            return head.value === key
          }).prop
          isTrue.push(this.checkData(val, key, prop)) // 判断表格中的每项数据是否符合标准，是则为true，否则为false，存到数组中
        })
        let a = isTrue.filter(x => { // 判断每个数组中是否有false，有则该行不符合
          return !x
        })
        return !a.length
      })

      return newData
    },
    checkData (val, key, prop) {
      switch (prop) {
        case 'text':
          return this.checkString(val)
        case 'number':
          return this.checkNumber(val)
        case 'date':
          return this.checkDate(val)
        case 'position':
          return this.checkString(val)
        default:
          return true
      }
    },
    checkString (str) {
      if (typeof str === 'undefined' || str == null || str === '') {
        return false
      } else {
        return true
      }
    },
    checkNumber (num) {
      if (num === '') {
        return false
      }
      let regPos = /^\d+(\.\d+)?$/ // 非负浮点数
      let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
      if (regPos.test(num) || regNeg.test(num)) {
        return true
      } else {
        return false
      }
    },
    checkDate (str) {
      let reg1 = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
      let reg2 = /^[1-9]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/
      if (reg1.test(str) || reg2.test(str)) {
        return true
      } else {
        return false
      }
    },

    changeProp (val, e) {
      this.excelData.title.map(item => {
        if (item.title === val) {
          item.titleType = e
        }
      })
    },
    setHeaderType (title) {
      let titleIndex = this.excelData.title.findIndex(item => {
        return item.title === title
      })
      return this.excelData.title[titleIndex].titleType
    },
    reqView (data) {
      this.viewData.fileName = data.fileName
      this.viewData.title = data.title
      this.viewData.data = data.data
      this.dialogViewVisible = true
      this.dialogTableVisible = false
    },
    saveCreate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            fileName: this.excelData.fileName,
            title: this.excelData.title,
            hash: this.excelData.hash
          }
          createType(params).then(res => {
            if (res.statusCode === 1000) { // 表格名称重复
              this.$notify({
                title: '失败',
                message: '表格名称重复，请修改',
                type: 'warning',
                duration: 2000
              })
            } else if (res.statusCode === 1001) { // 表格数据异常
              let data = res.data
              this.reqView(data)
            } else {
              this.$notify({
                title: '成功',
                message: '上传成功',
                type: 'success',
                duration: 2000
              })
              this.getMaterialList()
              this.dialogTableVisible = false
            }
          })
        }
      })
    },
    getUnHeaderType (key) {
      let index = this.viewData.title.filter(item => {
        return item.title === key
      })
      let type = index[0].titleType
      let str = this.options.filter(i => {
        return i.value === type
      })
      return str[0].label
    },
    quitCreate () {
      cancelType(this.excelData.hash).then(res => {
        // console.log('已取消创建表格')
        this.dialogTableVisible = false
      })
    },
    handleSearch () {
      this.listQuery.page = 1
      this.getMaterialList()
    },
    handleUpload () {
      this.$refs['excel-upload-input'].click()
    },
    handleClick (e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      let name = Base64.encode(rawFile.name)
      let newfile = new File([rawFile], name)
      let fileFormData = new FormData()
      fileFormData.append('file', newfile)
      uploadCsv(fileFormData).then(res => {
        let data = res.data
        this.excelData.fileName = data.fileName
        this.excelData.title = data.title
        this.excelData.data = data.data
        this.excelData.hash = data.hash
        this.showData = data.data.length >= 5 ? data.data.slice(0, 5) : data.data
        this.dialogTableVisible = true
      })
      this.$refs['excel-upload-input'].value = ''
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

  .excel-upload-input{
    display: none;
    z-index: -9999;
  }
  .drop{
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
  }

  .material-table{
    table-layout:fixed;
    /*padding-right: 20px;*/
    margin: 0 auto;
  }
  .material-table th,.material-table td{
    border-bottom:1px solid #EBEEF5;
    color:#909399;
    padding:10px;
    text-align: left;
  }
  .material-table td{
    min-width:120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .material-sel{
    width: 60px;
  }
  .material-sel .el-input__inner{
    padding: 0 0 0 6px;
  }
  .dialog-inp-fileName{
    width:200px;
  }
  .mt-head-span{
    font-size:14px;
    color:#aaa;
  }
  .material-dialog .el-dialog__body{
    overflow-x:auto;
  }
</style>
