import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { Liquid } from '@ant-design/charts';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Line} from '@ant-design/charts'
import io from 'socket.io-client'
import styles from './index.less'

export default ()=> {
    const data = [
        {
            time:'17:08',
             value:3
        },
        {
            time:'17:09',
            value:11
        },
        {
            time:'17:10',
            value:22
        },
        {
            time:'17:11',
            value:0
        }
    ]
    const lineConfig ={
        /* title: {
            visible: true,
            text: '带数据点的折线图',
          },
          description: {
            visible: true,
            text: '将折线图上的每一个数据点显示出来\uFF0C作为辅助阅读\u3002',
          }, */
          forceFit: true,
          padding: 'auto',
          data,
          xField: 'time',
          yField: 'value',
          point: { visible: true },
          label: {
            visible: true,
            type: 'point',
          },
    }
    const [news,setNews] = useState([])
       const config = {
        height:300,
        width:200,
        min: 0,
        max: 10000,
        value: 6666,
        description:{
            visible: true,
            alignTo: 'middle',
            text:'剩余流量',
            style:{
                fontSize: 15,
                fill: 'grey',
                paddingTop:20
            }
        },
        statistic: { formatter: (value) => ((100 * value) / 10000).toFixed(1) + '%' },
      };
      const config1 = {
        height:300,
        width:200,
        min: 0,
        max: 10000,
        value: 888,
        color:'red',
        statistic: { formatter: (value) => ((100 * value) / 10000).toFixed(1) + '%' },
      };
      const config2 = {
        height:300,
        width:200,
        min: 0,
        max: 10000,
        value: 3333,
        color:'orange',
        statistic: { formatter: (value) => ((100 * value) / 10000).toFixed(1) + '%' },
      }
      const config3 = {
        height:300,
        width:200,
        min: 0,
        max: 10000,
        value: 9800,
        color:'green',
        statistic: { formatter: (value) => ((100 * value) / 10000).toFixed(1) + '%' },
      } 


/*       const getNews = ()=>{
          // 建立连接
          const socket = io('')
          // 获取数据
          socket.on('init',(data)=>{
            console.log(data)
            setNews(data)
          })
          // 发送数据
          let msg = ''
          socket.emit('send',{text:msg})
      }

      useEffect(()=>{
        getNews()
      },[]
      ) */
      
        return (
            <PageHeaderWrapper>
                <div className={styles.div}>
                <Row>
                    {/* <Line {...lineConfig} /> */}
                </Row>
                <Row gutter={[100,80]}>
                    <Col span={8}>
                        <Card size="bigger" title={<h3>网关1</h3>} extra={<h2 className={styles.slideUpBtn}><a href="#">More</a></h2>} style={{ width: '100%', height: 400 }}>
                            <Row>
                                <Col span={12}>
                                    <br/>
                                    <br/>
                                    <h3>子设备：4个</h3>
                                    <h3>上次在线：2018.1.1</h3>
                                    <h3>最近故障次数：5</h3>
                                </Col>
                                <Col span={12}>
                                    <Liquid {...config} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="bigger" title={<h3>网关2</h3>} extra={<h2><a href="#">More</a></h2>} style={{ width: '100%', height: 400 }}>
                            <Row>
                                <Col span={12}>
                                    <br/>
                                    <br/>
                                    <h3>子设备：2个</h3>
                                    <h3>上次在线：2018.1.1</h3>
                                    <h3>最近故障次数：4</h3>
                                </Col>
                                <Col span={12}>
                                    <Liquid {...config1} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                     <Card size="bigger" title={<h3>网关3</h3>} extra={<h2><a href="#">More</a></h2>} style={{ width: '100%', height: 400 }}>
                            <Row>
                                <Col span={12}>
                                    <br/>
                                    <br/>
                                    <h3>子设备：3个</h3>
                                    <h3>上次在线：2018.1.1</h3>
                                    <h3>最近故障次数：4</h3>
                                </Col>
                                <Col span={12}>
                                    <Liquid {...config2} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="bigger" title={<h3>网关4</h3>} extra={<h2><a href="#">More</a></h2>} style={{ width: '100%', height: 400 }}>
                            <Row>
                                <Col span={12}>
                                    <br/>
                                    <br/>
                                    <h3>子设备：12个</h3>
                                    <h3>上次在线：2018.1.1</h3>
                                    <h3>最近故障次数：</h3>
                                </Col>
                                <Col span={12}>
                                    <Liquid {...config3} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                </div>
            </PageHeaderWrapper>
        )
    
}
