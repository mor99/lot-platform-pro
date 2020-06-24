import React from 'react';
import { Form, Input, Space, Select, Button, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { addModel } from './service'
import styles from './index.less'

const { Option } = Select;
const { TextArea } = Input
const formItemLayout = {
    labelCol: { span: 4 },
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

const ModelAdd = () => {
    const [form] = Form.useForm();
    // 添加数据
    const onFinish = async (values) => {
        const hide = message.loading('正在添加');
        try {
            hide()
            await addModel(values)
            message.success('添加成功!!!')
            history.push({ pathname: 'model_list', query: {} })
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
                    name="device_add"
                    onFinish={onFinish}
                    scrollToFirstError>
                    <Form.Item
                        name="name"
                        label={
                            <span>
                                模型名称&nbsp;
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: '请输入模型名称',
                                whitespace: true,
                            },
                        ]}>
                        <Input placeholder='给模型起个名字' />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="模型描述">
                        <TextArea rows={4}
                            placeholder='请对模型做个描述' />
                    </Form.Item>
                    <Form.Item
                        name="connectionMode"
                        label="通信协议"
                        rules={[
                            {
                                required: true,
                                message: '请选择通信协议!',
                            },
                        ]}>
                        <Select placeholder='请选择模式' >
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

export default ModelAdd 