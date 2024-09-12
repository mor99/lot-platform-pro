import request from '@/utils/request';

// 获取模型对应的属性列表
export async function getAttribute(parms) {
    return request.get(`/api/model/${parms}`)
}

// 新建属性
export async function addAttribute(id, data) {
    return request.post(`/api/model/${id}/property`, { data: JSON.stringify(data) })
}

// 删除属性
export async function deleteAttribute(id, data) {
    return request.delete(`/api/model/${id}/property`,
        { data: JSON.stringify(data) })
}

// 修改属性
export async function editAttribute(modelId, propertyId, data) {
    return request.put(`/api/model/${modelId}/property/${propertyId}`, { data: JSON.stringify(data) })
}