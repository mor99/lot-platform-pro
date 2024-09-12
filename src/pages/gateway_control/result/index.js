import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Result ,Col,Row} from 'antd';
import { history } from 'umi';
import styles from './index.less'

export default () => {
    return (
        <PageHeaderWrapper>
            <div className={styles.div1}>
                <Result
                    status='success'
                    title='控制命令相应成功!'
                    subTitle=''
                    extra={[
                        <Button type="primary" key="back" onClick={() => {history.goBack()}}>
                            返回
                        </Button>,
                        <Button key="buy">下载配置文件</Button>,
                    ]}>
                    <Row>
                        <Col offset={3}><h2>本次控制命令内容:</h2></Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={3}><h3>功率因数:{123}</h3></Col>
                        {/* <Col span={8}><h3>通信密码:{123}</h3></Col> */}
                    </Row>
                   {/*  <Row>
                        <Col offset={3}><h3>通信密钥:{123}</h3></Col>
                    </Row> */}
                </Result>
            </div>
        </PageHeaderWrapper>)
}
