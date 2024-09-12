import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Select, Form, Row, Col, Input, Button ,Space,Switch} from 'antd'
import styles from './index.less'
import { columns } from './columns'
import { data } from './data'

const { Option } = Select

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const tailLayout1 = {
    wrapperCol: { offset: 5, span: 16 },
};

export default () => {
    const onFinish = async (value)=>{
        console.log(value)
    }   
    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <Form
                    {...layout}
                    onFinish={onFinish}
                    name='control'>
                    <Form.Item name='gateway' label='网关'>
                        <Select placeholder='请选择网关'>
                            <Option value='123'>
                                123
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='子设备' name='device'>
                        <Select placeholder='请选择子设备'>
                            <Option value='123'>12</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='control' label='控制内容'>
                        <Select placeholder='请选择控制内容'>3</Select>
                    </Form.Item>
                    <Form.Item />
                    <Form.Item {...tailLayout1}>
                        <Row gutter={4}>
                            <Col span={6}>属性名称</Col>
                            <Col span={6}>本次是否控制</Col>
                            <Col span={6}>目标值</Col>
                        </Row>
                        <Row gutter={4}>
                            <Col span={6}>功率因数1</Col>
                            <Col span={6}><Form.Item name='switch'><Switch /></Form.Item></Col>
                            <Col span={4}><Form.Item name='input'><Input placeholder='目标值' /></Form.Item></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item />
                    <Form.Item />
                    <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
                        <Space size={20}>
                            <Button type="primary" htmlType="submit">
                                生成控制命令并下发到设备
                       </Button>
                            <Button>取消</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </PageHeaderWrapper>)
}