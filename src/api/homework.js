import request from '@/utils/request';

//1.distribute.vue界面
//老师发布一个作业(已改)
export function deliverHomework(data) {
  return request({
    url: '/homework/create',//deal
    method: 'post',
    data
  });
}

//2.distributed界面
export function listHomework(cid) {
  return request({
    url: '/homework/course',//deal
    method: 'get',
    params: {cid}
  });
}

//删除某门作业
export function deleteHomework(data) {
  return request({
    url: '/homework/delete',//deal
    method: 'delete',
    params:data
  });
}
//发布互评
export function evaluate(data){
  return request({
    url: '/peer/open',//deal
    method: 'put',
    params: data
  })
}

//3.box界面
//获取某个作业中所有学生的作业
export function getHomework (data) {
  return request({
    url: '/submit/list',//deal
    method: 'get',
    params :data
  })
}

//4.grading界面
//获取一个学生一次作业的具体内容
export function getStudentHomework (data) {
  return request({
    url: '/submit/details',//deal
    method: 'get',
    params:data
  })
}
//上传成绩和评语
export function updateScore(data) {
  return request({
    url: '/homework/evaluate',//deal
    method: 'put',
    data
  });
}


//5.draft界面
//展示草稿
export function listDraft (cid) {
  return request({
    url: '/homework/draft',//deal
    method: 'get',
    params: {cid}
  })
}


//6.modify界面
//获取一个草稿的具体内容
export function listDraftDetail (data) {
  return request({
    url: '/homework/list',//deal
    method: 'get',
    params: data
  })
}
//草稿发布，存入草稿
export function deliverDraft(data) {
  return request({
    url: '/homework/edit',
    method: 'post',
    data
  });
}

//7.email界面
//展示所有申诉
export function listEmail (cid) {
  return request({
    url: '/appeal/all',//deal
    method: 'get',
    params: {cid}
  })
}
//删除一个申诉:再说吧
export function deleteEmail(data) {
  return request({
    url: '/email/delete',
    method: 'delete',
    params:data
  });
}

//8.detail界面
//一个申诉的具体内容
export function listEmailDetail (data) {
  return request({
    url: '/appeal/one',//deal
    method: 'get',
    params: data
  })
}
//修改老师评分,用之前那个
// export function updateTeacherGrade(data) {
//   return request({
//     url: '/homework/evaluate',
//     method: 'put',
//     data
//   });
// }
//重发互评，再说吧
export function reEvaluate(data){
  return request({
    url: '/homework/reEvaluate',
    method: 'post',
    params: data
  })
}

