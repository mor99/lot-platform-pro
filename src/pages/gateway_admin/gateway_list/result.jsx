import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Result ,Col,Row,Button} from 'antd'
import {history} from 'umi'
import styles from './index.less'

export default (props) => {
    const { gatewayInfo} = props.location.query
    console.log(props)
    const result = 
        <Result
            status='success'
            title='新建网关成功!'
            subTitle='请妥善保存通信密码和密钥'
            extra={[
                <Button type="primary" key="back" onClick={() => {history.push('gateway_list')}}>
                    返回
         </Button>,
                <Button key="buy">下载配置文件</Button>,
            ]}>
            <Row>
                <Col offset={3}><h2>网关信息:</h2></Col>
            </Row>
            <Row>
                <Col span={8} offset={3}><h3>网关 ID:{gatewayInfo.ID}</h3></Col>
                <Col span={8}><h3>通信密码:{gatewayInfo.password}</h3></Col>
            </Row>
            {/* <Row>
                <Col offset={3}><h3>通信密钥:{gatewayInfo.secretKey}</h3></Col>
            </Row> */}
        </Result>

    return (
        <PageHeaderWrapper>
            <div className={styles.div1}>
                {result}
            </div>
        </PageHeaderWrapper>
    )
}