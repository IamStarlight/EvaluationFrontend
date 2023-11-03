import request from '@/utils/request';

export function getUserInfo () {
  return request({
    url: '/domain/user/userInfo',
    method: 'get'
  });
}

export function changePassword (newPassword) {
  return request({
    url: '/domain/user/changePassword',
    method: 'post',
    data: {
      newPassword
    }
  });
}
