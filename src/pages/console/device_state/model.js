import { getDevice } from "@/pages/gateway_control/order/service"
import {getDeviceList} from './service'

export default {
    namespace:'list',
    state:{
        list_state:'gateway',
        chart_state:'gateway',
        monitor_data:{a:1}
    },
    effects:{},
    reducers:{
        getList(state,{payload}){
            return {...state,list_state:payload}
        },
        getDevice(state,{payload}){
            return {...state,chart_state:payload}
        },
        getGatewayMonitor(state,{payload}){
            return {...state,monitor_data:payload}
        }
    }
}