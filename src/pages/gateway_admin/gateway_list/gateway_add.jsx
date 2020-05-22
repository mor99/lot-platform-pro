import React from 'react';
import { Form, Input, Select, Button, Radio, message} from 'antd';
import axios from 'axios'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import styles from './index.less'

const { Option } = Select;
const { TextArea } = Input
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 10 }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 12,
            offset: 9,
        },
        sm: {
            span: 12,
            offset: 10,
        },
    },
};

const GatewayAddForm = () => {
    let gatewayInfo={}
    const [form] = Form.useForm();
    // 添加数据
    const onFinish = async (values) => {
        const hide = message.loading('正在添加');
        try {
            await axios.post('/api/gateway',
                JSON.stringify({ "gatewayInfo": values }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    hide();
                    gatewayInfo = { ...res.data.gatewayInfo }
                    const secreKey = gatewayInfo.secreKey?gatewayInfo.secreKey:'无'
                    history.push({pathname:'gateway_list',query:{message:`ID:${gatewayInfo.ID} \xa0\xa0\xa0\xa0 通信密码:${gatewayInfo.key} \xa0\xa0\xa0\xa0 密钥:${secreKey}`,visible:true}})
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
            <div className={styles.div1}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="gateway_add"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label={
                            <span>
                                网关名称&nbsp;
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: '请输入网关名称',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder='给网关起个名字' />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="网关描述"
                    >
                        <TextArea rows={4}
                            placeholder='请输入你的网关描述' />
                    </Form.Item>
                    <Form.Item
                        name="coreModule"
                        label="核心模块"
                        rules={[
                            {
                                required: true,
                                message: '选择核心模块!',
                            },
                        ]}
                    >
                        <Select placeholder='请选择核心模块' >
                            <Option value="ARM">ARM</Option>
                            <Option value="MIPS">MIPS</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="protocol"
                        label="通信协议"
                        rules={[
                            {
                                required: true,
                                message: '选择协议!',
                            },
                        ]}
                    >
                        <Select placeholder='请选择通信协议' >
                            <Option value="MQTT">MQTT</Option>
                            <Option value="COAP">COAP</Option>
                            <Option value="HTTP">HTTP</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='是否启用加密通信'
                        name='isEncrypted'>
                        <Radio.Group >
                            <Radio value>加密</Radio>
                            <Radio value={false}>不加密</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="流量限额"
                        name='dataPlan'
                    >
                        <Input placeholder='请输入流量限额,单位MB' type='number' />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                         </Button>
                    </Form.Item>
                </Form>
            </div>
        </PageHeaderWrapper>
    );
};

export default GatewayAddForm 