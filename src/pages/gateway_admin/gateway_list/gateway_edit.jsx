import React from 'react';
import { Form, Input, Select, Button, Radio, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { editGateway} from './service'
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
    const [form] = Form.useForm();
    const {gateway} = history.location.query;
    // 添加数据
    const onFinish = async (values) => {
        const hide = message.loading('正在修改');
        try {
            await editGateway(gateway.id,{gatewayInfo:values})
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
                                required: true,
                                message: '请输入网关名称',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder={gateway.name} />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="网关描述"
                    >
                        <TextArea rows={4}
                            placeholder={gateway.description} />
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
                        <Select placeholder={`当前选择:${gateway.coreModule}`} >
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
                        <Select placeholder={`当前选择:${gateway.protocol}`} >
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
                        label="流量限额"
                        name='dataPlan'
                    >
                        <Input placeholder={`当前限额:${gateway.dataPlan}M`} type='number' />
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