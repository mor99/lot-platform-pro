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
    const [modelname,setModelName]= useState()
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
                        const model = data.filter(item=> item.id=== value)[0]
                        setModelId(value)
                        setModelName(model.name)}}
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
                            console.log(modelname)
                            await bindModel(gatewayId, deviceId, modelid,modelname)
                                .then((res)=>{
                                    if (res.statusCode&&res.statusCode===200){
                                        message.success('绑定成功');
                                        history.goBack()
                                    }
                                })
                            
                        }}>绑定子设备与模型</Button>
                    <Button type='default' onClick={() => { history.push(`/gateway_admin/device_list?gatewayId=${gatewayId}`) }
                    }>取消</Button>
                </Space>
            </div>
        </PageHeaderWrapper>
    )
}