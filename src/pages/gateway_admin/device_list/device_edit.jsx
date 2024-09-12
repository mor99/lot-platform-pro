import React, { useState,useEffect } from 'react';
import { Form, Input, Select, Button, message, Space } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { regExp } from '@/utils/numAndRegexp';
import { editDevice ,getPorts} from './service'
import { TcpE, RtuE, formItemLayout, tailFormItemLayout } from './Items'
import styles from './index.less'


const { Option } = Select;
const { TextArea } = Input

const DeviceEditForm = (props) => {
    console.log(props.location.query)
    const [form] = Form.useForm();
    const [ports,setPorts] = useState([])
    const { gatewayId, device } = props.location.query;
    const fetchPorts = async ()=>{
        const result = await getPorts(props.location.query.gatewayId)
        console.log(result)
        setPorts(result.ports)
    }
    // 组件初始化
    useEffect(() => {
        fetchPorts();
    }, [])
    // 修改属性
    const onFinish = async (values) => {
/*         const { name, description, connectionMode, slaveNo, ...commConfig } = values;
        const value = { name, description, connectionMode, slaveNo, commConfig } */
        const hide = message.loading('正在修改');
        try {
            await editDevice(gatewayId, device.id, values)
            hide();
           // message.success('修改成功')s
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
                    initialValues={device}
                    scrollToFirstError>
                    <Form.Item
                        name="name"
                        label={<span>设备名称&nbsp;</span>}
                        rules={[
                            {   required:true,
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
                        name="port"
                        label="通信口"
                        rules={[
                            {
                                required: true,
                                message: '请选择通信口!',
                            },
                        ]}>
                        <Select placeholder='请选择通信口'>
                            {ports.map((value)=><Option key={value} value={value}>{value}</Option>)}
                        </Select>
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