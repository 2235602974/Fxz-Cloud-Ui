import { axios } from '@/utils/request'

/**
 * 批量保存
 */
export function addGoods (obj) {
  return axios({
    url: '/product/goods/add',
    method: 'POST',
    data: obj
  })
}

/**
 * 分页
 */
export function page (params) {
  return axios({
    url: '/product/goods/page',
    method: 'GET',
    params: params
  })
}
