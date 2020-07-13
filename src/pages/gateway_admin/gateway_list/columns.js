import React from 'react'
import { Link, history } from 'umi';
import { TableDropdown } from '@ant-design/pro-table';
import { Divider, Popconfirm, message, Button,Modal } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { alterpassword, publishConfig } from './service'

const { confirm } = Modal;
// 配置下发前确认
const showDeleteConfirm = (gatewayId) => {
    confirm({
        title: '是否要配置下发?',
        centered: true,
        icon: <ExclamationCircleOutlined />,
        content: '',
        okText: '确认',
        // okType: 'danger',
        cancelText: '取消',
        onOk() {
           publishConfig(gatewayId)
           message.success('下发成功')
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}
/* function confirm(e) {
    // publishConfig(id)
    console.log(e)
    message.error('禁用成功!');
} */
function cancel(e) {
    console.log(e);
    message.success('启用成功');
}
// 网关列表
export const columns = [
    {
        title: '名称',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: '描述',
        dataIndex: 'description',
        width: 150,
        hideInSearch: true,
    },
    {
        title: '子设备数量',
        dataIndex: 'childDeviceNum',
        width: 150,
        align: 'center',
        hideInSearch: true,
    },
    {
        title: '核心模块',
        dataIndex: 'coreModule',
        hideInSearch: true,
        align: 'center',
        width: 150,
        sorter: (a, b) => a.as1 - b.as1,
    },
    {
        title: '状态',
        dataIndex: 'status',
        initialValue: '',
        width: 130,
        align: 'center',
        filters: {},
        valueEnum: {
            inactive: {
                text: '未激活',
                status: 'Default'
            },
            abnormal: {
                text: '异常',
                status: 'Error',
            },
            running: {
                text: '运行中',
                status: 'Success',
            },
            offline: {
                text: '离线',
                status: 'Default',
            },
        },
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateTime',
        width: 150,
        align: 'center',
        hideInSearch: true,
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        valueType: 'dateTime',
        width: 150,
        align: 'center',
        hideInSearch: true,
    },
    {
        title: '操作',
        valueType: 'option',
        align: 'center',
        width: 350,
        render: (text, row) => [
            <Link to={{
                pathname: '/gateway_admin/device_list',
                query: { gatewayId: row.id }
            }}>
                子设备管理
            </Link>,
            <Button type='link' onClick={()=>{history.push({pathname:'gateway_structure',query:{gatewayId:row.id}})}}>
                查看结构图</Button>,
            <Button type='link' onClick={()=>{
                showDeleteConfirm(row.id)}}>
                配置下发</Button>,
            <TableDropdown
                onSelect={(key) => {
                    if (key === 'edit') {
                        history.push({ pathname: 'gateway_edit', query: { gateway: row } })
                    }
                    else if (key === 'alter') {
                        console.log(row.id)
                        alterpassword(row.id)
                    }
                    else {
                        console.log(row.key)
                    }
                }}
                menus={
                    [
                        {
                            key: 'edit',
                            name: '编辑网关',
                        },
                        {
                            key: 'c',
                            name: '查看密钥'
                        },
                        {
                            key: 'alter',
                            name: '重置密钥'
                        }
                    ]
                }
            />
        ]
    }
]