import React from 'react';
import { history } from 'umi'
import { Form, Input, Select, Button, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { addDevice } from './service';
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

const DeviceAddForm = (props) => {
    const [form] = Form.useForm();
    console.log(props.location.query)
    const onFinish = async (values) => {
        // const value = JSON.stringify(values)
            const value = {
            deviceInfo: {
                name: values.name,
                description: values.description,
                connectionMode: values.connectionMode,
                slaveNo: values.slaveNo,
                commConfig: {
                    serialNo: values.slaveNo,
                    baudRate: values.baudRate,
                    dataLength: values.dataLength,
                    parity: values.parity,
                    stopBit: values.stopBit,
                    ip: values.ip,
                    port: values.port
                }
            }
        }
        const hide = message.loading('正在添加');
        try {
            await addDevice(props.location.query, value)
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
                    scrollToFirstError
                >
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
                        ]}
                    >
                        <Input placeholder='给子设备起个名字' />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="设备描述"
                    >
                        <TextArea rows={4}
                            placeholder='请输入你的设备描述' />
                    </Form.Item>

                    <Form.Item
                        name="connectionMode"
                        label="选择模式"
                        rules={[
                            {
                                required: true,
                                message: '选择模式!',
                            },
                        ]}
                    >
                        <Select placeholder='请选择模式' >
                            <Option value="TCP">TCP</Option>
                            <Option value="RTU">RTU</Option>
                            <Option value="MIPS">选项3</Option>

                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="从站slave"
                        name='slaveNo'
                        rules={[
                            {
                                required: true,
                                message: '选择模式!',
                            },
                        ]}
                    >
                        <Input placeholder='从站编号' />
                    </Form.Item>

                    <Form.Item
                        label="IP地址"
                        name="ip"
                        rules={[
                            {
                                required: true,
                                message: '选择模式!',
                            },
                        ]}
                    >
                        <Input placeholder='请输入IP地址' />
                    </Form.Item>

                    <Form.Item
                        label="端口号"
                        name='port'
                        rules={[
                            {
                                required: true,
                                message: '选择模式!',
                            },
                        ]}
                    >
                        <Input placeholder='请输入端口号' />
                    </Form.Item>
                    <br />
                    <br />
                    <Form.Item
                        label="串口号"
                        name='serialNo'
                        rules={[
                            {
                                required: true,
                                message: '选择模式!',
                            },
                        ]}
                    >
                        <Input placeholder='请输入串口号' />
                    </Form.Item>

                    <Form.Item
                        name="baudRate"
                        label="波特率"
                        rules={[
                            {
                                required: true,
                                message: '选择波特率!',
                            },
                        ]}
                    >
                        <Select placeholder='请选择波特率' >
                            <Option value="9600">9600</Option>
                            <Option value="9600">115200</Option>
                            <Option value="MIPS">1830000</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="dataLength"
                        label="数据位"
                        rules={[
                            {
                                required: true,
                                message: '选择数据位!',
                            },
                        ]}
                    >
                        <Select placeholder='请选择模式' >
                            <Option value="7">7</Option>
                            <Option value="8">8</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="parity"
                        label="校验"
                        rules={[
                            {
                                required: true,
                                message: '请选择模式!',
                            },
                        ]}
                    >
                        <Select placeholder='请选择模式' >
                            <Option value="无校验">无校验</Option>
                            <Option value="奇校验">奇校验</Option>
                            <Option value="偶校验">偶校验</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="stopBit"
                        label="停止位"
                        rules={[
                            {
                                required: true,
                                message: '请选择模式!',
                            },
                        ]}
                    >
                        <Select placeholder='请选择模式' >
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                        </Select>
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

export default DeviceAddForm 