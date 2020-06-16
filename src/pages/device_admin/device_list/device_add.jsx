import React, { useState } from 'react';
import { history } from 'umi'
import { Form, Input, Select, Button, message, Space, InputNumber } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { addDevice } from './service';
import { TcpA, RtuA, formItemLayout, tailFormItemLayout } from './Items'
import styles from './index.less'

const { Option } = Select;
const { TextArea } = Input

const DeviceAddForm = (props) => {
    const [form] = Form.useForm();
    const [items, setItems] = useState()
    const onFinish = async (values) => {
        const {name,description,connectionMode,slaveNo,...commConfig}=values;
        const value = {name,description,connectionMode,slaveNo,commConfig}
        const hide = message.loading('正在添加');
        try {
            await addDevice(props.location.query.gatewayId, value)
            hide();
            message.success('添加成功')
            history.goBack()
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
                        label="从站slave"
                        name='slaveNo'
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                message: '填写从站编号,必须为整数!',
                            },
                        ]}>
                        <InputNumber placeholder='从站编号' />
                    </Form.Item>
                    <Form.Item
                        name="connectionMode"
                        label="选择模式"
                        rules={[
                            {
                                required: true,
                                message: '选择模式!',
                            },
                        ]}>
                        <Select placeholder='请选择模式' onChange={(value) => {
                            setItems((value === 'TCP') ? TcpA : RtuA)
                        }}>
                            <Option value="TCP">TCP</Option>
                            <Option value="RTU">RTU</Option>
                            <Option value="MIPS">选项3</Option>

                        </Select>
                    </Form.Item>
                    {items}
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