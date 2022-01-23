<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="id"
          :hidden="true"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="['id']"
            :readonly="editable || showable"
          />
        </a-form-item>
        <a-form-item
          label="上级菜单"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <biz-select-tree
            :dicUrl="'/sys/permission/select'"
            v-decorator="['parentId',{rules: [{required: true, message: '请选择菜单类型'}]}]"
          >
          </biz-select-tree>
        </a-form-item>
        <a-form-item
          label="菜单类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <biz-select
            :dicUrl="'/sys/dict/type/menuType'"
            @change="handleChangeMenu"
            v-decorator="['type', {rules: [{required: true, message: '请选择菜单类型'}]}]" />
        </a-form-item>
        <a-form-item
          label="名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            :readonly="showable"
            v-decorator="['title', {rules: [{required: true, message: '请输入名称'}]}]" />
        </a-form-item>
        <a-form-item
          label="URL"
          :labelCol="labelCol"
          v-if="menuType !== '2'"
          :wrapperCol="wrapperCol"
        >
          <a-input
            :readonly="showable"
            v-decorator="['url', {rules: [{required: true, message: '请输入权限代码'}]}]" />
        </a-form-item>
        <a-form-item
          label="组件地址"
          :labelCol="labelCol"
          v-if="menuType !== '2'"
          :wrapperCol="wrapperCol"
        >
          <a-input
            :readonly="showable"
            v-decorator="['component', {rules: [{required: true, message: '请输入权限代码'}]}]" />
        </a-form-item>
        <a-form-item
          label="组件名称"
          :labelCol="labelCol"
          v-if="menuType !== '2'"
          :wrapperCol="wrapperCol"
        >
          <a-input
            :readonly="showable"
            v-decorator="['componentName', {rules: [{required: true, message: '请输入权限代码'}]}]" />
        </a-form-item>
        <a-form-item
          label="是否缓存"
          :labelCol="labelCol"
          v-if="menuType !== '2'"
          :wrapperCol="wrapperCol"
        >
          <a-radio-group :options="isOrNoList" v-decorator="['keepAlive', {rules: [{required: true, message: '请选择页面是否缓存'}]}]" />
        </a-form-item>
        <a-form-item
          label="是否隐藏"
          v-if="menuType !== '2'"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-radio-group :options="isOrNoList" v-decorator="['hidden', {rules: [{required: true, message: '请选择页面是否隐藏'}]}]" />
        </a-form-item>
        <a-form-item
          label="权限代码"
          :labelCol="labelCol"
          v-if="menuType === '2'"
          :wrapperCol="wrapperCol"
        >
          <a-input
            :readonly="showable"
            v-decorator="['perms', {rules: [{required: true, message: '请输入权限代码'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>

    <template slot="footer">
      <div v-show="!showable">
        <a-button key="cancel" @click="handleCancel">取消</a-button>
        <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleOk">保存</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { addObj, putObj, getObj } from '@/api/sys/menu'
import { FormMixin } from '@/mixins/FormMixin'
const isOrNoList = [
  {
    label: '是',
    value: '1'
  },
  {
    label: '否',
    value: '0'
  }
]
export default {
  name: 'PermissionAddOrUpdate',
  mixins: [FormMixin],
  data () {
    return {
      isOrNoList,
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      treeData: [],
      menuType: '0'
    }
  },
  methods: {

    edit (tmpRecord, type, permsType) {
      this.visible = true
      const { form: { setFieldsValue, resetFields } } = this
      if (['edit', 'show'].includes(type)) {
        this.confirmLoading = true
        getObj(tmpRecord.id).then(res => {
          const record = res.data
          record.parentId = String(record.parentId)
          this.confirmLoading = false
          this.$nextTick(() => {
            setFieldsValue(pick(record, ['id', 'title', 'type', 'perms', 'parentId', 'url', 'component', 'componentName', 'keepAlive', 'hidden']))
          })
        })
      } else {
        resetFields()
      }
    },
    handleChangeMenu (e) {
      console.log(e, 'e')
      this.menuType = e
    },
    handleOk () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.confirmLoading = true
          try {
            if (this.type === 'add') {
              await addObj(values)
            } else if (this.type === 'edit') {
              await putObj(values)
            }
            setTimeout(() => {
              this.confirmLoading = false
              this.$emit('ok')
              this.visible = false
            }, 1500)
          } catch (err) {
            this.$message.error(err.msg)
            this.confirmLoading = false
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
