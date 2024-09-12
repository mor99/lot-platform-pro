import React from 'react';
import { Input, Row, Col, List, Progress, Badge } from 'antd'
import { connect } from 'umi'
import { timestampToTime1 } from '@/utils/time'
import io from 'socket.io-client'
import { getDeviceList } from '../service'
import styles from './index.less'


// 统计数据
const counts = (arr, value) => arr.reduce((a, v) => v.status === value ? a + 1 : a + 0, 0)
// 状态转换
const badges = {
    running: {
        text: '运行中', status: 'success'
    },
    offline: {
        text: '离线', status: 'default'
    },
    abnormal: {
        text: '异常', status: 'error'
    },
    inactive: {
        text: '未激活', status: 'default'
    }
}

const DeviceList = props => {
    const { data, monitor_data, gatewayId, deviceName, elect, dispatch } = props
    const username = localStorage.getItem('username')


    // 添加监控数据
    const addmonitordata = (value) => {
        dispatch({ type: 'list/addMonitorData', payload: value })
    }
    // 实时数据
    const getNews = () => {
        console.log('准备建立socket连接')
        // 建立连接
        const socket = io('192.168.1.211:3001')
        // 用户识别
        socket.emit('gatewayName', `${username}-${gatewayId}`)
        // 获取数据
        socket.on(`${username}-${gatewayId}`, (msg) => {
            console.log(`接收到数据:${msg}`)
            const { t, ...obj } = msg.data
            addmonitordata({ ...obj, time: timestampToTime1(t) })
        })
    }
    // 改变渲染内容
    const changeElect = (value) => {
        dispatch({ type: 'monitor/changeElect', payload: value })
    }
    // 点击网关事件
    const gatewayClick = async (value) => {
        changeElect('gateway')
        dispatch({ type: 'monitor/changeGateway', payload: value })
        const result = await getDeviceList(value)
        dispatch({ type: 'monitor/getGatewayMonitor', payload: result })
        getNews()
    }

    // 测试用数据
    const testdata = [
        { name: '测试设备1', description: '测试' },
        { name: '测试设备2', description: '测试' },
        { name: '测试设备3', description: '测试' },
        { name: '测试设备4', description: '测试' },
        { name: '测试设备5', description: '测试' },
        { name: '测试设备6', description: '测试' },
        { name: '测试设备7', description: '测试' },
        { name: '测试设备8', description: '测试' },
        { name: '测试设备9', description: '测试' },
        { name: '测试设备10', description: '测试' },
        { name: '测试设备11', description: '测试' },
        { name: '测试设备12', description: '测试' },
        { name: '测试设备13', description: '测试' },
        { name: '测试设备14', description: '测试' }
    ]
    // 网关列表
    const lists = (gatewayId) ? monitor_data.ports[0].devices : testdata

    // 根据状态展示列表
    const content = () => {
        switch (elect) {
            case 'default':
                return <div>
                    <Input.Search allowClear placeholder='搜索网关' style={{ width: '100%' }} onSearch={(value) => { console.log(value) }} />
                    <p />
                    <div className={styles.border}>
                        <Row justify="center" gutter={40}>
                            <Col span={8}><br /><br /><h3>网关数量</h3></Col>
                            <Col span={16}>
                                <Row>
                                    <Col span={12}><br /><h3>运行中</h3></Col>
                                    <Col span={12}><br /><h3>故障中</h3></Col>
                                    <Col span={12}>{counts(data, 'running')}</Col>
                                    <Col span={12}>{counts(data, 'abnormal')}</Col>
                                </Row>
                            </Col>
                            <Col span={8}><br />{data.length}</Col>
                            <Col span={16}>
                                <Row>
                                    <Col span={12}><br /><h3>离线</h3></Col>
                                    <Col span={12}><br /><h3>未激活</h3></Col>
                                    <Col span={12}>{counts(data, 'offline')}</Col>
                                    <Col span={12}>{counts(data, 'inactive')}</Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <br />
                    <div className={styles.gatewaylist}>
                        <List
                            bordered
                            split
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item =>
                                <List.Item className={styles.item} onClick={() => { gatewayClick() }}
                                >
                                    <List.Item.Meta
                                        title={<a href="#"><h3>{item.name}</h3></a>}
                                        description={<span><span>剩余流量</span><Progress size='small' percent={80} /></span>} />
                                    <Badge status={item.status ? badges[item.status].status : 'default'} /><span>{item.status ? badges[item.status].text : ''}</span>
                                </List.Item>
                            }
                        />
                    </div>
                </div>
            case 'gateway':
                return (
                        <div>
                            <h1 onClick={() => {changeElect('default')}}><a>返回网关列表</a></h1>
                            <div className={styles.devicelist}>
                                <List
                                    bordered
                                    split
                                    itemLayout="horizontal"
                                    dataSource={lists}
                                    renderItem={item => {
                                        return <List.Item className={styles.item} onClick={() => {
                                            changeElect('device')
                                            dispatch({ type: 'monitor/changeDevice', payload: item.name })
                                        }}
                                        >
                                            <List.Item.Meta
                                                title={<a><h1>{item.name}</h1></a>}
                                                description={<span>串口 : {monitor_data.ports ? monitor_data.ports[0].name : '无数据'}</span>}
                                            />
                                        </List.Item>
                                    }
                                    }
                                />
                            </div>
                        </div>)
            case 'device':
                return (
                    <div className={styles.deviceborder}>
                        <br />
                        <h1 onClick={() => { changeElect('gateway') }}><a>返回设备列表</a></h1>
                        <br /><br /><br />
                        <p><b><i>这里是设备详情</i></b></p>
                        <p><b>设备名称</b> : XXX</p>
                        <p><b> 设备状态 :</b> 良好</p>
                        <p><b>设备XX : </b>XXXX</p>
                    </div>)
            default:
                return <p>暂无数据</p>
        }
    }
    return content()
};

export default connect((state) => {
    return {
        elect: state.monitor.elect,
        deviceName: state.monitor.name,
        gatewayId: state.monitor.gatewayId,
        monitor_data: state.monitor.monitor_data
    }
}, null)(DeviceList)
