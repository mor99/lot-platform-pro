export  const columns = [
    {
        title: '子设备ID',
        dataIndex: 'name',
        key:'name',
        width:150
        /* render: text => <a>{text}</a>, */
    },
    {
        title: '描述',
        dataIndex: 'description',
        key:'description',
        hideInSearch: true,
        width:250
    },
    {
        title: '从站(slave)',
        dataIndex: 'slaveNo',
        key: 'slaveNo',
        width:150,
        sorter: (a, b) => a.slaveNo - b.slaveNo,
        hideInSearch: true,
    },
    {
        title: '接入方式',
        dataIndex: 'connectionMode',
        key: 'connectionMode',
        width:150,
        hideInSearch: true,
        sorter: (a, b) => a.name - b.name,
    },
    {
        title: '绑定模型',
        dataIndex: 'commConfig',
        key: 'commConfig',
        width:250
    },
    {
        title: '操作',
        dataIndex:'option',
        key:'option'
    }
]
