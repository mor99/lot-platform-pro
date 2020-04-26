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
      title:'网关名称',
      dataIndex:'gateway_name',  
    },
    {
        title: '子设备',
        dataIndex: 'devices',
        hideInSearch: true,
    },
    {
        title: '状态',
        dataIndex:'state',
        valueEnum: {    
            run: {
                text: '运行中',
                status: 'Default',
            },
            closed: {
                text: '关闭',
                status: 'Error',
            },
            error:{
                text:'异常',
                status:'Warning'
            }
        },

    },
    {
        title: '控制内容',
        dataIndex:'content',
        hideInSearch: true,
    },
    {
        title: '操作',
        valueType:'option',
        renderText : ()=> <a href='#'>查看失败原因</a>

    }
]
