import React from 'react';
import { Card, Col, Row } from 'antd';
import { Liquid } from '@ant-design/charts';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less'
import { red } from 'chalk';

export default ()=> {
      const config = {
        height:300,
        width:200,
        min: 0,
        max: 10000,
        value: 6666,
        /* title: {
            visible: true,
            text: '水波图',
            alignTo:'right'
          }, */
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
       // color:'red',
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
        return (
            <PageHeaderWrapper>
                <div className={styles.div}>
                <Row gutter={[100,80]}>
                    <Col span={8}>
                        <Card size="bigger" title={<h3>设备1</h3>} extra={<h2><a href="#">More</a></h2>} style={{ width: '100%', height: 400 }}>
                            <Row>
                                <Col span={12}>
                                    <br/>
                                    <br/>
                                    <h3>子设备：device_1</h3>
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
                        <Card size="bigger" title={<h3>设备2</h3>} extra={<h2><a href="#">More</a></h2>} style={{ width: '100%', height: 400 }}>
                            <Row>
                                <Col span={12}>
                                    <br/>
                                    <br/>
                                    <h3>子设备：device_2</h3>
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
                     <Card size="bigger" title={<h3>设备3</h3>} extra={<h2><a href="#">More</a></h2>} style={{ width: '100%', height: 400 }}>
                            <Row>
                                <Col span={12}>
                                    <br/>
                                    <br/>
                                    <h3>子设备：device_3</h3>
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
                        <Card size="bigger" title={<h3>设备4</h3>} extra={<h2><a href="#">More</a></h2>} style={{ width: '100%', height: 400 }}>
                            <Row>
                                <Col span={12}>
                                    <br/>
                                    <br/>
                                    <h3>子设备：device_4</h3>
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
