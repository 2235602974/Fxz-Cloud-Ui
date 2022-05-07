export const tableObj = {
  columns: [
    {
      title: '商品属性',
      dataIndex: 'name',
      key: 'name',
      scopedSlots: { customRender: 'name' }
    },
    {
      title: '属性值',
      dataIndex: 'value',
      key: 'value',
      scopedSlots: { customRender: 'value' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '80px',
      scopedSlots: { customRender: 'action' }
    }
  ]
}
