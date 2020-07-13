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
    const delectId = { idList: [] }
    const ref = useRef();
    const [data, setData] = useState();
    // const [visible, setVisible] = useState(false)
    // 获取网关列表
    const fetchData = async () => {
        const result = await getGateway()
        console.log(result)
        if (result) {
            setData(result)
            console.log('请求到数据:'+result)
        }
        else { setData(null) }
    };

    // 组件初始化
    useEffect(() => {
        document.title = '网关列表'
        fetchData();
    }, []
    )

    // 删除网关
    const handleRemove = async (selectedRows) => {
        const hide = message.loading('正在删除');
        if (!selectedRows) return true;
        try {
            console.log(delectId)
            await deleteGateway(delectId)
                .then((res) => {
                    if (res.statusCode && res.statusCode === 200) {
                        hide();
                        ref.current.reload();
                        message.success('删除成功');
                        fetchData()
                    }
                })
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
        onSelectAll:(selected, selectedRows, changeRows)=>{
            delectId.idList.length = 0;
            selectedRows.forEach(
                (value) => {
                    delectId.idList.push(value.id)
                }
            )
        }
    };

    return (
        <PageHeaderWrapper>
            <div className={styles.div1}>
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
                            showDeleteConfirm(selectedRows)
                            // action.reload()
                        }}>
                            删除
                        </Button>,
                    ]}
                    columns={columns} dataSource={data} />
            </div>
        </PageHeaderWrapper>
    )
}

export default connect(({ login }) => ({
    userLogin: login,
}))(Gateway)