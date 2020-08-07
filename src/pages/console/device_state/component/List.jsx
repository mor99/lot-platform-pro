import React,{useState,useEffect} from 'react';
import {Input,Row,Col,List,Divider} from 'antd'
import {connect} from 'dva'
import {getDeviceList} from '../service'
import styles from './index.less'


const mapStateToPros=(state)=>{
    return {
        list_state:state.list.list_state,
        chart_state:state.list.chart_state
    }
}

 const DeviceList = props => {
    const {data,list_state,chart_state} = props
    const [gatewayId,setId] = useState()
    const [deviceList,setDevice] =useState([])

    //改变图标状态
    const deviceClick = (value)=>{
        const {dispatch} = props;
        dispatch({type:'list/getDevice',payload:value})
    }
    // 改变监控数据状态
    const dataClick = (value)=>{
        const {dispatch} = props;
        const result = getDeviceList(value)
        dispatch({type:'list/getGatewayMonitor',payload:result})
    }
    // 改变列表状态
     const btnClick = (value)=>{
         const {dispatch} = props;
         dispatch({type:'list/getList',payload:value})
     }
    const testdata = [
        {name:'设备1',description:'123'},
        {name:'设备2',description:'123'}
    ]
    // 获取设备列表
    const getList = async (id)=>{
        const result = await getDeviceList(id)
        if (!result.status) {
            console.log(result.ports[0].devices)
            setDevice(result.ports[0].devices)
        }
        else setDevice(testdata)
    }
/*     useEffect(()=>{
        },[]
    ) */
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
                                <Col span={12}>123</Col>
                                <Col span={12}>2</Col>
                            </Row>
                        </Col>
                        <Col span={8}><br/>17</Col>
                        <Col span={16}>
                            <Row>
                                <Col span={12}><br/><h3>离线</h3></Col>
                                <Col span={12}><br/><h3>未激活</h3></Col>
                                <Col span={12}>1</Col>
                                <Col span={12}>2</Col>
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
                                    btnClick(item.id)
                                    dataClick(item.id)
                                    console.log(item)
                                    await getList(item.id)
                                    }}
                                    >
                                <List.Item.Meta
                                    title={<a href="#">{item.name}</a>}
                                    description={item.description}/>
                            </List.Item>
                        }
                    />
                </div>
        </div>)
        :
        (<div>
                <p onClick={()=>{btnClick('gateway')
                                 deviceClick('gateway')}}> 返回列表</p>
                <div style={{ overflow:'auto',height:'512px'}}>
                    <List
                        bordered
                        split
                        itemLayout="horizontal"
                        dataSource={deviceList}                        
                        renderItem={item=>{
                            console.log(item)
                            return <List.Item className={styles.item} onClick={()=>{
                                    deviceClick(item.name)
                                    console.log(chart_state)}}
                                    >
                                <List.Item.Meta
                                    title={<a href="#">{item.name}</a>}
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
