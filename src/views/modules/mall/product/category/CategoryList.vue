<template>
  <div >
    <a-row :gutter="16">
      <a-col :span="16">
        <a-card >
          <template #title>
            <a-icon type="appstore" theme="twoTone" />
            全部分类
          </template>
          <div >
            <a-tree
              defaultExpandAll
              :replaceFields="{children:'children', title:'name', key:'id' }"
              :tree-data="treeData"
              @select="onSelect"
            >
              <template v-slot:custom="item">
                <span>
                  <a-avatar v-show="item.level===3" :src="item.iconUrl" shape="square" size="small" style="width: 20px; height:20px; vertical-align: middle;margin-top: -5px"/>
                  {{ item.name }}
                </span>
                <span>
                  <a-button
                    v-show="!item.level||item.level !== 3"
                    shape="circle"
                    @click.stop="add(item)" >
                    <a-icon type="plus" />
                  </a-button>
                  <a-button
                    v-show="item.id !== 0"
                    type="dashed"
                    shape="circle"
                    @click.stop="edit(item)" >
                    <a-icon type="edit" />
                  </a-button>
                  <a-button
                    v-show="item.id && (!item.children || item.children.length <= 0)"
                    type="danger"
                    shape="circle"
                    @click.stop="remove(item)" >
                    <a-icon type="delete" />
                  </a-button>
                </span>
              </template>
            </a-tree>
          </div>

        </a-card>
      </a-col>
      <a-col :span="8" >
        <a-card title="规格属性">
          <a-tree
            defaultExpandAll
            :tree-data="treeData"
            @select="onSelect"
          >
            <template #title="{ title, key }">
              <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
              <template v-else>{{ title }}</template>
            </template>
          </a-tree>
        </a-card>
      </a-col>
    </a-row>
    <Category-edit
      ref="categoryEdit"
      @ok="handleOk" />
  </div>
</template>

<script>
import { tableObj } from './Categorytemplate'
import { del, page, list } from '@/api/mall/product/category'
import CategoryEdit from './CategoryEdit'
import { TableMixin } from '@/mixins/TableMixin'

export default {
  name: 'CategoryList',
  components: {
    CategoryEdit
  },
  mixins: [TableMixin],
  data () {
    return {
      treeData: [],
      tableObj,
      queryParam: {},
      loadData: (parameter) => {
        return page(Object.assign(parameter, this.queryParam)).then(res => {
          return res.data
        })
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      list().then(res => {
        const node = { id: 0, name: '全部分类', level: 0, scopedSlots: { 'title': 'custom' } }
        node.children = res.data
        this.treeData.push(node)
      })
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      console.log('selectedKeys', selectedKeys)
    },
    handleOk () {
      this.queryPage()
    },
    add () {
      this.$refs.categoryEdit.init('', 'add')
    },
    edit (record) {
      this.$refs.categoryEdit.init(record.id, 'edit')
    },
    show (record) {
      this.$refs.categoryEdit.init(record.id, 'show')
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
