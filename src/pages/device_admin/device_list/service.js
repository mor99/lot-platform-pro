
import axios from 'axios'

const instance = axios.create({
    headers: {'Content-Type': 'application/json'}
  });

// 获取子设备列表
export async function getDeviceList(gatewayId) {
    return instance.get(`/api/gateway/${gatewayId}`)
}

// 添加子设备
export async function addDevice(gatewayId,data) {
    return instance.post(`/api/gateway/${gatewayId}/device`,
    JSON.stringify(data)
    )
}