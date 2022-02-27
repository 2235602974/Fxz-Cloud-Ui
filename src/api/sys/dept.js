import { axios } from '@/utils/request'

export function getDeptTree () {
  return axios({
    url: '/system/dept/getDeptTree',
    method: 'GET'
  })
}
