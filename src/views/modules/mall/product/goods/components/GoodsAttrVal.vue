<template>
  <div>
    <div style="margin-top: 20px;margin-bottom: 30px">
      <a-table :columns="tableObj.columns" :data-source="attrValList" :pagination="false">
        <template v-slot:myAction="text, record">
          <a-button
            size="small"
            type="danger"
            shape="circle"
            @click.stop="remove(record)">
            <a-icon type="delete" />
          </a-button>
        </template>
      </a-table>
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
  </div>
</template>

<script>
import { tableObj } from '@/views/modules/mall/product/goods/components/template'

export default {
  name: 'GoodAttrVal',
  mixins: [],
  components: {},
  data () {
    return {
      tableObj,
      attrValList: [
        {
          name: 'fxz',
          value: '111'
        }
      ]
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
    addAttr () {
    },
    remove (item) {
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
