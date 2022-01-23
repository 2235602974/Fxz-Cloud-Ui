export const FormMixin = {
  data () {
    return {
      title: '新增',
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 18
      },
      visible: false,
      editable: false,
      addable: false,
      showable: false,
      type: 'add'
    }
  },
  methods: {
    init (id, type, ...vars) { // 初始化表单
      if (type && type === 'add') {
        this.addable = true
        this.type = type
        this.title = '新增'
      }
      if (type === 'edit') {
        this.editable = true
        this.type = type
        this.title = '修改'
      }
      if (type === 'show') {
        this.showable = true
        this.type = type
        this.title = '查看'
      }
      this.edit(id, type, ...vars)
    },
    edit () {},
    handleCancel () {
      this.visible = false
      setTimeout(() => {
        this.addable = false
        this.showable = false
        this.editable = false
      }, 200)
    }
  }
}
