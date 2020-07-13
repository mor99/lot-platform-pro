import React, { useState,useEffect } from 'react';
import { history } from 'umi'
import { Form, Input, Select, Button, message, Space, InputNumber } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { regExp } from '@/utils/numAndRegexp';
import { formItemLayout, tailFormItemLayout } from '@/utils/formlayout'
import { addDevice ,getPorts } from './service';
import { TcpA, RtuA} from './Items'
import styles from './index.less'

const { Option } = Select;
const { TextArea } = Input

// 添加设备
const DeviceAddForm = (props) => {
    console.log(props.location.query)
    const [form] = Form.useForm();
    const [items, setItems] = useState()
    const [ports,setPorts] = useState([])
    const fetchPorts = async ()=>{
        const result = await getPorts(props.location.query.gatewayId)
        console.log(result)
        setPorts(result.ports)
    }
    // 组件初始化
    useEffect(() => {
         fetchPorts();
        }, [])
    // const ports = getPorts(props.location.query.gatewayId)
/*     const {tcpConfig,uartConfig} = props.location.query.gateway
    const ports = (tcpConfig,uartConfig instanceof Array)?tcpConfig.concat(uartConfig):[] */
    const onFinish = async (values) => {
/*         const { name, description, connectionMode, slaveNo, ...commConfig } = values;
        const value = { name, description, connectionMode, slaveNo, commConfig } */
        const hide = message.loading('正在添加');
        try {
            hide();
            await addDevice(props.location.query.gatewayId, values)
                .then((res)=>{
                    console.log(res)
                    if (res.statusCode===201){
                        message.success('添加成功!')
                        history.goBack()
                    }
                })
           
            return true
        }
        catch (error) {
            hide();
            message.error('添加失败！请重试!');
            return false;
        }

    };

    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="device_add"
                    onFinish={onFinish}
                    scrollToFirstError>
                    <Form.Item
                        name="name"
                        label={
                            <span>
                                子设备名称&nbsp;
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: '请输入子设备名称',
                                whitespace: true,
                            },
                            {
                                pattern:regExp.gatewayRule,
                                message:'请输入数字,字母和下划线'
                            }
                        ]}>
                        <Input placeholder='给子设备起个名字' />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="设备描述">
                        <TextArea rows={4}
                            placeholder='请输入你的设备描述' />
                    </Form.Item>
                    <Form.Item
                        name="port"
                        label="通信口"
                        rules={[
                            {
                                required: true,
                                message: '请选择通信口!',
                            },
                        ]}>
                        <Select placeholder='请选择通信口'>
                            {ports.map((value)=><Option key={value} value={value}>{value}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="从站slave"
                        name='slaveNo'
                        rules={[
                            {
                                required: true,
                                pattern: regExp.num,
                                message: '填写从站编号,必须为整数!',
                            },
                        ]}>
                        <InputNumber placeholder='从站编号' />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Space size={30}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                            <Button type='default' onClick={() => { history.goBack() }}>
                                取消
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </PageHeaderWrapper>
    );
};

export default DeviceAddForm 