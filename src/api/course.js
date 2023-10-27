import request from '@/utils/request'

export function getList (titles) {
  var con = {};
  con['title'] = titles;
  con = JSON.stringify(con);
  return request({
    url: '/vue-admin-template/course/search',
    method: 'get',
    params: { title: titles }
  })
}

export function getAll (sid) {
  return request({
    url: '/vue-admin-template/course/all',
    method: 'get',
    params: { sid: sid }
  })
}