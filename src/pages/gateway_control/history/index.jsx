
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import ProTable from '@ant-design/pro-table';
import styles from './index.less'
import { columns } from './columns'
import { data } from './data'

export default () => {
    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <ProTable
                    search={{ searchText: '提交', resetText: '取消' }}
                    columns={columns}
                    dataSource={data} />
            </div>
        </PageHeaderWrapper>
    )
}
