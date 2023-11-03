import request from '@/utils/request'

export function getList (titles) {
  var con = {};
  con['title'] = titles;
  con = JSON.stringify(con);
  return request({
    url: 'course/student/admin',
    method: 'get',
    params: { title: titles }
  })
}

export function getAll () {
  return request({
    url: 'course/student',
    method: 'get',
  })
}