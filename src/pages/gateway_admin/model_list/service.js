import axios from 'axios'

const instance = axios.create({
    headers: { 'Content-Type': 'application/json' }
});

// 获取模型列表
export async function getModel() {
    return instance.get('/api/model')
}

// 新建模型
export async function addModel(parms) {
    return instance.post('/api/model', JSON.stringify({ modelInfo: parms }))
}

// 修改模型
export async function editModel(id, parms) {
    return instance.put(`/api/model/${id}`, JSON.stringify({ modelInfo: parms }))
}

// 删除模型
export async function deleteModel(id) {
    return instance.delete(`/api/model/${id}`)
}