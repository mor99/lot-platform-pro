/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Link, connect, history } from 'umi'
import { Button, message, Result, Col, Row, Modal } from 'antd';
import { columns } from './columns'
import { getGateway, deleteGateway } from './service'
import styles from './index.less'

const { confirm } = Modal;
const Gateway = (props) => {
    const ref = useRef();
    const [data, setData] = useState();
    const [visible, setVisible] = useState(false)
    // const [visible1, setVisible1] = useState(false)
    const delectId = { idList: [] }

    /*     const showModal = () => { setVisible1(true) }
        const handleOk = e => {
            console.log(e);
            setVisible1(false)
        };
        const handleCancel = e => {
            console.log(e);
            setVisible1(false)
        }; */
    // 获取网关列表
    const fetchData = async () => {
        const result = await getGateway()
        console.log(result)
        if (result.status) {
            setData(null)
            console.log('未请求到数据')
        }
        else { setData(result) }
    };
    const { gatewayInfo } = props.location.query
    // console.log(gatewayInfo.gatewayInfo.secretkey)
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

    // 删除前确认
    const showDeleteConfirm = (selectRows) => {
        confirm({
            title: '确认要删除网关吗?',
            centered: true,
            icon: <ExclamationCircleOutlined />,
            content: '删除后对应的实体网关将无法继续工作!',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                handleRemove(selectRows)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
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
    const result = (gatewayInfo)?
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
        </Result> :
        <Result status='error'
            title='添加失败!'
            subTitle='网关重名或服务器错误'
            extra={[
                <Button type="primary" key="console" onClick={() => { setVisible(false) }}>
                    返回列表
                    </Button>,
                <Button key="buy" onClick={() => { history.push('gateway_add') }}>重新添加</Button>,
            ]} />

    return (
        <PageHeaderWrapper>
            <div className={styles.div1}>
                {/* <Modal
                    title="确认要删除网关吗"
                    visible={visible1}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    删除后对应的实体网关将无法继续工作
                </Modal> */}
                {visible ? result
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
                            <Button key="4" type="primary" danger onClick={() => {
                                // handleRemove(selectedRows)
                                showDeleteConfirm(selectedRows)
                                // action.reload()
                            }}>
                                删除
                        </Button>,
                        ]}
                        columns={columns} dataSource={data} />}
            </div>
        </PageHeaderWrapper>
    )
}

export default connect(({ login }) => ({
    userLogin: login,
}))(Gateway)