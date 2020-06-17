import request from '@/utils/request'

// 获取模型列表
export async function getModel() {
    return request.get('/api/model')
}

// 新建模型
export async function addModel(parms) {
    return request.post('/api/model', { data: JSON.stringify(parms) })
}

// 修改模型
export async function editModel(id, parms) {
    return request.put(`/api/model/${id}`, { data: JSON.stringify(parms) })
}

// 删除模型
export async function deleteModel(id) {
    return request.delete(`/api/model/${id}`)
}