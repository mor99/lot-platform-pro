import request from '@/utils/request';
// 获取网关列表
export async function getGateway() {
    return request.get('/api/gateway')
  }
// 获取监控信息
export async function monitor(gatewayId){
    return request.get(`/api/monitor/${gatewayId}`)
}