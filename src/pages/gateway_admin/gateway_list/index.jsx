import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import styles from './index.less'

const data = [
    {
        name: '网关一',
        age: '这是一段描述',
        da: '8',
        as1: 'as1'
    },
    {
        name: '网关2',
        age: '这是一段描述',
        da: '1',
        as1: 'as1'
    },
    {
        name: '网关三',
        age: '是一段描述',
        da: '11',
        as1: 'as1'
    }
]
const columns = [
    {
        title: '名称',
        dataIndex: 'name',
        /* render: text => <a>{text}</a>, */
    },
    {
        title: '描述',
        dataIndex: 'age',
        hideInSearch: true,
    },
    {
        title: '子设备',
        dataIndex: 'da',
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
        filters: [
            { text: 'Joe', value: 'Joe' },
            { text: 'Jim', value: 'Jim' },
        ],
    },
    {
        title: '更新时间'
    },
    {
        title: '操作'
    }
]

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};

export default ()=>  {
        return (
            <PageHeaderWrapper>
                <div className={styles.div1}>
                    <ProTable
                        options={false}
                        rowSelection={rowSelection}
                        toolBarRender={() => [
                            <Button key="3" type="primary">
                                <PlusOutlined />
                                新建
                                </Button>,
                            <Button key="4" type="primary" danger>
                                删除
                                </Button>,
                        ]}
                        columns={columns} dataSource={data} />
                </div>

            </PageHeaderWrapper>
        )
    
}

