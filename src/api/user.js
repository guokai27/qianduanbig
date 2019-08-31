import request from '@/scripts/request'
import { getUserId } from '@/scripts/auth'

export function getUserInfo () {
  const id = getUserId()
  return request({
    url: '/user/' + id + '/info',
    method: 'get'
  })
}

export function updateAccount (data) {
  const id = getUserId()
  return request({
    url: '/user/' + id + '/account',
    method: 'post',
    data
  })
}

export function deleteProject (data, key) {
  const id = getUserId()
  return request({
    url: '/user/' + id + '/projects/' + key,
    method: 'post',
    data
  })
}

export function updateProject (data) {
  const id = getUserId()
  return request({
    url: '/user/' + id + '/projects',
    method: 'post',
    data
  })
}
