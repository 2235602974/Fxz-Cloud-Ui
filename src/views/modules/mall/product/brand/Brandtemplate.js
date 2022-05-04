export const tableObj = {
  columns: [
    {
      title: '主键',
      field: 'id'
    },
    {
      title: '品牌名称',
      field: 'name'
    },
    {
      title: 'LOGO图片',
      field: 'logoUrl'
    },
    {
      title: '排序',
      field: 'sort'
    },
    {
      title: '创建时间',
      field: 'gmtCreate'
    },
    {
      title: '更新时间',
      field: 'gmtModified'
    },
    {
      title: '操作',
      width: '200px',
      field: 'action',
      slot: true
    }
  ]
}
