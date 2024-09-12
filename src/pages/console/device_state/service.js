import request from '@/utils/request';

// 获取网关列表
export async function getGateway() {
    return request.get('/api/gateway')
  }

// 获取子设备列表
export async function getDeviceList(gatewayId) {
    return request.get(`/api/monitor/dataStructure/${gatewayId}`)
}