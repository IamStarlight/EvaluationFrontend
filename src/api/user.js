import request from '@/utils/request'

export function login (data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: 'user/info',
    method: 'get'
    //params: { token }
  })
}

export function logout () {
  return request({
    url: 'user/logout',
    method: 'post'
  })
}

export function fetchList () {
  return request({
    url: 'user/all/student',
    method: 'get',
  })
}


export function createinfo (data) {
  return request({
    url: 'user/register',
    method: 'post',
    data
  })
}

export function updateinfo (data) {
  return request({
    url: 'user/update',
    method: 'post',
    data
  })
}

export function deleteinfo (data) {
  return request({
    url: 'user/delete',
    method: 'post',
    params: data
  })
}

export function reset (data) {
  return request({
    url: 'user/update/password',
    method: 'post',
    params: data
  })
}
