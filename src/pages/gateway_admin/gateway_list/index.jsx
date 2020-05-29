/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Link } from 'umi'
import { Button, message, Result, Col, Row } from 'antd';
import { columns } from './columns'
import { getGateway, deleteGateway } from './service'
import styles from './index.less'

export default (props) => {
    const ref = useRef();
    const [data, setData] = useState();
    const [visible, setVisible] = useState(false)
    const delectId = { idList: [] }
    // 获取网关列表
    const fetchData = async () => {
        const result = await getGateway()
        setData(result.data)
    };
    // 组件初始化
    useEffect(() => {
        setVisible(props.location.query.visible)
        document.title = '网关列表'
        fetchData();
    }, []
    )
    // 删除网关
    const handleRemove = async (selectedRows) => {
        const hide = message.loading('正在删除');
        if (!selectedRows) return true;
        try {
            await deleteGateway(delectId)
            hide();
            ref.current.reload();
            message.success('删除成功，即将刷新');
            fetchData()
            return true;
        } catch (error) {
            hide();
            message.error('删除失败，请重试');
            return false;
        }
    }

    // 选择项处理
    const rowSelection = {
        onSelect: (record, selected, selectedRows) => {
            delectId.idList.length = 0;
            selectedRows.forEach(
                (value) => {
                    delectId.idList.push(value.id)
                }
            )
        },
    };

    const { gatewayInfo } = props.location.query
    // const secreKey = gatewayInfo.secreKey ? gatewayInfo.secreKey : '无'
    /*   const tmessage =  `ID:${gatewayInfo.ID} \xa0\xa0\xa0\xa0 通信密码:${gatewayInfo.key} \xa0\xa0\xa0\xa0 密钥:${secreKey}`  */
    return (
        <PageHeaderWrapper>
            <div className={styles.div1}>
                {visible ? (
                    <Result
                        status='success'
                        title='提交成功!'
                        subTitle='文本'
                        extra={[
                            <Button type="primary" key="back" onClick={() => { setVisible(false) }}>
                                返回列表
                            </Button>,
                            <Button key="buy">下载配置文件</Button>,
                        ]}>
                        <Row>
                            <Col offset={3}><h2>网关信息:</h2></Col>
                        </Row>
                        <Row>
                            <Col span={8} offset={3}><h3>网关 ID:{gatewayInfo.ID}</h3></Col>
                            <Col span={8}><h3>通信密码:{gatewayInfo.key}</h3></Col>
                        </Row>
                        <Row>
                            <Col offset={3}><h3>通信密钥:{gatewayInfo.secreKey ? gatewayInfo.secreKey : '无'}</h3></Col>
                        </Row>
                    </Result>)
                    :
                    <ProTable
                        actionRef={ref}
                        rowKey='id'
                        options={false}
                        rowSelection={rowSelection}
                        toolBarRender={(action, { selectedRows }) => [
                            <Link to='gateway_add'>
                                <Button key="3" type="primary">
                                    <PlusOutlined />
                                新建
                                </Button></Link>,
                            <Button key="4" type="primary" danger onClick={async () => {
                                await handleRemove(selectedRows);
                                action.reload()
                            }}>
                                删除
                        </Button>,
                        ]}
                        columns={columns} dataSource={data} />}
            </div>
        </PageHeaderWrapper>
    )
}

