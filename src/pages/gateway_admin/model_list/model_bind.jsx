/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Select, Space, Button, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { getModel ,bindModel} from './service'
import styles from './index.less'

const { Option } = Select

export default (props) => {
    console.log(props)
    const [id,setId] = useState()
    const [data, setData] = useState([])
    const fetchData = async () => {
        const result = await getModel()
        console.log(result)
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
                    onChange={(value)=>{
                        console.log(value)
                        }}
                    style={{ width: 800 }}>

                    {
                        {/* data.map((value) =>
                        <Option key={value.id} value={value.id}>{value}</Option>) */}
                    }
                </Select>
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                <Space align='center' size='large' style={{paddingLeft:300}}>
                    <Button type='primary' onClick={() => {
                            // bindModel()
                            message.success('绑定成功，即将返回');
                            // history.push('/gateway_admin/gateway_list')
                        }}>绑定子设备与模型</Button>
                    <Button type='default' onClick={() => { history.push('/gateway_admin/gateway_list') }
                    }>取消</Button>
                </Space>
            </div>
        </PageHeaderWrapper>
    )
}