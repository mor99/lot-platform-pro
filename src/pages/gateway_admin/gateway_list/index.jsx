/* eslint-disable no-console */
import React ,{ useState} from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import {Link} from 'umi'
import { Button} from 'antd';
import request from 'umi-request';
import axios from 'axios'
import {columns} from './columns'
import styles from './index.less'



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
    const [data, setData] = useState(0);
    document.title = '网关列表'
    axios.get('/api/gateway')
    .then(
        (response)=>{
            response.data[0].status='running'
            setData(response.data)
            console.log(response.data)
        }
    )
    return (
        <PageHeaderWrapper>
            <div className={styles.div1}>
                <ProTable
                    options={false}
                    rowSelection={rowSelection}
                    toolBarRender={() => [
                        <Link to='gateway_add'>
                        <Button key="3" type="primary">
                            <PlusOutlined />
                                新建
                                </Button></Link>,
                        <Button key="4" type="primary" danger>
                            删除
                                </Button>,
                    ]}
                    columns={columns} dataSource={data} />
            </div>

        </PageHeaderWrapper>
    )

}

