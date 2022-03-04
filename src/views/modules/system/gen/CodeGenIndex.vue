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
        <!--        <a href="javascript:" @click="createCode(row)">生成</a>-->
        <a-divider type="vertical" />
        <a-popconfirm title="是否删除权限" @confirm="deleteItem(row)" okText="是" cancelText="否">
          <a-icon slot="icon" type="question-circle-o" style="color: red" />
          <a href="javascript:;" style="color: red">删除</a>
        </a-popconfirm>
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
import { deleteRoleById } from '@/api/sys/role'
import RoleAddOrUpdate from '../role/RoleAddOrUpdate'
import { PageDataTable } from '@/api/sysTool/genCode'

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
    deleteItem (record) {
      deleteRoleById(record.roleId).then(_ => {
        this.$message.info('删除成功')
        this.queryPage()
      }).catch(err => {
        this.$message.error(err.msg)
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
