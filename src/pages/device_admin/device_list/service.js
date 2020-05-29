import axios from 'axios'

const instance = axios.create({
    headers: { 'Content-Type': 'application/json' }
});

// 获取子设备列表
export async function getDeviceList(gatewayId) {
    return instance.get(`/api/gateway/${gatewayId}`)
}

// 添加子设备
export async function addDevice(gatewayId, data) {
    return instance.post(`/api/gateway/${gatewayId}/device`,
        JSON.stringify(data)
    )
}

// 更新子设备
export async function editDevice(gatewayId, deviceId, data) {
    return instance.put(`/api/gateway/${gatewayId}/device/${deviceId}`,
        JSON.stringify(data))
}

// 删除子设备
export async function deleteDevice(gatewayId, data) {
    return instance.delete(`/api/gateway/${gatewayId}/device`,
        { data: JSON.stringify(data) })
}