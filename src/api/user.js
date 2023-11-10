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

export function fetchList (data) {
  return request({
    url: 'user/all',
    method: 'get',
    params: data
  })
}

export function fetchListpermission (data) {
  return request({
    url: 'user/register',
    method: 'post',
    data
  })
}

export function fetchListid (data) {
  return request({
    url: 'user/oneinfo',
    method: 'get',
    params: data
  })
}

export function fetchListall (data) {
  return request({
    url: 'user/oneinfo',
    method: 'get',
    params: data
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
    method: 'put',
    data
  })
}

export function deleteinfo (data) {
  return request({
    url: 'user/delete',
    method: 'delete',
    params: data
  })
}

export function reset (data) {
  return request({
    url: 'user/password',
    method: 'put',
    params: data
  })
}
