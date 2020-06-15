import React from 'react';
import { Form, Input, Select, Space, Button, Radio, message, InputNumber } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { editGateway } from './service'
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
            offset: 7,
        },
    },
};
const GatewayEditForm = () => {
    const [form] = Form.useForm();
    const { gateway } = history.location.query;
    // 添加数据
    const onFinish = async (values) => {
        const hide = message.loading('正在修改');
        try {
            await editGateway(gateway.id, values)
            hide();
            message.success('修改成功')
            history.goBack()
            return true
        }
        catch (error) {
            hide();
            message.error('修改失败！请重试!');
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
                                message: '请输入网关名称',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input defaultValue={gateway.name} />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="网关描述"
                    >
                        <TextArea rows={4}
                            defaultValue={gateway.description} />
                    </Form.Item>

                    <Form.Item
                        name="coreModule"
                        label="核心模块"
                        rules={[
                            {
                                required: false,
                                message: '选择核心模块!',
                            },
                        ]}
                    >
                        <Select defaultValue={gateway.coreModule} >
                            <Option value="ARM">ARM</Option>
                            <Option value="MIPS">MIPS</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="protocol"
                        label="通信协议"
                        rules={[
                            {
                                required: false,
                                message: '选择协议!',
                            },
                        ]}
                    >
                        <Select defaultValue={gateway.protocol} >
                            <Option value="MQTT">MQTT</Option>
                            <Option value="COAP">COAP</Option>
                            <Option value="HTTP">HTTP</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        label='是否启用加密通信'
                        name='isEncrypted'>
                        <Radio.Group defaultValue={gateway.isEncrypted}>
                            <Radio value>加密</Radio>
                            <Radio value={false}>不加密</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="流量限额(MB)"
                        name='dataPlan'
                        rules={[
                            {
                                required: false,
                                message: '输入整数!',
                                pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                whitespace: true
                            },
                        ]}
                    >
                        <InputNumber defaultValue={gateway.dataPlan} />
                        <p />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Space size={30}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                            <Button type='default' onClick={() => { history.goBack() }}>
                                返回
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </PageHeaderWrapper>
    );
};

export default GatewayEditForm 