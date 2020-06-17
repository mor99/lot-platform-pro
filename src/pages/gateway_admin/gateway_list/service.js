import request from '@/utils/request';

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
  return request.get(`/api/gateway/${id}`)
}
// 获取网关列表
export async function getGateway() {
  return request.get('/api/gateway')
}

// 添加网关
export async function addGateway(params) {
  return request.post(`/api/gateway`, { data: JSON.stringify(params) })
}
// 编辑网关
export async function editGateway(id, params) {
  return request.put(`/api/gateway/${id}`,
    { data: JSON.stringify(params) }
  )
}

// 删除多个网关
export async function deleteGateway(params) {
  return request.delete('/api/gateway',
    { data: JSON.stringify({ gatewayList: params.idList }) })
} 