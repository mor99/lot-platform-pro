import request from '@/utils/request'

// 获取网关列表
export async function getGateway() {
    return request.get('/api/gateway')
}

// 获取子设备列表
export async function getDevice(gatewayId) {
    return request.get(`/api/gateway/${gatewayId}`)
}

// 获取子设备绑定的模型的属性
export async function getProperties(modelId) {
    return request.get(`/api/model/${modelId}/controlProperties`)
}

//控制命令下发设备
export async function publishCommand(gatewayId,parms){
    return request.post(`/api/gateway/${gatewayId}/publishCommand`,{
        data:JSON.stringify(parms)
    })
}