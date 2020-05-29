import React from 'react';
import { Form, Input, Select, Space, Button, message, InputNumber } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { editModel } from './service'
import styles from './index.less'

const { Option } = Select
const { TextArea } = Input
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 }
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

export default () => {
    const [form] = Form.useForm();
    const { model } = history.location.query;
    // 添加数据
    const onFinish = async (values) => {
        const hide = message.loading('正在修改');
        try {
            await editModel(model.id, values)
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
                    name="device_edit"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label={
                            <span>
                                模型名称&nbsp;
                            </span>
                        }
                        rules={[
                            {
                                message: '请输入模型名称',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input defaultValue={model.name} />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="模型描述"
                    >
                        <TextArea rows={4}
                            defaultValue={model.description} />
                        <span />
                    </Form.Item>

                    <Form.Item
                        name="protocol"
                        label="通信协议"
                        rules={[
                            {
                                message: '选择通信协议!',
                            },
                        ]}
                    >
                        <Select defaultValue={model.protocol} >
                            <Option value="TCP">TCP</Option>
                            <Option value="RTU">RTU</Option>
                            <Option value="NEMA">NEMA</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Space size={10}>
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

