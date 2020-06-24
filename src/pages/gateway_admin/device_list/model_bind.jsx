/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Select, Space, Button, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { getModel, bindModel } from './service'
import styles from './index.less'

const { Option } = Select

export default (props) => {
    const [modelid, setModelId] = useState()
    const [data, setData] = useState([])
    const { deviceId, gatewayId } = props.location.query
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
            <div className={styles.div2}>
                <span>绑定模型 :  </span>
                <Select
                    onChange={(value) => {
                        setModelId(value)
                    }
                    }
                    size='large'
                    style={{ width: 500 }}>
                    {data.map((value) =>
                        <Option key={value.id} value={value.id}>{value.name}</Option>)
                    }
                </Select>
                <br /><br /><br /><br /><br /><br />
                <Space align='center' size='large' style={{ paddingLeft: 200 }}>
                    <Button type='primary' onClick={
                        async () => {
                            await bindModel(gatewayId, deviceId, modelid)
                            message.success('绑定成功，即将返回');
                            history.push({ pathname: '/gateway_admin/device_list', query: { gatewayId } })
                        }}>绑定子设备与模型</Button>
                    <Button type='default' onClick={() => { history.push(`/gateway_admin/device_list?gatewayId=${gatewayId}`) }
                    }>取消</Button>
                </Space>
            </div>
        </PageHeaderWrapper>

        // http://localhost:8000/gateway_admin/device_list/5ee96f03b5ce334640edafce
        // http://localhost:8000/gateway_admin/device_list?gatewayId=5ee96f03b5ce
    )
}