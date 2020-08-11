import React, { useState, useEffect, useRef } from 'react';
import {  Col, Row,Input } from 'antd';
import DeviceList from './component/List'
import DeviceChart from './component/Content'
import {connect} from 'dva'
import {getGateway,getDeviceList} from './service'
import io from 'socket.io-client'
import styles from './index.less'

const mapStateToPros=(state)=>{
    return {
        list_state:state.list.list_state,
        chart_state:state.list.chart_state,
        monitor_data:state.list.monitor_data
    }
}

const Monitor= (props)=> {    
    const {chart_state,list_state,monitor_data} = props
    const [liststatus,setList] = useState('gateway')
    const [news,setNews] = useState([])
    const [gatewyList,setGateway] = useState([])
    // 获取网关列表
    const test = [
        {name:'网关1',description:'用于获取不到数据时的菜单测试'},
        {name:'网关2',description:'菜单测试'}
    ]
    // 获取网关列表
    const getList = async ()=>{
        const result = await getGateway()
        console.log(result)
        if (result&& result instanceof Array){
            setGateway(result)
        }
        else {
            console.log('请求不到数据')
            setGateway(test)
        }
    }
        useEffect(()=>{
            getList()
            //getNews()
            },[]
        )
        return (
                <div className={styles.div}>
                    <Row gutter={40}>
                        <Col span={6}>
                            <div ><DeviceList data={gatewyList}/></div>
                        </Col>
                        <Col span={18} >
                        <div style={{ overflow:'auto',height:'780px'}}
                                >
                                <DeviceChart chartdata={news}/>
                            </div>
                        </Col>
                    </Row>
                </div>
        )
}

export default connect(mapStateToPros,null)(Monitor)
