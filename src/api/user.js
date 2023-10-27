import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/domain/user/login',
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: '/domain/user/info',
    method: 'get'
    //params: { token }
  })
}

export function logout () {
  return request({
    url: '/domain/user/logout',
    method: 'post'
  })
}
