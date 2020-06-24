import React, { useState } from 'react';
import { Form, Input, Select, Button, message, Space } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { regExp } from '@/utils/numAndRegexp';
import { editDevice } from './service'
import { TcpE, RtuE, formItemLayout, tailFormItemLayout } from './Items'
import styles from './index.less'


const { Option } = Select;
const { TextArea } = Input

const DeviceEditForm = (props) => {
    const [form] = Form.useForm();
    const { gatewayId, device } = props.location.query;
    const comm = { ...device.commConfig }
    const devicedata = { ...device, ...comm }
    devicedata.commConfig = undefined
    const [items, setItems] = useState((device.connectionMode === 'TCP') ? TcpE(device.commConfig) : RtuE(device.commConfig))
    // 修改属性
    const onFinish = async (values) => {
        const { name, description, connectionMode, slaveNo, ...commConfig } = values;
        const value = { name, description, connectionMode, slaveNo, commConfig }
        const hide = message.loading('正在修改');
        try {
            await editDevice(gatewayId, device.id, value)
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
                    initialValues={devicedata}
                    scrollToFirstError>
                    <Form.Item
                        name="name"
                        label={<span>设备名称&nbsp;</span>}
                        rules={[
                            {
                                message: '请输入设备名称',
                                whitespace: true,
                            },
                            {
                                pattern:regExp.gatewayRule,
                                message:'请输入数字字母和下划线'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="设备描述"
                    >
                        <TextArea rows={4}
                        />
                    </Form.Item>
                    <Form.Item
                        name="slaveNo"
                        label="从站slave"
                        rules={[
                            {
                                pattern: regExp.num,
                                message: '填写从站编号,必须为整数!',
                            },
                        ]}>
                        <Input />
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
                        <Select onChange={(value) => {
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