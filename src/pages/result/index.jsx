import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

export default () => {
    return(
    <Result
        status='success'
        title='新建网关成功!'
        subTitle='请妥善保存通信密码和密钥'
        extra={[
            <Button type="primary" key="back" onClick={() => { setVisible(false) }}>
                返回
     </Button>,
            <Button key="buy">下载配置文件</Button>,
        ]}>
        <Row>
            <Col offset={3}><h2>网关信息:</h2></Col>
        </Row>
        <Row>
            <Col span={8} offset={3}><h3>网关 ID:{gatewayInfo.gatewayInfo.ID}</h3></Col>
            <Col span={8}><h3>通信密码:{gatewayInfo.gatewayInfo.key}</h3></Col>
        </Row>
        <Row>
            <Col offset={3}><h3>通信密钥:{gatewayInfo.gatewayInfo.secretKey}</h3></Col>
        </Row>
    </Result>)
}