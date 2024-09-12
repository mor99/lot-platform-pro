/* eslint-disable @typescript-eslint/no-unused-vars */
export default {
    namespace:'monitor',
    state:{
        elect:'default',
        gatewayId:'',
        deviceName:'',
        monitor_data:{},
    },
    effects:{},
    reducers:{
        // 初始化
        init(state){
            return {...state,elect:'default'}
        },
        // 选择状态
        changeElect(state,{payload}){
            return {...state,elect:payload}
        },
        // 改变网关id
        changeGateway(state,{payload}){
            return {...state,gatewayId:payload}
        },
        // 改变设备名称
        changeDevice(state,{payload}){
            return {...state,deviceName:payload}
        },
        // 获取数据结构
        getGatewayMonitor(state,{payload}){
            return {...state,monitor_data:payload}
        },
        // 添加监控数据
        addMonitorData(state,{payload}){
            const arr = payload.i.split('/')
            const [a,b,c] = arr
           // const data = {...state.monitor_data}
           const data2 = {...state.monitor_data}
           // 处理数据
           if (data2.ports){
               if (data2.ports[a].devices[b].properties[c].data.datas){
                   if (data2.ports[a].devices[b].properties[c].data.datas.length <= 15){
                        data2.ports[a].devices[b].properties[c].data.datas.push(payload)
                   }
                   else if (data2.ports[a].devices[b].properties[c].data.datas.length >15){
                    data2.ports[a].devices[b].properties[c].data.datas.shift()
                    data2.ports[a].devices[b].properties[c].data.datas.push(payload)
                   }
               }
               else {
                data2.ports[a].devices[b].properties[c].data.datas = []
                data2.ports[a].devices[b].properties[c].data.datas.push(payload)
               }
           }

           return (state.monitor_data.ports)?{...state,monitor_data:data2}:{...state}
        }
    }
}