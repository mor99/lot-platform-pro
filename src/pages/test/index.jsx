/* import React, { useRef, useState } from 'react';
import { Table, Divider, Tag,Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import styles from './index.less' */

import React, { useRef, useState, } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import request from 'umi-request';
import styles from './index.less'

import { columns } from './columns'
import { data } from './data';
import { totalObj } from './totalObj'

const HistoryRecord = () => {
    const actionRef = useRef();
    const [visible, setVisible] = useState(false);
    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <Drawer width={600} onClose={() => setVisible(false)} visible={visible}>
                    <Button
                        style={{
                            margin: 8,
                        }}
                        onClick={() => {
                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }}
                    >
                        刷新
                   </Button>
                    <Button
                        onClick={() => {
                            if (actionRef.current) {
                                actionRef.current.reset();
                            }
                        }}
                    >
                        重置1
                    </Button>
                    <ProTable columns={columns} type="form" onSubmit={params => console.log(params)} />
                </Drawer>
                <ProTable
                    columns={columns}
                    actionRef={actionRef}
                    request={async (params = {}) => {
                        /* const data = await request(
                            'https://api.github.com/repos/ant-design/ant-design-pro/issues',
                            {
                                params: { ...params, page: params.current, per_page: params.pageSize },
                            },
                        ); */
                        /* const totalObj = await request(
                            'https://api.github.com/repos/ant-design/ant-design-pro/issues?per_page=1',
                            {
                                params,
                            },
                        ); */
                        return {
                            data,
                            page: params.current,
                            success: true,
                            total:
                                (
                                    totalObj[0] || {
                                        number: 0,
                                    }
                                ).number - 56,
                        };
                    }}
                    rowKey="id"
                    dateFormatter="string"
                    headerTitle="基础 Table"
                    toolBarRender={() => [
                        <Button key="3" type="primary">
                            <PlusOutlined />
                             新建
                        </Button>,
                    ]}
                        />
                    </div>
            </PageHeaderWrapper>

    )
}

export default HistoryRecord;

