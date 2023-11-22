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
    url: 'course/add',
    method: 'post',
    data
  })
}

export function getmhomework (data) {
  return request({
    url: 'peer/Allwork',
    method: 'get',
    params: data
  })
}

export function getcomment (data) {
  return request({
    url: 'homework/submit/update',
    method: 'put',
    data
  })
}

export function getemail (data) {
  return request({
    url: 'homework/appeal',
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
    url: 'homework/details',
    method: 'get',
    params: data
  })
}

export function getexhomework (data) {
  return request({
    url: 'peer/updateEvaluation',
    method: 'post',
    data
  })
}

export function getdelete (data) {
  return request({
    url: 'homework/delete/one',
    method: 'delete',
    params: data
  })
}

export function getdata (data) {
  return request({
    url: 'homework/one',
    method: 'get',
    params: data
  })
}

export function getoutcome (data) {
  return request({
    url: 'homework/one',
    method: 'get',
    params: data
  })
}

export function getreason (data) {
  return request({
    url: 'homework/one',
    method: 'get',
    params: data
  })
}

export function getappeal (data) {
  return request({
    url: 'homework/one',
    method: 'get',
    params: data
  })
}

export function getcancel (data) {
  return request({
    url: 'homework/one',
    method: 'get',
    params: data
  })
}

