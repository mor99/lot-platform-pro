import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Card, Col, Row, Divider } from 'antd';

import styles from './index.less'

export default class DeviceState extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <PageHeaderWrapper>
                <div className={styles.div1}>
                    {/* <span className={styles.span1}>我的模型<br/>     8</span>
                    <Divider type='vertical'/>
                    <span className={styles.span2}>平均属性个数</span>
                    <Divider type='vertical'/>
                    <span className={styles.span3}>上传的属性个数</span> */}
                    <Row gutter={100}>
                        <Col span={7}>
                            <p>我的模型</p>
                            <h2>6个模型</h2>
                        </Col>
                        <Divider type='vertical' />
                        <Col span={7}>
                            <p>平均属性个数</p>
                            <h2 style={{marginLeft:30}}>8</h2>
                        </Col>
                        <Divider type='vertical' />
                        <Col span={7}>
                            <p>上传的属性个数</p>
                            <h2 style={{marginLeft:30}}>3</h2>
                        </Col>
                    </Row>
                </div>
                <br />
                <div className={styles.div2}>
                    2
                </div>
            </PageHeaderWrapper>
        )
    }
}
