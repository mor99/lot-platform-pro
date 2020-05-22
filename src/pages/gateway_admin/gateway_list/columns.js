import React from 'react'
import { Link, history } from 'umi';
import { TableDropdown } from '@ant-design/pro-table';
import { Divider } from 'antd';

// 网关列表
export const columns = [
    {
        title: '名称',
        dataIndex: 'name',
        width: 150
        /* render: text => <a>{text}</a>, */
    },
    {
        title: '描述',
        dataIndex: 'description',
        width: 250,
        hideInSearch: true,
    },
    {
        title: '子设备数量',
        dataIndex: 'childDeviceNum',
        width: 150,
        hideInSearch: true,
    },
    {
        title: '核心模块',
        dataIndex: 'coreModule',
        hideInSearch: true,
        width: 150,
        sorter: (a, b) => a.as1 - b.as1,
    },
    {
        title: '状态',
        dataIndex: 'status',
        initialValue: 'all',
        valueEnum: {
            inactive: { text: '未激活', status: 'Default' },
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
        title: '更新时间',
        dataIndex: 'createTime',
        valueType:'date'
    },
    {
        title: '操作',
        valueType: 'option',
        render: (text, row) => [
            <Link to={{
                pathname: '/device_admin/device_list',
                query: {gatewayId:row.id}
            }}>
                子设备管理
                        </Link>,
            <Divider type='vertical' />,
            <TableDropdown
                onSelect={(key) => {
                    if (key === 'edit') {
                        history.push({ pathname: 'gateway_edit', query: { gateway: row } })
                    }
                }}
                menus={
                    [
                        {
                            key: 'edit',
                            name: '编辑',
                        },
                        {
                            key: 'a',
                            name: '配置下发'
                        },
                        {
                            key: 'b',
                            name: '禁用'
                        },
                        {
                            key: 'c',
                            name: '查看密钥'
                        },
                        {
                            key: 'delete',
                            name: '重置密钥'
                        }
                    ]
                }
            />
        ]
    }
]