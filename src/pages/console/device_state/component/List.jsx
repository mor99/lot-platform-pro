import React from 'react';
import {Input,Row,Col,List,Progress,Badge} from 'antd'
import {connect} from 'dva'
import {timestampToTime1} from '@/utils/time'
import {getDeviceList} from '../service'
import io from 'socket.io-client'
import styles from './index.less'


const mapStateToPros=(state)=>{
    return {
        list_state:state.list.list_state,
        chart_state:state.list.chart_state,
        monitor_data:state.list.monitor_data
    }
}
//统计网关状态值
const counts = (arr,value)=> arr.reduce((a,v)=> v.status===value ? a+1 :a+0,0)

const badges = {
    running: {
        text:'运行中',status:'success'
    },
    offline:{
        text:'离线',status:'default'
    },
    abnormal:{
        text:'异常',status:'error'
    },
    inactive: {
        text:'未激活',status:'default'
    }
}
 const DeviceList = props => {
    const {data,list_state,chart_state,monitor_data} = props
    const username = localStorage.getItem('username')
    // 实时数据
    const getNews = ()=>{
        console.log('准备建立socket连接')
        // 建立连接
        const socket = io('192.168.1.211:3001')
        // 用户识别
        socket.emit('gatewayName',`${username}-${list_state}`)
        // 获取数据
        socket.on(`${username}-${list_state}`,(data)=>{
        console.log('接收到数据:'+data)
        const {t,...obj} = data.data
        addmonitordata({...obj,time:timestampToTime1(t)})
        })
    }
    //改变图标状态
    const deviceClick = (value)=>{
        const {dispatch} = props;
        dispatch({type:'list/getDevice',payload:value})
    }
    // 添加监控数据
    const addmonitordata = (value)=>{
        const {dispatch}= props;
        dispatch({type:'list/addMonitorData',payload:value})
    }
    // 改变监控数据状态
    const dataClick = async (value)=>{
        const {dispatch} = props;
        const result = await getDeviceList(value)
        console.log(result)
        dispatch({type:'list/getGatewayMonitor',payload:result})
    }
    // 改变列表状态
     const btnClick = (value)=>{
         const {dispatch} = props;
         dispatch({type:'list/getList',payload:value})
     }
     // 测试用
    const testdata = [
        {name:'菜单测试1',description:'测试'},
        {name:'菜单测试2',description:'测试'}
    ]
    // 网关列表
    const lists = (monitor_data.ports)?monitor_data.ports[0].devices:testdata
    return (
         list_state==='gateway' ?
        (<div>
            <Input.Search allowClear placeholder='搜索网关' style={{width:'100%'}} onSearch={(value)=>{console.log(value)}}/>
                <p/>
                <div className={styles.border}>
                    <Row justify="center"  gutter={40,40}>
                        <Col span={8}><br/><br/><h3>网关数量</h3></Col>
                        <Col span={16}>
                            <Row>
                                <Col span={12}><br/><h3>运行中</h3></Col>
                                <Col span={12}><br/><h3>故障中</h3></Col>
                                <Col span={12}>{counts(data,'running')}</Col>
                                <Col span={12}>{counts(data,'abnormal')}</Col>
                            </Row>
                        </Col>
                        <Col span={8}><br/>{data.length}</Col>
                        <Col span={16}>
                            <Row>
                                <Col span={12}><br/><h3>离线</h3></Col>
                                <Col span={12}><br/><h3>未激活</h3></Col>
                                <Col span={12}>{counts(data,'offline')}</Col>
                                <Col span={12}>{counts(data,'inactive')}</Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <br/>
                <div style={{ overflow:'auto',height:'512px'}}>
                    <List
                        bordered
                        split
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item=>
                            <List.Item className={styles.item} onClick={async ()=>{
                                    btnClick(item.name)
                                    dataClick(item.id)
                                    getNews()
                                    }}
                                    >
                                <List.Item.Meta
                                    title={<a href="#"><h2>{item.name}</h2></a>}
                                    description={<span><span>剩余流量</span><Progress size='small' percent={80}/></span>} />
                                    <Badge status={badges[item.status].status}/><span>{badges[item.status].text}</span>
                            </List.Item>
                        }
                    />
                </div>
        </div>)
        :
        (<div>
                <div onClick={()=>{btnClick('gateway')
                                 deviceClick('gateway')}}> <h1><a>返回列表</a></h1></div>
                <div style={{ overflow:'auto',height:'512px'}}>
                    <List
                        bordered
                        split
                        itemLayout="horizontal"
                        dataSource={lists}                        
                        renderItem={item=>{
                            return <List.Item className={styles.item} onClick={()=>{
                                    deviceClick(item.name)}}
                                    >
                                <List.Item.Meta
                                    title={<a><h1>{item.name}</h1></a>}
                                    description={<span>串口 : {monitor_data.ports?monitor_data.ports[0].name:'无数据'}</span>}
                                    />
                            </List.Item>
                        }
                        }
                    />
                </div>
        </div>)
        
    );
};

export default connect(mapStateToPros,null)(DeviceList)
