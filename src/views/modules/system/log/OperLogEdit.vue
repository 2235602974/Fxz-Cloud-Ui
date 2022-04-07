<template>
  <a-modal
    :title="title"
    :width="modalWidth"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="主键" prop="id" hidden="true">
        <a-input v-model="form.id" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="主键"
        prop="id"
      >
        <a-input v-model="form.id" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="模块标题"
        prop="title"
      >
        <a-input v-model="form.title" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="业务类型（0其它 1新增 2修改 3删除）"
        prop="businessType"
      >
        <a-input v-model="form.businessType" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="方法名称"
        prop="method"
      >
        <a-input v-model="form.method" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="请求方式"
        prop="requestMethod"
      >
        <a-input v-model="form.requestMethod" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="操作人员"
        prop="operName"
      >
        <a-input v-model="form.operName" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="请求URL"
        prop="operUrl"
      >
        <a-input v-model="form.operUrl" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="主机地址"
        prop="operIp"
      >
        <a-input v-model="form.operIp" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="请求参数"
        prop="operParam"
      >
        <a-input v-model="form.operParam" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="操作状态（0正常 1异常）"
        prop="status"
      >
        <a-input v-model="form.status" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="错误消息"
        prop="errorMsg"
      >
        <a-input v-model="form.errorMsg" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="执行时间"
        prop="time"
      >
        <a-input v-model="form.time" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="创建时间"
        prop="createTime"
      >
        <a-input v-model="form.createTime" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="更新时间"
        prop="updateTime"
      >
        <a-input v-model="form.updateTime" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="创建人"
        prop="createBy"
      >
        <a-input v-model="form.createBy" :disabled="showable" />
      </a-form-model-item>
      <a-form-model-item
        label="更新人"
        prop="updateBy"
      >
        <a-input v-model="form.updateBy" :disabled="showable" />
      </a-form-model-item>
    </a-form-model>

    <template v-slot:footer>
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button v-if="!showable" key="forward" :loading="confirmLoading" type="primary" @click="handleOk">保存</a-button>
    </template>
  </a-modal>
</template>

<script>
import { FormMixin } from '@/mixins/FormMixin'
import { add, get, update } from '@/api/sys/operLog'

export default {
  name: 'OperLogEdit',
  mixins: [FormMixin],
  data () {
    return {
      form: {
        id: null,
        title: null,
        businessType: null,
        method: null,
        requestMethod: null,
        operName: null,
        operUrl: null,
        operIp: null,
        operParam: null,
        status: null,
        errorMsg: null,
        time: null,
        createTime: null,
        updateTime: null,
        createBy: null,
        updateBy: null
      },
      rules: {}
    }
  },
  methods: {
    edit (id, type) {
      this.resetForm()
      if (['edit', 'show'].includes(type)) {
        this.confirmLoading = true
        get(id).then(res => {
          this.form = res.data
          this.confirmLoading = false
        })
      } else {
        this.confirmLoading = false
      }
    },
    handleOk () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.confirmLoading = true
          if (this.type === 'add') {
            await add(this.form)
          } else if (this.type === 'edit') {
            await update(this.form)
          }
          setTimeout(() => {
            this.confirmLoading = false
            this.$emit('ok')
            this.visible = false
          }, 200)
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    }
  }
}
</script>

<style scoped>

</style>
