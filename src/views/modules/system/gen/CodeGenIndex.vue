<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="表名称">
              <a-input v-model="queryParam.tableName" placeholder="表名称" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-button type="primary" @click="queryPage">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetQuery">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <v-table
      :columns="tableObj.columns"
      :data="loadData"
      ref="table">
      <template v-slot:action="{row}">
        <a href="javascript:" @click="showCode(row)">预览</a>
        <a-divider type="vertical" />
        <a href="javascript:" @click="createCode(row)">生成</a>
      </template>
    </v-table>

    <show-code
      ref="modalForm"
      @ok="handleOk" />

  </a-card>
</template>

<script>

import ShowCode from './ShowCode'
import { TableMixin } from '@/mixins/TableMixin'
import { tableObj } from './template'
import RoleAddOrUpdate from '../role/RoleAddOrUpdate'
import { genCodeZip, PageDataTable } from '@/api/sysTool/genCode'

export default {
  name: 'GenCodeIndex',
  components: {
    RoleAddOrUpdate,
    ShowCode
  },
  mixins: [TableMixin],
  data () {
    return {
      tableObj,
      queryParam: {
        tableName: ''
      },
      loadData: (parameter) => {
        console.log('param:', this.queryParam)
        return PageDataTable(
          Object.assign(parameter, this.queryParam)
        ).then(res => {
          return res.data
        })
      }
    }
  },
  methods: {
    createCode (row) {
      genCodeZip(row.tableName).then(response => {
        if (response.type === 'application/octet-stream') {
          // 获取http头部的文件名信息，若无需重命名文件，将下面这行删去
          const fileName = row.tableName + '.zip'
          /* 兼容ie内核，360浏览器的兼容模式 */
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            const blob = new Blob([response], { type: 'application/zip' })
            window.navigator.msSaveOrOpenBlob(blob, fileName)
          } else {
            /* 火狐谷歌的文件下载方式 */
            const blob = new Blob([response], { type: 'application/zip' })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a') // 创建a标签
            link.href = url
            link.download = fileName // 文件重命名，若无需重命名，将该行删去
            link.click()
            URL.revokeObjectURL(url) // 释放内存
          }
        }
      })
    },
    handleOk () {
      this.queryPage()
    },
    resetQuery () {
      this.queryParam = {}
      this.queryPage()
    },
    showCode (record) {
      this.$refs.modalForm.init(record.tableName, 'show')
    },
    edit (record) {
      this.$refs.modalForm.init(record.roleId, 'edit')
    },
    add () {
      this.$refs.modalForm.init('', 'add')
    }
  },
  created () {

  }
}
</script>
