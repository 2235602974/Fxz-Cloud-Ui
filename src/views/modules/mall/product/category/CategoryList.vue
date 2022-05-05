<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="14">
        <a-card>
          <template #title>
            <a-icon type="appstore" theme="twoTone" />
            全部分类
          </template>
          <div>
            <a-tree
              defaultExpandAll
              :replaceFields="{children:'children', title:'name', key:'id' }"
              :tree-data="treeData"
              @select="onSelect"
            >
              <template v-slot:custom="item">
                <span>
                  <a-avatar
                    v-show="item.level===3"
                    :src="getImg(item.iconUrl)"
                    shape="square"
                    size="small"
                    style="width: 20px; height:20px; vertical-align: middle;margin-top: -5px" />
                  {{ item.name }}
                </span>
                <span>
                  <a-button
                    :span="8"
                    v-show="!item.level||item.level !== 3"
                    shape="circle"
                    @click.stop="add(item)">
                    <a-icon type="plus" />
                  </a-button>
                  <a-button
                    :span="8"
                    v-show="item.id !== 0"
                    type="dashed"
                    shape="circle"
                    @click.stop="edit(item)">
                    <a-icon type="edit" />
                  </a-button>
                  <a-button
                    :span="8"
                    v-show="item.id && (!item.children || item.children.length <= 0)"
                    type="danger"
                    shape="circle"
                    @click.stop="remove(item)">
                    <a-icon type="delete" />
                  </a-button>
                </span>
              </template>
            </a-tree>
          </div>
        </a-card>
      </a-col>
      <a-col :span="10">
        <a-card>
          <template #title>
            <a-icon type="appstore" theme="twoTone" />
            规格属性
          </template>
          <a-card>
            <a-row>
              <a-col :span="12">
                <a-tag v-if="selectNode && selectNode.name" color="#87d068">{{ selectNode.name }} 基本属性</a-tag>
                <a-tag v-else>请选择商品分类</a-tag>
              </a-col>
              <a-col :span="12" style="text-align: right">
                <a-button @click.prevent="submitForm(2)" type="primary" :disabled="!selectNode||!selectNode.name">
                  <a-icon type="check" />
                  提交
                </a-button>
              </a-col>
            </a-row>

            <a-row style="margin-top: 10px">
              <a-form-model
                :model="formData">
                <a-form-model-item
                  v-for="(item, index) in formData.attributes"
                  :key="index"
                  :label="'基本属性' + (index + 1)"
                  :prop="'attributes.' + index + '.name'"
                  :rules="rules.attribute.name">
                  <a-input v-model="item.name" style="width: 300px" />

                  <a-button
                    v-if="index === 0"
                    @click.prevent="handleAdd"
                    shape="circle"
                    style="margin-left: 15px">
                    <a-icon type="plus" />
                  </a-button>

                  <a-button
                    @click.prevent="handleDelete(index)"
                    type="danger"
                    shape="circle"
                    style="margin-left: 15px">
                    <a-icon type="delete" />
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </a-row>
          </a-card>
          <a-card>
            <a-row>
              <a-col :span="12">
                <a-tag v-if="selectNode && selectNode.name" color="#87d068">{{ selectNode.name }} 商品规格</a-tag>
                <a-tag v-else>请选择商品分类</a-tag>
              </a-col>
              <a-col :span="12" style="text-align: right">
                <a-button @click.prevent="submitForm(1)" type="primary" :disabled="!selectNode||!selectNode.name">
                  <a-icon type="check" />
                  提交
                </a-button>
              </a-col>
            </a-row>

            <a-row style="margin-top: 10px">
              <a-form-model
                :model="formData2">
                <a-form-model-item
                  v-for="(item, index) in formData2.attributes"
                  :key="index"
                  :label="'基本属性' + (index + 1)"
                  :prop="'attributes.' + index + '.name'"
                  :rules="rules.attribute.name">
                  <a-input v-model="item.name" style="width: 300px" />

                  <a-button
                    v-if="index === 0"
                    @click.prevent="handleAdd2"
                    shape="circle"
                    style="margin-left: 15px">
                    <a-icon type="plus" />
                  </a-button>

                  <a-button
                    @click.prevent="handleDelete2(index)"
                    type="danger"
                    shape="circle"
                    style="margin-left: 15px">
                    <a-icon type="delete" />
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </a-row>
          </a-card>

        </a-card>
      </a-col>
    </a-row>
    <Category-edit
      :p-node="selectNode"
      ref="categoryEdit"
      @ok="handleOk" />
  </div>
</template>

<script>
import { FormMixin } from '@/mixins/FormMixin'
import { tableObj } from './Categorytemplate'
import { del, page, list } from '@/api/mall/product/category'
import CategoryEdit from './CategoryEdit'
import { TableMixin } from '@/mixins/TableMixin'
import { listAttributes, saveAttributeBatch } from '@/api/mall/product/attribute'

export default {
  name: 'CategoryList',
  components: {
    CategoryEdit
  },
  mixins: [TableMixin, FormMixin],
  data () {
    return {
      formData: {
        categoryId: undefined,
        type: 1,
        attributes: [{
          id: undefined,
          name: ''
        }]
      },
      formData2: {
        categoryId: undefined,
        type: 1,
        attributes: [{
          id: undefined,
          name: ''
        }]
      },
      selectNode: {},
      treeData: [],
      tableObj,
      queryParam: {},
      loadData: (parameter) => {
        return page(Object.assign(parameter, this.queryParam)).then(res => {
          return res.data
        })
      },
      rules: {
        attribute: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    submitForm (flag) {
      this.formData.categoryId = this.selectNode.id
      this.formData2.categoryId = this.selectNode.id

      this.formData.type = flag
      if (flag === 2) {
        saveAttributeBatch(this.formData).then(() => {
          this.$message.success('提交成功')
        })
      } else {
        saveAttributeBatch(this.formData2).then(() => {
          this.$message.success('提交成功')
        })
      }
    },
    handleAdd () {
      this.formData.attributes.push({
        id: undefined,
        name: ''
      })
    },
    handleDelete (index) {
      if (this.formData.attributes.length === 1) {
        this.formData.attributes = [{
          id: undefined,
          name: ''
        }]
        return
      }
      this.formData.attributes.splice(index, 1)
    },
    handleAdd2 () {
      this.formData2.attributes.push({
        id: undefined,
        name: ''
      })
    },
    handleDelete2 (index) {
      if (this.formData2.attributes.length === 1) {
        this.formData2.attributes = [{
          id: undefined,
          name: ''
        }]
        return
      }
      this.formData2.attributes.splice(index, 1)
    },
    getImg (icon) {
      return 'http://127.0.0.1:8301' + icon
    },
    init () {
      list().then(res => {
        this.treeData = []
        const node = { id: 0, name: '全部分类', level: 0, scopedSlots: { 'title': 'custom' } }
        node.children = res.data
        this.treeData.push(node)
      })
    },
    onSelect (selectedKeys, info) {
      this.selectNode = info.selectedNodes[0].data.props.dataRef
      this.listAttributes(this.selectNode.id)
    },
    listAttributes (categoryId) {
      if (categoryId !== undefined) {
        let type = 2
        listAttributes(categoryId, type).then(res => {
          if (res.data && res.data.length > 0) {
            this.formData.attributes = res.data
          } else {
            this.formData.attributes = [{
              id: undefined,
              name: ''
            }]
          }
        })
        type = 1
        listAttributes(categoryId, type).then(res => {
          if (res.data && res.data.length > 0) {
            this.formData2.attributes = res.data
          } else {
            this.formData2.attributes = [{
              id: undefined,
              name: ''
            }]
          }
        })
      } else {
        this.formData.attributes = [{
          id: undefined,
          name: ''
        }]
        this.formData2.attributes = [{
          id: undefined,
          name: ''
        }]
      }
    },
    handleOk () {
      this.init()
    },
    add (item) {
      this.selectNode = item
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
        this.init()
      })
    }
  }
}
</script>

<style scoped>

</style>
