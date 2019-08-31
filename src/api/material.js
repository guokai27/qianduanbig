import request from '@/scripts/request'

export function fetchMaterialList (query) { // 获取数据表列表
  return request({
    url: '/material/list',
    // url: 'https://easy-mock.com/mock/5c7ce20ccdc04f0e04185d9b/example/material',
    method: 'get',
    params: query
  })
}
export function getView (hash) { // 查看
  return request({
    url: '/material/' + hash + '/view',
    method: 'get'
  })
}

export function uploadCsv (filedata) { // 上传
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/material/csv',
    method: 'post',
    data: filedata
  })
}

export function updateCsv (filedata, hash) { // 更新数据表
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/material/' + hash + '/update',
    method: 'post',
    data: filedata
  })
}

export function createType (param) { // 保存csv类型
  return request({
    url: '/material/' + param.hash + '/save',
    method: 'post',
    data: param
  })
}

export function cancelType (hash) {
  return request({
    url: '/material/' + hash + '/cancel',
    method: 'get'
  })
}

export function createTemplate (data) {
  return request({
    url: '/templates',
    method: 'post',
    data
  })
}

export function deleteMaterial (hash) {
  return request({
    url: '/material/' + hash + '/delete',
    method: 'delete'
  })
}
