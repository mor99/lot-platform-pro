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

// 获取模型列表
export async function getModel() {
    return request.get('/api/model')
}

// 绑定模型
export async function bindModel(gatewayID,deviceID,parms,parms1) {
    return request.put(`/api/gateway/${gatewayID}/device/${deviceID}`,{data:{attachedModel:parms,attachedModelName:parms1}})
}

// 获取网关端口
export async function getPorts(gatewayID) {
    return request.get(`/api/gateway/${gatewayID}/ports`)
}