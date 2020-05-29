import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import ProTable from '@ant-design/pro-table';
import styles from './index.less'
import { columns } from './columns'
import { data } from './data'

export default () => {

    const rowSelection = {
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <ProTable
                    rowSelection={rowSelection}
                    search={{ searchText: '提交', resetText: '取消' }}
                    columns={columns}
                    dataSource={data} />
            </div>

        </PageHeaderWrapper>
    )
}
