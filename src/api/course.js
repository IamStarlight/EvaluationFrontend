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
    method: 'post',
    data
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
    url: 'user/register',
    method: 'post',
    data
  })
}

export function deleteinfo (data) {
  return request({
    url: 'user/delete',
    method: 'post',
    params: data
  })
}

export function fetchcourseList (data) {
  return request({
    url: 'user/delete',
    method: 'post',
    params: data
  })
}

export function createcourseinfo (data) {
  return request({
    url: 'user/register',
    method: 'post',
    data
  })
}

export function deletecourseinfo (data) {
  return request({
    url: 'user/delete',
    method: 'post',
    params: data
  })
}


export function getAll () {
  return request({
    url: 'course/student',
    method: 'get',
  })
}
