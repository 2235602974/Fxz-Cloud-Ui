<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-button type="primary" @click="queryPage">查询</a-button>
            <a-button style="margin-left: 8px" @click="restQuery">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <f-table
      :columns="tableObj.columns"
      :data="loadData"
      ref="table">
      <template v-slot:buttons>
        <a-button type="primary" icon="plus" @click="add">新建</a-button>
      </template>
    </f-table>
    <Brand-edit
      ref="brandEdit"
      @ok="handleOk" />
  </a-card>
</template>

<script>
import { tableObj } from './Brandtemplate'
import { del, page } from '@/api/mall/product/brand'
import BrandEdit from './BrandEdit'
import { TableMixin } from '@/mixins/TableMixin'

export default {
  name: 'BrandList',
  components: {
    BrandEdit
  },
  mixins: [TableMixin],
  data () {
    return {
      tableObj,
      queryParam: {},
      loadData: (parameter) => {
        return page(Object.assign(parameter, this.queryParam)).then(res => {
          return res.data
        })
      }
    }
  },
  methods: {
    handleOk () {
      this.queryPage()
    },
    add () {
      this.$refs.brandEdit.init('', 'add')
    },
    edit (record) {
      this.$refs.brandEdit.init(record.id, 'edit')
    },
    show (record) {
      this.$refs.brandEdit.init(record.id, 'show')
    },
    remove (record) {
      del(record.id).then(_ => {
        this.$message.info('删除成功')
        this.queryPage()
      })
    }
  }
}
</script>

<style scoped>

</style>
