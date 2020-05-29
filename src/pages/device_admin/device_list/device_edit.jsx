import React, { useState } from 'react';
import { Form, Input, Select, Button, message, Space } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { editDevice } from './service'
import { TcpE, RtuE, formItemLayout, tailFormItemLayout } from './Items'
import styles from './index.less'

const { Option } = Select;
const { TextArea } = Input

const DeviceEditForm = (props) => {
    const [form] = Form.useForm();
    const { gatewayId, device } = props.location.query;
    const [items, setItems] = useState((device.connectionMode === 'TCP') ? TcpE(device.commConfig) : RtuE(device.commConfig))
    // 修改属性
    const onFinish = async (values) => {
        const hide = message.loading('正在修改');
        try {
            await editDevice(gatewayId, device.id, { deviceInfo: values })
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
            <div className={styles.div}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="Device_edit"
                    onFinish={onFinish}
                    scrollToFirstError>
                    <Form.Item
                        name="name"
                        label={<span>设备名称&nbsp;</span>}
                        rules={[
                            {
                                message: '请输入设备名称',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input defaultValue={device.name} />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="设备描述"
                    >
                        <TextArea rows={4}
                            defaultValue={device.description} />
                    </Form.Item>
                    <Form.Item
                        name="slaveNo"
                        label="从站slave"
                        rules={[
                            {
                                pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                message: '填写从站编号,必须为整数!',
                            },
                        ]}
                    >
                        <Input defaultValue={device.slaveNo} />
                    </Form.Item>
                    <Form.Item
                        name="connectionMode"
                        label="选择模式"
                        rules={[
                            {
                                message: '选择模式!',
                            },
                        ]}
                    >
                        <Select defaultValue={device.connectionMode} onChange={(value) => {
                            setItems((value === 'TCP') ? TcpE(device.commConfig) : RtuE(device.commConfig))
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

export default DeviceEditForm 