import React, { useState, useEffect, useRef } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined ,ExclamationCircleOutlined} from '@ant-design/icons';
import { Button, message,Modal } from 'antd';
import { Link, history } from 'umi'
import { columns } from './columns'
import { getDeviceList, deleteDevice } from './service'
import styles from './index.less'

const { confirm } = Modal;
export default (props) => {
    const ref = useRef();
    // 数据初始化
    const [isban,setBan] = useState('禁止')
    const [data, setData] = useState()
    const deleteIds = { deviceList: [] }

    
    // 获取子设备列表
    const fetchData = async () => {
        const result = await getDeviceList(history.location.query.gatewayId)
        setData(result)
    }

    // 组件初始化
    useEffect(() => {
        fetchData();
    }, [])

    // 删除设备
    const handleRemove = async selectedRows => {
        const { gatewayId } = props.location.query;
        const hide = message.loading('正在删除');
        if (!selectedRows) return true;
        try {
            await deleteDevice(gatewayId, deleteIds)
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
    };
        // 删除前确认
        const showDeleteConfirm = (selectRows) => {
            confirm({
                title: '确认要删除设备吗?',
                centered: true,
                icon: <ExclamationCircleOutlined />,
                content: '删除后对应的设备网关将无法继续工作!',
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
    // 选中操作
    const rowSelection = {
        onSelect: (record, selected, selectedRows) => {
            deleteIds.deviceList.length = 0;
            selectedRows.forEach(
                (value) => {
                    deleteIds.deviceList.push(value.id)
                }
            )
        },
    };

    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <ProTable
                    actionRef={ref}
                    rowKey="name"
                    options={false}
                    rowSelection={rowSelection}
                    toolBarRender={(action, { selectedRows }) => [
                        <Button key="button1" type="primary">
                            <Link to={{ pathname: 'device_add', query: props.location.query }} ><PlusOutlined />新建</Link>
                        </Button>,
                        <Button key="button2" type="primary" danger onClick={() => {
                            showDeleteConfirm(selectedRows)
                            // action.reload()
                        }}>删除</Button>,
                    ]}
                    columns={columns(props.location.query.gatewayId,isban,setBan)}
                    dataSource={data}
                />
            </div>
        </PageHeaderWrapper>
    )
}