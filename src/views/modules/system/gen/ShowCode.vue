<template>
  <a-modal
    :title="'代码预览'"
    width="80%"
    top="5vh"
    :visible="visible"
    :maskClosable="false"
    @cancel="handleCancel"
    :footer="null"
  >
    <a-tabs>
      <a-tab-pane v-for="(item, index) in tableData" :key="index" :tab="item.name+''">
        <pre ><code v-html="item.content"></code></pre>
      </a-tab-pane>
    </a-tabs>
  </a-modal>

</template>
<script>
import 'highlight.js/styles/github-gist.css'
import { FormMixin } from '@/mixins/FormMixin'
import { codeGenPreview } from '@/api/sysTool/genCode'

export default {
  name: 'ShowCode',
  mixins: [FormMixin],
  data () {
    return {
      tableData: [],
      defaultActiveKey: null
    }
  },
  methods: {
    edit (tableName) {
      codeGenPreview(tableName).then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>
