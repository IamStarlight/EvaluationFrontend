import request from '@/utils/request'

export function getList () {
  return request({
    url: 'user/all/student',
    method: 'get',
  })
}

export function fetchListid (data) {
  return request({
    url: 'course/info',
    method: 'get',
    params: data
  })
}

export function fetchList (data) {
  return request({
    url: 'course/all',
    method: 'get',
    data
  })
}

export function createinfo (data) {
  return request({
    url: 'course/add',
    method: 'post',
    data
  })
}

export function deleteinfo (data) {
  return request({
    url: 'course/delete',
    method: 'delete',
    params: data
  })
}

export function fetchcourseList (data) {
  return request({
    url: 'sc/list',
    method: 'get',
    params: data
  })
}

export function createcourseinfo (data) {
  return request({
    url: 'sc/add',
    method: 'post',
    params: data
  })
}

export function deletecourseinfo (data) {
  return request({
    url: 'sc/delete',
    method: 'delete',
    params: data
  })
}

export function getAll () {
  return request({
    url: 'course/student',
    method: 'get',
  })
}

export function getAllhomework (data) {
  return request({
    url: 'homework/info',
    method: 'get',
    params: data
  })
}

export function getpdf (data) {
  return request({
    url: 'file/upload/student',
    method: 'post',
    data
  })
}

export function getmhomework (data) {
  return request({
    url: 'peer/evaluating',
    method: 'get',
    params: data
  })
}

export function getmhomework1 (data) {
  return request({
    url: 'peer/deadline',
    method: 'get',
    params: data
  })
}

export function getcomment (data) {
  return request({
    url: 'submit/update',
    method: 'put',
    data
  })
}

export function getemail (data) {
  return request({
    url: 'appeal/homework',
    method: 'put',
    data
  })
}

export function getdetail (data) {
  return request({
    url: 'homework/one',
    method: 'get',
    params: data
  })
}

export function getdetailmy (data) {
  return request({
    url: 'submit/details',
    method: 'get',
    params: data
  })
}

export function getexhomework (data) {
  return request({
    url: 'peer/evaluate',
    method: 'put',
    data
  })
}

export function getexchomework (data) {
  return request({
    url: 'peer/evaluating/one',
    method: 'get',
    params: data
  })
}

export function getdelete (data) {
  return request({
    url: 'submit/delete',
    method: 'delete',
    params: data
  })
}
//统计图
export function getdata90 (data) {
  return request({
    url: 'statistics/nighties',
    method: 'get',
    params: data
  })
}

export function getdata80 (data) {
  return request({
    url: 'statistics/eighties',
    method: 'get',
    params: data
  })
}

export function getdata70 (data) {
  return request({
    url: 'statistics/seventies',
    method: 'get',
    params: data
  })
}
export function getdata60 (data) {
  return request({
    url: 'statistics/sixties',
    method: 'get',
    params: data
  })
}

export function getdatadown (data) {
  return request({
    url: 'statistics/failed',
    method: 'get',
    params: data
  })
}

export function getoutcome (data) {
  return request({
    url: 'submit/details',
    method: 'get',
    params: data
  })
}

export function getreason (data) {
  return request({
    url: 'appeal/one',
    method: 'get',
    params: data
  })
}

export function getappeal (data) {
  return request({
    url: 'appeal/all',
    method: 'get',
    params: data
  })
}

export function getcancle (data) {
  return request({
    url: 'appeal/cancel',
    method: 'put',
    params: data
  })
}

export function gethomenotice (data) {
  return request({
    url: 'statistics/all/missed',
    method: 'get',
  })
}
