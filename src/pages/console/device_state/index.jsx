import React, { useState, useEffect } from 'react';
import {connect} from 'umi';
import {  Col, Row,Button} from 'antd';
import {RightOutlined,LeftOutlined} from '@ant-design/icons'
import DeviceList from './component/List'
import DeviceChart from './component/Content'
import {getGateway} from './service'
import styles from './index.less'

const Monitor= (props)=> {    
    const {dispatch} = props
    useEffect(()=>{
        dispatch({type:'monitor/init'})
    },[])
    // const {chart_state,list_state,monitor_data} = props
    const [listshow,setShow] = useState({list:5,chart:18,buttonText:'>',icon:<LeftOutlined />})
    const [gatewyList,setGateway] = useState([])
    // 获取网关列表
    const test = [
        {name:'测试网关1(本地数据)',description:'用于获取不到数据时的菜单测试',status:'running'},
        {name:'测试网关2(本地数据)',description:'菜单测试2',status:'abnormal'},
        {name:'测试网关1(本地数据)',description:'用于获取不到数据时的菜单测试',status:'running'},
        {name:'测试网关2(本地数据)',description:'菜单测试2',status:'abnormal'},
        {name:'测试网关1(本地数据)',description:'用于获取不到数据时的菜单测试',status:'running'},
        {name:'测试网关2(本地数据)',description:'菜单测试2',status:'abnormal'},
        {name:'测试网关1(本地数据)',description:'用于获取不到数据时的菜单测试',status:'running'},
        {name:'测试网关2(本地数据)',description:'菜单测试2',status:'abnormal'}
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
            // getNews()
            },[]
        )
        return (
                <div className={styles.div}>
                    <Row gutter={32}>
                        <Col span={listshow.list}>
                            <div ><DeviceList data={gatewyList}/></div>
                        </Col>
                        <Col span={1}>
                            <p/><br/>
                            <Button type='link' size='big' icon={listshow.icon} onClick={()=>{
                                if (listshow.list===5) {
                                    setShow({list:0,chart:23,buttonText:'<',icon:<RightOutlined />})
                                }
                                else {
                                    setShow({list:5,chart:18,buttonText:'>',icon:<LeftOutlined />})
                                }
                                }}/>
                        </Col>
                        <Col span={listshow.chart} >
                            <div className={styles.content}>
                                <DeviceChart/>
                            </div>
                        </Col>
                    </Row>
                </div>
        )
}

export default  connect((state) => {
    return {
        elect: state.monitor.elect,
    }
}, null)(Monitor)
