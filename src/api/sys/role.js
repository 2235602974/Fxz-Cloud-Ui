import { axios } from '@/utils/request'

export function getAllRole () {
  return axios({
    url: '/system/role/getAllRole',
    method: 'GET'
  })
}
