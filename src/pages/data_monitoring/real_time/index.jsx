import React, {useState, useEffect} from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {PlusOutlined} from '@ant-design/icons';
import {Link} from 'umi'
import {Card,Row,Col,Collapse,Badge } from 'antd'
import {getGateway} from './service'
import styles from './index.less'

const { Meta } = Card;
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
        else {setData(null)}
        }
    // 组件初始化
    useEffect(()=>{
        fetchData()
    },[])
 return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <Row gutter={[16,16]}>
                    {data.map((value)=>
                        <Col span={4}>
                             <Card title={[<h3><a>{value.name}</a></h3>,<span>描述 : {(value.description)?value.description:'无'}</span>]}  extra={<span><Badge status={status[value.status][0]} text={status[value.status][1]}/></span>}>
                                <Row gutter={[16,8]}>
                                    <Col span={24}>子设备数量:{value.childDeviceNum}个</Col>
                                    <Col span={24}>核心模块:{value.coreModule}</Col>
                                    <Col>通信协议:{value.protocol}</Col>
{/*                                     <Col>是否加密:{(value.isEncrypted===true?'是':'否')}</Col>
                                    <Col>数据流量:{value.dataPlan}</Col> */}
                                    <Collapse ghost destroyInactivePanel onChange={()=>{}}>
                                        <Collapse.Panel header={<Link to='concrete'>查看更多</Link>} showArrow={false}>
                                            {/* <Col>创建时间:{value.createTime}</Col>
                                            <Col>更新时间:{value.updateTime}</Col> */}
                                        </Collapse.Panel>
                                    </Collapse> 
                                </Row>
                            </Card>
                        </Col>
                    )}
                </Row>
                    
            </div>
        </PageHeaderWrapper>
        )
    }
