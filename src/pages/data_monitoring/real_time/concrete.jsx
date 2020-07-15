import React ,{useState,useEffect} from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {Divider,Descriptions} from 'antd'
import {monitor} from './service'
import styles from './index.less'

const a = [1,2]
const b = a.map((v)=>(v+1))
console.log(b)
const columns = [
    {
        title:'属性名称',
        dataIndex:'name',
        hideInSearch: true,        
    },
    {
        title:'属性别名',
        dataIndex:'alias',
        hideInSearch: true,       
    },
    {
        title:'数据',
        dataIndex:'warpped',
        width:500,
        hideInSearch: true,        
    },
    {
        title:'原始数据',
        dataIndex:'raw',
        hideInSearch: true,
    },
    {
        title:'采集时间',
        dataIndex:'timestamp',
        valueType: 'dateTime',
        hideInSearch: true,      
    },
    {
        title:'错误原因',
        dataIndex:'reason',
        hideInSearch: true,     
    }
]
export default ()=>{
    const [process,setProcess] = useState({})
    const [system,setSystem] = useState({})
    const [ports,setPorts] = useState([])
    // 获取详细信息
    const fetchData = async()=>{
        const result = await monitor('5f07ce5e6f327e0804aecdd5')
        if (result) {
            console.log(result)
            setSystem(result.gateway.system)
            setProcess(result.gateway.process)
            setPorts(result.data.ports)
        }
        else {setSystem(null)}
        }
    // 组件初始化
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <Divider><h2>设备信息</h2></Divider>
                <Descriptions title="硬件信息" bordered>
                    <Descriptions.Item label="CPU架构">{system.arch}</Descriptions.Item>
                    <Descriptions.Item label="CPU型号">{system.cpu}</Descriptions.Item>
                    <Descriptions.Item label="操作系统">{system.platform}</Descriptions.Item>
                    <Descriptions.Item label="内存容量">{`${system.totalmem} MB`}</Descriptions.Item>
                    <Descriptions.Item label="剩余容量">{`${system.freemem} MB`}</Descriptions.Item>
                </Descriptions>
                <br/>
                <Descriptions title="进程信息" bordered>
                    <Descriptions.Item label="进程编号">{process.pid}</Descriptions.Item>
                    <Descriptions.Item label="进程运行时间">{`${process.uptime} 秒`}</Descriptions.Item>
                    <Descriptions.Item label="进程内存占用">{`${process.memoryUsage} MB`}</Descriptions.Item>
                </Descriptions>
                <br/>
                <Divider><h2>通信口信息</h2></Divider>
                {ports.map(value=>{
                        console.log(value)
                        return (
                            <span><Divider>通信口:{value.name}</Divider>
                                {value.devices.map(value1=>{
                                    console.log(value1)
                                    const datasource = value1.properties.map(
                                        value2=>{
                                            console.log(value2)
                                            const data1 = {...value2,...value2.data}
                                            return data1
                                        }
                                    )
                                    console.log(datasource)
                                    return (<span>
                                                <ProTable
                                                    rowKey={value1.name}
                                                    headerTitle={value1.name}
                                                    search={false}
                                                    options={false}
                                                    columns={columns}
                                                    dataSource={datasource}
                                                />
                                            </span>
                                        )
                                    }
                                )
                            }
                            </span>)
                    })
                    }
            </div>
        </PageHeaderWrapper>
        )
}