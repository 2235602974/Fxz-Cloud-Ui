<template>
  <a-tree-select
    v-model="text"
    :loading="loading"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    @click.native="handleClick"
    @change="handleChange"
    :tree-data="netDic"
  >
  </a-tree-select>
</template>

<script>
import props from '../core/props'
import event from '../core/event'
import create from '../core/create'
import { treeDataTranslate } from '@/utils/util'
export default create({
  name: 'select-tree',
  mixins: [props(), event()],
  watch: {
    dic: {
      handler (val) {
        this.netDic = val
      },
      immediate: true
    }
  },
  data () {
    return {
      netDic: [],
      loading: false
    }
  },
  created () {
    console.log('1')
  },
  mounted () {
    console.log('select 运行请求', this.dic, this.dicUrl)
    if (this.dic.length === 0 && this.dicUrl) {
      this.loading = true
      this.axios.get(this.dicUrl).then(res => {
        this.netDic = treeDataTranslate(res.data, 'id', 'title')
      }).catch(err => {
        this.$message.error(err.msg)
      }).finally(_ => {
        this.loading = false
      })
    }
  },
  methods: {}
})
</script>

<style scoped>

</style>
