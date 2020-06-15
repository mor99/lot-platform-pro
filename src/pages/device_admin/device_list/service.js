import request from '@/utils/request'

// 获取子设备列表
export async function getDeviceList(gatewayId) {
    return request.get(`/api/gateway/${gatewayId}`)
}

// 添加子设备
export async function addDevice(gatewayId, data) {
    return request.post(`/api/gateway/${gatewayId}/device`,
        {data:JSON.stringify(data)}
    )
}

// 更新子设备
export async function editDevice(gatewayId, deviceId, data) {
    return request.put(`/api/gateway/${gatewayId}/device/${deviceId}`,
        {data:JSON.stringify(data)})
}

// 删除子设备
export async function deleteDevice(gatewayId, data) {
    return request.delete(`/api/gateway/${gatewayId}/device`,
        { data: JSON.stringify(data) })
}