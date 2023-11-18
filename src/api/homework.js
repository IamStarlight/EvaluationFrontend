import request from '@/utils/request';

//1.distribute.vue界面
//老师发布一个作业(已改)
export function deliverHomework(data) {
  return request({
    url: '/homework/create',
    method: 'post',
    data
  });
}
//作业存入草稿
export  function intoDraft(data){
  return request({
    url: '/homework/draft',
    method: 'post',
    data
  });
}


//2.distributed界面
export function listHomework(cid) {
  return request({
    url: '/homework/bycourse',
    method: 'get',
    params: {cid}
  });
}

//删除某门作业
export function deleteHomework(data) {
  return request({
    url: '/homework/delete',
    method: 'delete',
    params:data
  });
}
//发布互评
export function evaluate(data){
  return request({
    url: '/homework/startEvaluate',
    method: 'post',
    params: data
  })
}



//3.box界面
//获取某个作业中所有学生的作业
export function getHomework (data) {
  return request({
    url: '/homework/submitlist',
    method: 'get',
    params :data
  })
}



//4.grading界面
//获取一个学生一次作业的具体内容
export function getStudentHomework (data) {
  return request({
    url: '/homework/detail',
    method: 'get',
    params:data
  })
}
//上传成绩和评语
export function updateScore(data) {
  return request({
    url: '/homework/evaluate',
    method: 'put',
    data
  });
}


//5.draft界面
//展示草稿
export function listDraft (cid) {
  return request({
    url: '/homework/draft',
    method: 'get',
    params: {cid}
  })
}
//删除一个草稿
export function deleteDraft(data) {
  return request({
    url: '/homework/draft/delete',
    method: 'delete',
    params:data
  });
}
//直接发布
export function submitDirectly(data){
  return request({
    url: '/homework/draft/submit',
    method: 'post',
    params: data
  })
}


//6.modify界面
//获取一个草稿的具体内容
export function listDraftDetail (wid) {
  return request({
    url: '/homework/draft/detail',
    method: 'get',
    params: {wid}
  })
}
//草稿发布，存入草稿，可以直接用1中的



//7.email界面
//展示所有申诉
export function listEmail (cid) {
  return request({
    url: '/homework/email',
    method: 'get',
    params: {cid}
  })
}
//删除一个申诉
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
    url: '/homework/email/detail',
    method: 'get',
    params: {data}
  })
}
//修改老师评分
export function updateTeacherGrade(data) {
  return request({
    url: '/homework/updateGrade',
    method: 'put',
    data
  });
}
//重发互评
export function reEvaluate(data){
  return request({
    url: '/homework/reEvaluate',
    method: 'post',
    params: data
  })
}

