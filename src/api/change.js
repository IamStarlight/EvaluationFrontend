import request from '@/utils/request';

export function getUserInfo() {
  return request({
    url: '/vue-admin-template/change/userInfo',
    method: 'get'
  });
}

export function changePassword(newPassword) {
  return request({
    url: '/vue-admin-template/change/changepassword',
    method: 'post',
    data: {
      newPassword
    }
  });
}
