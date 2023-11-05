import request from '@/utils/request';

export function getUserInfo () {
  return request({
    url: '/user/info',
    method: 'get'
  });
}

export function changePassword(data) {
  return request({
    url: '/user/password/user',
    method: 'post',
    params:data
  });
}
