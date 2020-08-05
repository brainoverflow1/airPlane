import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/model_calculate',
    method: 'get',
    params
  })
}
export function getOptions(params) {
  return request({
    url: '/filter_condition_fields',
    method: 'get',
    params
  })
}
