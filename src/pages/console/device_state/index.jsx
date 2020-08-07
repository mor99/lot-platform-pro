import React, { useState, useEffect, useRef } from 'react';
import {  Col, Row,Input } from 'antd';
import DeviceList from './component/List'
import DeviceChart from './component/Content'
import {connect} from 'dva'
import {getGateway,getDeviceList} from './service'
import io from 'socket.io-client'
import styles from './index.less'

const v = {a:[1,2,3]}

const a = {
"ports": [
  {
    "name": "uart1",
    "devices": [
      {
        "name": "device_test_1",
        "properties": [
          {
            "name": "p_test_1",
            "alias": "测试属性1"
          }
        ]
      }
    ]
  }
]
}
// 获取共享状态
const mapStateToPros=(state)=>{
    return {
        list_state:state.list.list_state,
        chart_state:state.list.chart_state,
        monitor_data:state.list.monitor_data
    }
}

const Monitor= (props)=> {
    console.log(props)    
    const {chart_state,list_state,monitor_data} = props
    console.log(monitor_data)
    const [liststatus,setList] = useState('gateway')
    const [news,setNews] = useState([])
    const [gatewyList,setGateway] = useState([])
    const username = localStorage.getItem('username')
    // 获取网关列表
    const test = [
        {name:'网关1',description:'弯管1的描述'},
        {name:'网关2',description:'弯管1的描述'}
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

    // 实时数据
    const getNews = ()=>{
            // 建立连接
            const socket = io('192.168.1.211:3001')
            // 用户识别
            // socket.emit('gatewayName',`${username}-wangguan1`)
            // 获取数据
            socket.on(`${username}-gateway_test_3`,(data)=>{
            console.log(data.data)
            // setNews(news.push(data.data))
            news.push(data.data)
            })
        }

        useEffect(()=>{
            getList()
            getNews()
            },[]
        )
        return (
            // <PageHeaderWrapper>
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
            // </PageHeaderWrapper>
        )
}

export default connect(mapStateToPros,null)(Monitor)
