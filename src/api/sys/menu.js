import { axios } from '@/utils/request'

export function fetchList () {
  return axios({
    url: '/sys/permission/tree',
    msthod: 'GET'
  })
}

export function fetchTree () {
  return axios({
    url: '/sys/permission/select',
    method: 'GET'
  })
}

export function getObj (id) {
  return axios({
    url: '/sys/permission/info/' + id,
    method: 'GET'
  })
}

export function addObj (obj) {
  return axios({
    url: '/sys/permission/save',
    method: 'POST',
    data: obj
  })
}

export function putObj (obj) {
  return axios({
    url: '/sys/permission/update',
    method: 'POST',
    data: obj
  })
}

export function delObj (id) {
  return axios({
    url: '/sys/permission/delete/' + id,
    method: 'DELETE'
  })
}
