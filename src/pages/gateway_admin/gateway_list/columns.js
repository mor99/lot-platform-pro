import React from 'react'
import { Link } from 'umi';
import { TableDropdown } from '@ant-design/pro-table';
import {  Divider} from 'antd';


export const columns = [
    {
        title: '名称',
        dataIndex: 'name',
        width:150
        /* render: text => <a>{text}</a>, */
    },  
    {
        title: '描述',
        dataIndex: 'description',
        width:250,
        hideInSearch: true,
    },
    {
        title: '子设备数量',
        dataIndex: 'childDeviceNum',
        width:150,
        hideInSearch: true,
    },
    {
        title: '核心模块',
        dataIndex: 'coreModule',
        hideInSearch: true,
        width:150,
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
        dataIndex:'createTime'
    },
    {
        title: '操作',
        valueType: 'option',
        render: (text, row, _, action) => [
                <Link to='/device_admin/device_list'>子设备管理</Link>,
                <Divider type='vertical' />,
                <TableDropdown
                    onSelect={() => action.reload()}
                    menus={
                        [
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
                                key: 'd',
                                name: '重置密钥'
                            }
                        ]
                    }
                />
        ]
    }
]