import request from '@/utils/request';

//老师发布一个作业(已改)
export function deliverHomework(data) {
  return request({
    url: '/homework/create',
    method: 'post',
    data
  });
}

export  function intoDraft(data){
  return request({
    url: '/homework/draft',
    method: 'post',
    data
  });
}

//查看老师已经发布的所有作业(11)
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

//获取某个作业中所有学生的作业
export function getHomework (data) {
  return request({
    url: '/homework/submitlist',
    method: 'get',
    params :data
  })
}

//获取一个学生一次作业的具体内容
export function getStudentHomework (data) {
  return request({
    url: '/homework/info',
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

//展示未提交的作业
export function listDraft (cid) {
  return request({
    url: '/homework/draft',
    method: 'get',
    params: {cid}
  })
}

export function evaluate(wid){
  return request({
    url: '/homework/evaluate',
    method: 'post',
    params: wid
  })
}

