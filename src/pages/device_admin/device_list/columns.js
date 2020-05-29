import React from 'react'
import { Link, history } from 'umi'

export const columns = [
    {
        title: '子设备ID',
        dataIndex: 'name',
        key: 'name',
        width: 160,
        render: (text, row) => <Link to={{
            pathname: '/device_admin/device_edit',
            query: {
                device: row,
                gatewayId: history.location.query.gatewayId
            }
        }}>
            {text}
        </Link>,
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
        hideInSearch: true,
        width: 180
    },
    {
        title: '从站(slave)',
        dataIndex: 'slaveNo',
        key: 'slaveNo',
        align: 'center',
        width: 180,
        sorter: (a, b) => a.slaveNo - b.slaveNo,
        hideInSearch: true,
    },
    {
        title: '接入方式',
        dataIndex: 'connectionMode',
        key: 'connectionMode',
        width: 180,
        hideInSearch: true,
        sorter: (a, b) => a.name - b.name,
    },
    {
        title: '绑定模型',
        dataIndex: 'commConfig',
        key: 'commConfig',
        width: 230
    },
    {
        title: '操作',
        valueType: 'option',
        align: 'center',
        width: 230,
        render: (text, row) => [
            <Link to={{
                pathname: '#',
                query: {}
            }}>
                绑定模型
            </Link>,
            <Link to={{
                pathname: '/device_admin/device_edit',
                query: {
                    device: row,
                    gatewayId: history.location.query.gatewayId
                }
            }}>
                修改
            </Link>,
            <Link to={{
                pathname: '#',
                query: {}
            }}>
                禁用
            </Link>,
            <Link to={{
                pathname: '#',
                query: {}
            }}>
                查看详情
            </Link>,
        ],
    }
]
