import React from 'react'
import Link from 'umi'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './index.less'

const columns = [
    {
        title: '地址',
        dataIndex: 'name',
        /* render: text => <a>{text}</a>, */
    },
    {
        title: '显示名称',
        dataIndex: 'age',
        hideInSearch: true,
    },
    {
        title: 'Bit位',
        dataIndex: 'da',
        hideInSearch: true,
    },
    {
        title: '数据类型',
        dataIndex: 'as1',
        hideInSearch: true,
    },
    {
        title: '数据长度',
        dataIndex: 'state',
    },
    {
        title: '单位'
    },
    {
        title: '量程上线'
    },
    {
        title: '量程下线'
    },
    {
        title: '计算公式'
    },
    {
        title: '采集频率'
    },
    {
        title: '上传条件'
    },
    {
        titile: '操作'
    }
]


export default () => {
    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <ProTable
                    options={false}
                    toolBarRender={() => [
                        <Button key="3" type="primary">
                            
                            <PlusOutlined />
                                新建
                  
                        </Button>,
                        <Button key="4" type="primary" >
                            批量导入
                        </Button>,
                        <Button key="5" type="primary" >
                            批量导出
                                </Button>,
                    ]}
                    columns={columns}
                    dataSource={null}
                />
            </div>
        </PageHeaderWrapper>
    )
}