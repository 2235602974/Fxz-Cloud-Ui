export const tableObj = {
  columns: [
    { title: '商品名称', dataIndex: 'name', key: 'name', width: '100px' },
    { title: '商品图片', dataIndex: 'picUrl', key: 'picUrl', scopedSlots: { customRender: 'picUrl' }, width: '100px' },
    { title: '商品类目', dataIndex: 'categoryName', key: 'categoryName', width: '100px' },
    { title: '商品品牌', dataIndex: 'brandName', key: 'brandName', width: '100px' },
    { title: '零售价', dataIndex: 'originPrice', key: 'originPrice', scopedSlots: { customRender: 'originPrice' }, width: '120px' },
    { title: '促销价', dataIndex: 'price', key: 'price', scopedSlots: { customRender: 'price' }, width: '120px' },
    { title: '销量', dataIndex: 'sales', key: 'sales', width: '80px' },
    { title: '单位', dataIndex: 'unit', key: 'unit', width: '80px' },
    { title: '描述', dataIndex: 'description', key: 'description', width: '80px' },
    { title: '商品详情', dataIndex: 'detail', key: 'detail', scopedSlots: { customRender: 'detail' }, width: '100px' },
    { title: '操作', dataIndex: 'action', key: 'action', scopedSlots: { customRender: 'action' }, width: '80px' }
  ],
  skuColumns: [
    { title: '库存编码', dataIndex: 'skuSn', key: 'skuSn', width: '80px' },
    { title: '商品规格', dataIndex: 'name', key: 'name', width: '80px' },
    { title: '图片', dataIndex: 'picUrl', key: 'picUrl', scopedSlots: { customRender: 'picUrl' }, width: '80px' },
    { title: '现价', dataIndex: 'price', key: 'price', width: '80px', scopedSlots: { customRender: 'price' } },
    { title: '库存', dataIndex: 'stockNum', key: 'stockNum', width: '80px' }
  ]
}
