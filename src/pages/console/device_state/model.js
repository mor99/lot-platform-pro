export default {
    namespace:'list',
    state:{
        list_state:'gateway',
        chart_state:'gateway',
        monitor_data:{},
    },
    effects:{},
    reducers:{
        // 列表状态
        getList(state,{payload}){
            return {...state,list_state:payload}
        },
        // 选择设备
        getDevice(state,{payload}){
            return {...state,chart_state:payload}
        },
        // 添加数据
        getGatewayMonitor(state,{payload}){
            return {...state,monitor_data:payload}
        },
        // 添加监控数据
        addMonitorData(state,{payload}){
            const arr = payload.i.split('/')
            const [a,b,c] = arr
           // const data = {...state.monitor_data}
           const data2 = {...state.monitor_data}
           if (data2.ports){
               if (data2.ports[a].devices[b].properties[c].data.datas){
                   if (data2.ports[a].devices[b].properties[c].data.datas.length <= 15){
                        const datalength = data2.ports[a].devices[b].properties[c].data.datas.push(payload)
                   }
                   else if (data2.ports[a].devices[b].properties[c].data.datas.length >15){
                    data2.ports[a].devices[b].properties[c].data.datas.shift()
                    const datalength = data2.ports[a].devices[b].properties[c].data.datas.push(payload)
                   }
               }
               else {
                data2.ports[a].devices[b].properties[c].data.datas = []
                const datalength = data2.ports[a].devices[b].properties[c].data.datas.push(payload)
               }
           }

           return (state.monitor_data.ports)?{...state,monitor_data:data2}:{...state}
        }
    }
}