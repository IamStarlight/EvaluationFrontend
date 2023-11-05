import request from '@/utils/request'

export function getList() {
  return request({
    url: '/course/teacher',
    method: 'get',
    //params
  })
}

// export function getList2 (titles) {
//   var con = {};
//   con['title'] = titles;
//   con = JSON.stringify(con);
//   return request({
//     url: 'course/student/admin',
//     method: 'get',
//     params: { title: titles }
//   })
// }
