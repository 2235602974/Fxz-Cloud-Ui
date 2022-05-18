<template>
  <a-card :bordered="false">
    <f-table
      :expandConfig="expandConfig"
      :columns="tableObj.columns"
      :data="loadData"
      ref="table">
      <template v-slot:payAmount="{row}">
        {{ row.payAmount | moneyFormatter }}
      </template>
      <template v-slot:totalAmount="{row}">
        {{ row.totalAmount | moneyFormatter }}
      </template>

      <template v-slot:picUrl="{row}">
        <img :src="getImg(row.picUrl)" width="40"/>
      </template>

    </f-table>
  </a-card>
</template>

<script>
import { tableObj } from './template'
import { page } from '@/api/mall/order/order'
import { TableMixin } from '@/mixins/TableMixin'

export default {
  name: 'OrderList',
  mixins: [TableMixin],
  data () {
    return {
      expandConfig: {
        expand: true,
        expandField: 'orderItems',
        columns: tableObj.itemColumns
      },
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
    getImg (icon) {
      return 'http://127.0.0.1:8301' + icon
    }
  }
}
</script>

<style scoped>

</style>
