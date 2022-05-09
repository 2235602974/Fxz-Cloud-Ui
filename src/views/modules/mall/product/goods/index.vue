<template>
  <div>
    <a-card>
      <a-table
        :columns="tableObj.columns"
        :dataSource="tableData"
        :loading="tableLoading"
      >
        <template v-slot:picUrl="text">
          <img :src="getImg(text)" width="40" />
        </template>
        <template v-slot:detail="text">
          <a href="javascript:" @click="spuInfo(text)">详情</a>
        </template>
        <template v-slot:expandedRowRender="record" style="margin: 0">
          <a-table
            size="small"
            :pagination="false"
            :columns="tableObj.skuColumns"
            :dataSource="record.skuList"
            :loading="tableLoading">
            <template v-slot:picUrl="text">
              <img :src="getImg(text)" width="40" />
            </template>
          </a-table>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model="visible" title="商品详情" @ok="spuInfo" :footer="null">
      <div v-html="goodDetail"></div>
    </a-modal>
  </div>
</template>

<script>
import { tableObj } from '@/views/modules/mall/product/goods/template'
import { page } from '@/api/mall/product/goods'

export default {
  name: 'GoodsIndex',
  data () {
    return {
      tableObj,
      tableData: [],
      tableLoading: false,
      current: 1,
      pageSize: 20,
      defaultCurrent: 1,
      total: 0,
      visible: false,
      goodDetail: undefined
    }
  },
  created () {
    this.queryData()
  },
  methods: {
    spuInfo (info) {
      if (this.visible) {
        this.visible = false
        this.goodDetail = undefined
      } else {
        this.visible = true
        this.goodDetail = info
      }
    },
    queryData () {
      this.tableLoading = true
      const params = {
        current: this.current,
        pageSize: this.pageSize
      }
      page(params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.tableLoading = false
      })
    },
    getImg (icon) {
      return 'http://127.0.0.1:8301' + icon
    }
  }
}
</script>

<style scoped>

</style>
