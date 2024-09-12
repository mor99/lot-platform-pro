import React ,{useState,useEffect} from 'react'
import ProTable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Divider,Descriptions, List,Skeleton,message,Collapse  } from 'antd'
import {SyncOutlined} from '@ant-design/icons';
import {timestampToTime} from '@/utils/time'
import {history} from 'umi'
import {monitor} from './service'
import styles from './index.less'

const { Panel } = Collapse;
const columns = [
    {
        title:'属性名称',
        dataIndex:'name',
        align:'center',
        hideInSearch: true,        
    },
    {
        title:'属性别名',
        dataIndex:'alias',
        align:'center',
        hideInSearch: true,       
    },
    {
        title:'数据',
        dataIndex:'wrapped',
        align:'center',
        width:250,
        hideInSearch: true,        
    },
    {
        title:'原始数据',
        dataIndex:'raw',
        align:'center',
        width:200,
        hideInSearch: true,
    },
    {
        title:'采集时间',
        dataIndex:'timestamp',
        align:'center',
        valueType: 'dateTime',
        width:150,
        hideInSearch: true,      
    },
    {
        title:'上传时间',
        dataIndex:'updateTime',
        align:'center',
        valueType: 'dateTime',
        width:150,
        hideInSearch: true,      
    },
    {
        title:'错误原因',
        align:'center',
        width:250,
        dataIndex:'reason',
        hideInSearch: true,     
    }
]

export default ()=>{
    const [spin,setSpin] = useState(true)      // 刷新动画
    const [ports,setPorts] = useState([])       // 实时数据
    const [config,setConfig] = useState([])     // 配置错误
    const [modbus,setModbus] = useState([])     // 通信错误
    const [system,setSystem] = useState({})     // 硬件信息
    const [process,setProcess] = useState({})   // 进程信息
    const {gatewayId} = history.location.query  // 网关id
    // 获取详细信息
    const fetchData = async (show)=>{
        setSpin(true)
       // const result = (show)? await monitor(gatewayId): await monitor('5f07ce5e6f327e0804aecdd5',1)
       const result = await monitor(gatewayId)
        if (result&&result.gateway&&result.data) {
            setSpin(false)
            setSystem(result.gateway.system)
            setProcess(result.gateway.process)
            setPorts(result.data.ports)
            setConfig(result.error.config)
            setModbus(result.error.modbus)
            if (show) {
                message.success('已拉取最新数据!')
            }
           // (show)?message.success('已拉取最新数据!'):''
        }
        else {
            (show)?message.loading('获取数据中',1):''
            setTimeout(() => {
                message.error('获取数据失败!',3)
              })
            setSystem([])}
            setSpin(false)
        }
    // 组件初始化
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <div style={{
                    position: 'fixed',
                    height: '90px',
                    width: '40px',
                    top: '120px',
                    right: '50px',}}>
                <SyncOutlined spin={spin} style={{float:'right',height:'50px',fontSize:'x-large'}} onClick={()=>{fetchData(1)}}/>
                </div>
                <br/>
                <Collapse defaultActiveKey={['1','2','3']} ghost>
                    <Panel header={<Divider><h2>网关信息</h2></Divider>} key="1">
                        <Descriptions title={<h2 style={{fontSize:'x-large'}}><b>硬件信息</b></h2>} bordered>
                            <Descriptions.Item label="CPU架构">{system.arch}</Descriptions.Item>
                            <Descriptions.Item label="CPU型号">{system.cpu}</Descriptions.Item>
                            <Descriptions.Item label="操作系统">{system.platform}</Descriptions.Item>
                            <Descriptions.Item label="内存容量">{`${system.totalmem} MB`}</Descriptions.Item>
                            <Descriptions.Item label="剩余容量">{`${system.freemem} MB`}</Descriptions.Item>
                        </Descriptions>
                        <br/>
                        <Descriptions title={<h2 style={{fontSize:'x-large'}}><b>进程信息</b></h2>} bordered>
                            <Descriptions.Item label="进程编号">{process.pid}</Descriptions.Item>
                            <Descriptions.Item label="进程运行时间">{`${process.uptime} 秒`}</Descriptions.Item>
                            <Descriptions.Item label="进程内存占用">{`${process.memoryUsage} MB`}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                    <Panel header={<Divider><h2>错误信息</h2></Divider>} key="2" >
                        <h3 style={{fontSize:'x-large'}}><b>配置错误</b></h3>
                        <List
                            dataSource={config} 
                            bordered
                            // bordered 
                            renderItem={item => {
                                console.log(item)
                                return (
                                    <List.Item
                                        // actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                                    >
                                        <Skeleton avatar title={false} loading={item.loading} active>
                                        <List.Item.Meta
                                            // title={<Typography.Text mark>[{item.id}]</Typography.Text>}
                                            description={<span className={styles.red}>{item.message}</span>}
                                        />
                                        <div>{timestampToTime(item.timestamp)}</div>
                                        </Skeleton>
                                    </List.Item>
                                    )}}
                        />
                        <br/>
                        <h3 style={{fontSize:'x-large'}}><b>通信错误</b></h3>
                        <List bordered 
                            dataSource={modbus} 
                            bordered 
                            renderItem={item => {
                                console.log(item)
                                return (
                                    <List.Item>
                                        <span className={styles.red}>{item.message}</span>
                                        <span style={{float:'right'}}>{timestampToTime(item.timestamp)}</span>
                                    </List.Item>
                                    )}}
                        />                        
                    </Panel>
                    <Panel header={<Divider><h2>实时数据</h2></Divider>} key="3" >
                    {ports.map(value=>{
                            console.log(value)
                            return (
                                <>
                                <h3 style={{fontSize:'x-large'}}><b>通信口名称:{value.name}</b></h3>
                                {value.devices.map(value1=>{
                                        console.log(value1)
                                        const datasource = value1.properties.map(
                                            value2=>{
                                                const data1 = {...value2,...value2.data}
                                                return data1
                                            }
                                        )
                                        console.log(datasource)
                                        return (
                                                    <ProTable
                                                        bordered
                                                        title={()=><h3 style={{height:'40px',fontSize:'20px',textAlign:'left'}}>设备名称<Divider type='vertical'/>{value1.name}</h3>}
                                                        rowKey='name'
                                                        rowClassName={(record,index)=>{
                                                            return (!record.data.reason)?'':'red___1fzle'
                                                        }}
                                                        search={false}
                                                        options={false}
                                                        columns={columns}
                                                        dataSource={datasource}
                                                        />
                                            )
                                        }
                                    )
                                }
                            </>)
                        })}
                        </Panel>
                    </Collapse>
            </div>
        </PageHeaderWrapper>
        )
}