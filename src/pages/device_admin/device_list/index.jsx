import React from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'umi'
import styles from './index.less'

const columns = [
    {
        title: '子设备ID',
        dataIndex: 'name',
        /* render: text => <a>{text}</a>, */
    },
    {
        title: '描述',
        dataIndex: 'age',
        hideInSearch: true,
    },
    {
        title: '从站(slave)',
        dataIndex: 'da',
        sorter: (a, b) => a.da - b.da,
        hideInSearch: true,
    },
    {
        title: '接入方式',
        dataIndex: 'as1',
        hideInSearch: true,
        sorter: (a, b) => a.da - b.da,
    },
    {
        title: '绑定模型',
        dataIndex: 'state',
        sorter: (a, b) => a.da - b.da,
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

export default () => {
    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <ProTable
                    options={false}
                    rowSelection={rowSelection}
                    toolBarRender={() => [
                        <Button key="3" type="primary">
                            <Link to = 'device_add'>
                            <PlusOutlined />
                                新建
                            </Link>
                                </Button>,
                        <Button key="4" type="primary" danger>
                            删除
                                </Button>,
                    ]}
                    columns={columns}
                    dataSource={null}
                />
            </div>
        </PageHeaderWrapper>
    )
}