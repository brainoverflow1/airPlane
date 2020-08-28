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
export function getOcssList(params) {
  return request({
    url: '/ocss_model_calculate',
    method: 'get',
    params
  })
}
export function getOcssOptions(params) {
  return request({
    url: '/ocss_filter_condition_fields',
    method: 'get',
    params
  })
}
export function getThirdList(params) {
  return request({
    url: '/third_platform',
    method: 'get',
    params
  })
}
export function getThirdOptions(params) {
  return request({
    url: '/third_filter_condition_fields',
    method: 'get',
    params
  })
}
