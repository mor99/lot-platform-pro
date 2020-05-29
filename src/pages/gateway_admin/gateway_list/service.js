import request from '@/utils/request';
import axios from 'axios'

const instance = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

export async function queryRule(params) {
  return request('/api/rule', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
// 获取网关信息
export async function getGatewayInfo(id) {
  return instance.get(`/api/gateway/${id}`)
}
// 获取网关列表
export async function getGateway() {
  return instance.get('/api/gateway')
}

// 添加网关
export async function addGateway(params) {
  return instance.post(`/api/gateway`, JSON.stringify({ gatewayInfo: params }))
}
// 编辑网关
export async function editGateway(id, params) {
  return instance.put(`/api/gateway/${id}`,
    JSON.stringify(params)
  )
}

// 删除多个网关
export async function deleteGateway(params) {
  return instance.delete('/api/gateway',
    { data: JSON.stringify(params) })
}