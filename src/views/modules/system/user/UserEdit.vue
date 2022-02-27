<template>
  <a-drawer
    :title="title"
    :width="650"
    :mask-closable="showable"
    @close="handleCancel"
    :visible="visible"
    :confirmLoading="confirmLoading">
    <a-spin :spinning="confirmLoading" style="margin-bottom: 3rem">
      <a-form-model
        ref="form"
        :model="form"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :rules="rules">
        <a-form-model-item label="用户名" prop="username">
          <a-input placeholder="请输入用户账号" v-model="form.username" disabled/>
        </a-form-model-item>
        <a-form-model-item label="手机号" prop="mobile">
          <a-input placeholder="请输入用户手机号" v-model="form.mobile"/>
        </a-form-model-item>
        <a-form-model-item label="邮箱" prop="email">
          <a-input placeholder="请输入用户邮箱" v-model="form.email"/>
        </a-form-model-item>
        <a-form-model-item label="描述" prop="email">
          <a-input placeholder="请输入描述" v-model="form.description"/>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
    <div class="drawer-button" >
      <a-button @click="handleCancel" style="margin-right: .8rem">取消</a-button>
      <a-button @click="handleOk" type="primary" :loading="confirmLoading">提交</a-button>
    </div>
  </a-drawer>
</template>

<script>
import { FormMixin } from '@/mixins/FormMixin'
import { getById, updateById } from '@/api/sys/user'

export default {
  name: 'UserEdit',
  mixins: [FormMixin],
  data () {
    return {
      form: {
        id: '',
        name: '',
        username: '',
        phone: '',
        email: '',
        avatar: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        mobile: [{ required: true, message: '请输入手机号' }],
        email: [{ required: true, message: '请输入邮箱' }],
        description: [{ required: true, message: '请输入描述' }]
      }
    }
  },
  methods: {
    edit (id) {
      this.confirmLoading = true
      getById(id).then(res => {
        this.form = res.data
        delete this.form.password
        this.rawForm = { ...this.form }
        this.confirmLoading = false
      })
    },
    handleOk () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.confirmLoading = true
          console.log('valid', valid)
          console.log('form', this.form)
          const newForm = {
            userId: this.form.userId,
            username: this.form.username,
            mobile: this.form.mobile,
            email: this.form.email,
            description: this.form.description
          }
          await updateById(newForm)
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
    validateUsername (rule, value, callback) {
     /* existsUsernameNotId(value, this.form.id).then((res) => {
        if (!res.data) {
          callback()
        } else {
          callback('该账户已存在!')
        }
      }) */
    },
    validatePhone (rule, value, callback) {
      if (!value) {
        callback()
      } else {
        /* const { msg, result } = validateMobile(value)
        if (result) {
         /!* existsPhoneNotId(value, this.form.id).then((res) => {
            if (!res.data) {
              callback()
            } else {
              callback('手机号已存在!')
            }
          }) *!/
        } else {
          callback(msg)
        } */
      }
    },
    validateEmail (rule, value, callback) {
      if (!value) {
        callback()
      } else {
        /* if (validateEmail(value)) {
         /!* existsEmailNotId(value, this.form.id).then((res) => {
            if (!res.data) {
              callback()
            } else {
              callback('邮箱已存在!')
            }
          }) *!/
        } else {
         /!* callback('请输入正确格式的邮箱!') *!/
        } */
      }
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
