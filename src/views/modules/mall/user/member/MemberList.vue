<template>
  <a-card :bordered="false">
    <f-table
      :expandConfig="expandConfig"
      :columns="tableObj.columns"
      :data="loadData"
      ref="table">
      <template v-slot:avatarUrl="{row}">
        <img :src="getImg(row.picUrl)" width="40"/>
      </template>
      <template v-slot:balance="{row}">
        {{ row.balance | moneyFormatter }}
      </template>
    </f-table>
  </a-card>
</template>

<script>
import { tableObj } from './template'
import { page } from '@/api/mall/user/member'
import { TableMixin } from '@/mixins/TableMixin'

export default {
  name: 'MemberList',
  mixins: [TableMixin],
  data () {
    return {
      expandConfig: {
        expand: true,
        expandField: 'addressList',
        columns: tableObj.addressColumns
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
