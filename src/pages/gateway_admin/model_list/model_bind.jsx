/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Select, Space, Button, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history ,Link} from 'umi'
import { getModel } from './service'
import styles from './index.less'

const { Option } = Select

export default () => {
    const [data, setData] = useState([])
    const fetchData = async () => {
        const result = await getModel()
        setData(result)
    }
    useEffect(() => {
        fetchData()
    }, []
    )
    return (
        <PageHeaderWrapper>
            <div className={styles.div3}>
                <span>绑定模型 :  </span>
                <Select
                    style={{ width: 800 }}>

                    {data.map((value) =>
                        <Option>{value.name}</Option>)
                    }
                </Select>
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                <Space align='center' size='large'>
                    <Button type='primary' onClick={
                        () => {
                            message.success('绑定成功，即将返回');
                            history.push( '/gateway_admin/gateway_list')
                        }}>绑定子设备与模型</Button>
                    <Button type='default' onClick={() => { history.push('/gateway_admin/gateway_list' )}
                    }>取消</Button>
                </Space>
            </div>
        </PageHeaderWrapper>
    )
}