import React from 'react';

export const columns = [
    {
        title: '控制时间',
        dataIndex: 'time',
        hideInSearch: true,
        sorter: (a, b) => a.time - b.time,
        /* render: text => <a>{text}</a>, */
    }, 
    {
        title: '描述',
        dataIndex: 'description',
        hideInSearch: true,
    },
    {
        title: '网关名称',
        dataIndex: 'gateway_name',
    },
    {
        title: '子设备',
        dataIndex: 'devices',
        hideInSearch: true,
    },
    {
        title: '状态',
        dataIndex: 'state',
        valueEnum: {
            run: {
                text: '运行中',
                status: 'Default',
            },
            closed: {
                text: '关闭',
                status: 'Error',
            },
            error: {
                text: '异常',
                status: 'Warning'
            }
        },

    },
    {
        title: '控制内容',
        dataIndex: 'content',
        hideInSearch: true,
    },
    {
        title: '操作',
        valueType: 'option',
        renderText: () => <a href='#'>查看失败原因</a>

    }
]



/* import React from 'react';
import {  Tag } from 'antd';
import  {TableDropdown}  from '@ant-design/pro-table';

export  const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 72,
    },
    {
        title: '标题',
        dataIndex: 'title',
        copyable: true,
        ellipsis: true,
        rules: [
            {
                required: true,
                message: '此项为必填项',
            },
        ],
        width: 200,
        hideInSearch: true,
    },
    {
        title: '状态',
        dataIndex: 'state',
        initialValue: 'all',
        valueEnum: {
            all: {
                text: '全部',
                status: 'Default',
            },
            open: {
                text: '未解决',
                status: 'Error',
            },
            closed: {
                text: '已解决',
                status: 'Success',
            },
        },
    },
    {
        title: '标签',
        dataIndex: 'labels',
        width: 120,
        render: (_, row) =>
            row.labels.map(({ name, id, color }) => (
                <Tag
                    color={`#${color}`}
                    key={id}
                    style={{
                        margin: 4,
                    }}
                >
                    {name}
                </Tag>
            )),
    },
    {
        title: '创建时间',
        key: 'since',
        dataIndex: 'created_at',
        valueType: 'dateTime',
        hideInForm: true,
    },
    {
        title: 'option',
        valueType: 'option',
        render: (text, row, _, action) => [
            <a href={row.html_url} target="_blank" rel="noopener noreferrer">
                查看
        </a>,
            <TableDropdown
                onSelect={() => action.reload()}
                menus={[
                    {
                        key: 'copy',
                        name: '复制',
                    },
                    {
                        key: 'delete',
                        name: '删除',
                    },
                ]}
            />,
        ],
    },
]; */

