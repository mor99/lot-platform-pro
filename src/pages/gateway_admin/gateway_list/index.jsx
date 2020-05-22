/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Link } from 'umi'
import { Button, message,Alert } from 'antd';
import { columns } from './columns'
import { getGateway, deleteGateway } from './service'
import styles from './index.less'

export default (props) => {
    const ref = useRef();
    const [data, setData] = useState();
    const [visible,setVisible] = useState(false)
    const delectId= { idList: [] }
    // 获取网关列表
    const fetchData = async () => {
        const result = await getGateway()
        console.log(result.data[0])
        setData(result.data)
    };
    // 组件初始化
    useEffect(() => {
        setVisible(props.location.query.visible)
        console.log(props)
        document.title = '网关列表'
        fetchData();
    }, []
    )
    // 删除网关
    const handleRemove = async selectedRows => {
        const hide = message.loading('正在删除');
        if (!selectedRows) return true;
        try {
            console.log(delectId)
            await deleteGateway(delectId)
            hide();
            ref.current.reload();
            message.success('删除成功，即将刷新');
            fetchData()
            return true;
        } catch (error) {
            hide();
            message.error('删除失败，请重试');
            return false;
        }
    };

    // 选择项处理
    const rowSelection = {
        onSelect: (record, selected, selectedRows) => {
            delectId.idList.length = 0;
            selectedRows.forEach(
                (value) => {
                    delectId.idList.push(value.id)
                }
            )
        },
    };
    return (
        <PageHeaderWrapper>
            <div className={styles.div1}>
            {visible ? (
                    <Alert message="新建网关成功!" type="success" description={props.location.query.message} showIcon closable/>
                ) : null}
                <ProTable
                    actionRef={ref}
                    rowKey='id'
                    options={false}
                    rowSelection={rowSelection}
                    toolBarRender={(action, { selectedRows }) => [
                        <Link to='gateway_add'>
                            <Button key="3" type="primary">
                                <PlusOutlined />
                                新建
                                </Button></Link>,
                        <Button key="4" type="primary" danger onClick={async () => {
                            await handleRemove(selectedRows);
                            action.reload()
                        }}>
                            删除
                        </Button>,
                    ]}
                    columns={columns} dataSource={data} />
            </div>
        </PageHeaderWrapper>
    )
}

