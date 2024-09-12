import React, {useState, useEffect} from 'react'
import {Link,history} from 'umi'
import {Card,Row,Col,Collapse,Badge,Empty,Button } from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import {getGateway} from './service'
import styles from './index.less'

const status ={
    inactive:['default','未激活'],
    running:['Success','运行中'],
    abnormal:['warning','异常'],
    offline :['default','离线']
}
export default ()=> {
    const [data,setData] = useState([])
    // 获取网关列表
    const fetchData = async()=>{
        const result = await getGateway()
        console.log(result)
        if (result && result instanceof Array) {
            setData(result)
        }
        else {setData([])}
        }
    // 组件初始化
    useEffect(()=>{
        fetchData()
    },[])
 return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                {(data.length)?
                <Row gutter={[16,16]}>
                    {data.map((value)=>
                        <Col span={4}>
                             <Card title={[<h3><a>{value.name}</a></h3>,<span>描述 : {(value.description)?value.description:'无'}</span>]}  extra={<span><Badge status={status[value.status][0]} text={status[value.status][1]}/></span>}>
                                <Row gutter={[16,8]}>
                                    <Col span={24}>子设备数量:{value.childDeviceNum}个</Col>
                                    <Col span={24}>核心模块:{value.coreModule}</Col>
                                    <Col span={24}>通信协议:{value.protocol}</Col>
                                    <Col offset={8}><Link to={{pathname:'concrete',query:{gatewayId:value.id}}}>详细数据&lt;</Link></Col>
                                </Row>
                            </Card>
                        </Col>
                    )}
                </Row>:<Empty><Button type="link" onClick={()=>{history.push('/gateway_admin/gateway_list')}}>查看网关列表</Button></Empty>}
            </div>
        </PageHeaderWrapper>
        )
    }
