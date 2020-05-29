import React from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { columns } from './columns'
import styles from './index.less'

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