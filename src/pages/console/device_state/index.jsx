import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import styles from './index.less'

export default class DeviceState extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(){
        document.title = '设备状态'
    }

    render() {
        return (
            <PageHeaderWrapper>
{/*             <div className={styles.div1}>  */}
                <Row gutter={100}>
                    <Col span={8}>
                        <Card size="bigger" title="设备1" extra={<a href="#">More</a>} style={{ width: '100%' ,height:400}}>
                            <p>子设备：</p>
                            <p>上次在线：</p>
                            <p>最近故障次数：</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="bigger" title="设备2" extra={<a href="#">More</a>} style={{ width: '100%' ,height:400}}>
                            <p>子设备：</p>
                            <p>上次在线：</p>
                            <p>最近故障次数：</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="bigger" title="设备3" extra={<a href="#">More</a>} style={{ width: '100%' ,height:400}}>
                            <p>子设备：</p>
                            <p>上次在线：</p>
                            <p>最近故障次数：</p>
                        </Card>
                    </Col>
                </Row>
            </PageHeaderWrapper>
        )
    }
}
