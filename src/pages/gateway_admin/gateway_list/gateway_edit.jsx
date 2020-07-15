import React from 'react';
import { Form, Input, Select, Space, Button, Radio, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { regExp } from '@/utils/numAndRegexp'
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
    console.log(gateway)
    // 添加数据
    const onFinish = async (values) => {
        const {dataPlan} = values
        const value = {...values,dataPlan:parseInt(dataPlan)}
        console.log(value)
        const hide = message.loading('正在修改');
        try {
            hide();
            await editGateway(gateway.id, value)
                .then((res)=>{
                    if(res.statusCode&&res.statusCode===200){
                        message.success(res.message)
                        history.goBack()
                    }
                })

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
                    initialValues={gateway}
                    form={form}
                    name="gateway_edit"
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
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="网关描述"
                    >
                        <TextArea rows={4} maxLength={128}/>
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
                        <Select disabled>
                            <Option value="ARM">ARM</Option>
                            <Option value="MIPS" disabled>MIPS</Option>
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
                        <Select disabled>
                            <Option value="MQTT">MQTT</Option>
                            <Option value="COAP" disabled>COAP</Option>
                            <Option value="HTTP" disabled>HTTP</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='通信方式'
                        name='isEncrypted'>
                        <Radio.Group >
                            <Radio value>加密</Radio>
                            <Radio value={false}>不加密</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="流量限额(MB)"
                        name='dataPlan'
                        rules={[
                            {
                                message: '输入整数!',
                                pattern: regExp.num,
                                whitespace: true
                            },
                        ]}
                    >
                        <Input type='number' style={{width:'30%'}} addonAfter="MB"  />
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