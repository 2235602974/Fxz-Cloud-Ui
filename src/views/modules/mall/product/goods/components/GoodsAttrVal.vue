<template>
  <div>
    <div style="margin-top: 20px;margin-bottom: 30px">
      <f-table
        :showPagination="false"
        :columns="tableObj.columns"
        :data="loadData"
        ref="table">
        <template v-slot:buttons>
          <a-button type="primary" icon="plus" @click="addAttr">新建</a-button>
        </template>
        <template v-slot:action="{row}">
          <a-button
            size="small"
            type="danger"
            shape="circle"
            @click.stop="remove(row)">
            <a-icon type="delete" />
          </a-button>
        </template>
      </f-table>
    </div>
    <div style="margin-bottom: 10px;">
      <a-button
        @click="handlePrev"
        style="margin-right: 10px">上一步，填写商品属性
      </a-button>
      <a-button
        type="primary"
        @click="handleNext"
        style="margin-right: 10px">下一步，设置商品规格
      </a-button>
    </div>
    <goods-category-attr-edit
      ref="goodsCategoryAttrEdit"
      @ok="handleOk"
      :categoryId="this.goodsInfo.categoryId[this.goodsInfo.categoryId.length-1]"
      :attrType="2"/>
  </div>
</template>

<script>
import { tableObj } from '@/views/modules/mall/product/goods/components/template'
import { TableMixin } from '@/mixins/TableMixin'
import GoodsCategoryAttrEdit from '@/views/modules/mall/product/goods/components/GoodsCategoryAttrEdit'
export default {
  name: 'GoodAttrVal',
  mixins: [TableMixin],
  components: { GoodsCategoryAttrEdit },
  data () {
    return {
      tableObj,
      attrValList: [
        {
          name: 'fxz',
          value: 'fxzz'
        }
      ],
      loadData: (parameter) => {
        return new Promise(resolve => {
          const res = {}
          res.records = this.attrValList
          resolve(this.attrValList)
        })
      }
    }
  },
  props: {
    goodsInfo: {
      type: Object,
      default: () => {
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    handleOk () {

    },
    addAttr () {
      this.$refs.goodsCategoryAttrEdit.init('', 'add')
    },
    remove (item) {
      this.queryPage()
    },
    handlePrev () {
      this.$emit('prev')
    },
    handleNext () {
    },
    init () {
    }
  }
}
</script>

<style scoped>

</style>
