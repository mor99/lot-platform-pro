import axios from 'axios'

const instance = axios.create({
    headers: { 'Content-Type': 'application/json' }
});

// 获取模型对应的属性列表
export async function getAttribute(parms) {
    return instance.get(`/api/model/${parms}`)
}

// 新建属性
export async function addAttribute(id, data) {
    return instance.post(`/api/model/${id}/property`, JSON.stringify(data))
}

// 删除属性
export async function deleteAttribute(id, data) {
    return instance.delete(`/api/model/${id}/property`,
        { data: JSON.stringify(data) })
}

// 修改属性
export async function  editAttribute(modelId,propertyId,data){
    return instance.put(`/api/model/${modelId}/property/${propertyId}`,JSON.stringify(data))
}