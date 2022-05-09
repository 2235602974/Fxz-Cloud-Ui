export const tableObj = {
  columns: [
    { title: '商品名称', dataIndex: 'name', key: 'name' },
    { title: '商品图片', dataIndex: 'picUrl', key: 'picUrl', scopedSlots: { customRender: 'picUrl' } },
    { title: '商品类目', dataIndex: 'categoryName', key: 'categoryName' },
    { title: '商品品牌', dataIndex: 'brandName', key: 'brandName' },
    { title: '零售价', dataIndex: 'originPrice', key: 'originPrice' },
    { title: '促销价', dataIndex: 'price', key: 'price' },
    { title: '销量', dataIndex: 'sales', key: 'sales' },
    { title: '单位', dataIndex: 'unit', key: 'unit' },
    { title: '描述', dataIndex: 'description', key: 'description' }
  ],
  skuColumns: [
    { title: '库存编码', dataIndex: 'skuSn', key: 'skuSn' },
    { title: '商品规格', dataIndex: 'name', key: 'name' },
    { title: '图片', dataIndex: 'picUrl', key: 'picUrl', scopedSlots: { customRender: 'picUrl' } },
    { title: '现价', dataIndex: 'price', key: 'price' },
    { title: '库存', dataIndex: 'stockNum', key: 'stockNum' }
  ]
}
