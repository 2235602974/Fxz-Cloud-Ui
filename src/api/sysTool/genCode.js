import { axios } from '@/utils/request'

export function PageDataTable (param) {
  return axios({
    url: '/generate/gen/table/page',
    method: 'GET',
    params: param
  })
}

export function editRole (data) {
  return axios({
    url: '/generate/role/editRole',
    method: 'PUT',
    data: data
  })
}

export function codeGenPreview (tableName) {
  return axios({
    url: '/generate/gen/code/codeGenPreview',
    method: 'GET',
    params: { tableName: tableName }
  })
}

/**
 * 下载
 */
export function genCodeZip (tableName) {
  return axios({
    url: '/generate/gen/code/genCodeZip',
    method: 'GET',
    responseType: 'blob',
    params: { tableName: tableName }
  })
}
