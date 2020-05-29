import React from 'react';

export const columns = [
    {
        title: '多选',
        dataIndex: 'name',
        hideInSearch: true,
        /* render: text => <a>{text}</a>, */
    },
    {
        title: '描述',
        dataIndex: 'description',
        hideInSearch: true,
    },
    {
        title: '子设备',
        dataIndex: 'devices',
        hideInSearch: true,
    },
    {
        title: '核心模块',
        dataIndex: 'as1',
        hideInSearch: true,
        sorter: (a, b) => a.as1 - b.as1,
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
        title: '更新时间',
        dataIndex: 'time',
        hideInSearch: true,
    },
    {
        title: '操作',
        valueType: 'option',
        renderText: () => <a href='#'>下发控制命令</a>

    }
]