import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi'
import { Modal, Select, Form, Row, Col, Input, Button, Space, Switch, message } from 'antd'
import { getGateway, getDevice, getProperties, publishCommand } from './service'
import styles from './index.less'

const { Option } = Select
const { confirm } = Modal
const showDeleteConfirm = async (value) => {
    confirm({
        title: '确认生成控制命令并下发?',
        centered: true,
        // icon: <ExclamationCircleOutlined />,
        content: '',
        okText: '确认',
        // okType: 'danger',
        cancelText: '取消',
        async onOk() {
            const { deviceID, command, gatewayId, ...property } = value
/*             if (command===property) {
                const data = { deviceID: deviceID[2], command, property }
            }
            else {
                const data = {deviceID: deviceID[2], command}
            } */
            const data = (command === 'property') ? {deviceID: deviceID[2], command, property}:{deviceID: deviceID[2], command}
            await publishCommand(gatewayId, data).then((res) => {
                if (res.statusCode && res.statusCode === 200) {
                    message.success(res.message)
                }
            })
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const tailLayout1 = {
    wrapperCol: { offset: 8, span: 16 },
};

export default () => {
    const [gatewayList, setGateway] = useState([])
    const [deviceList, setDevice] = useState([])
    const [properties, setProper] = useState([])
    const [visible, setVisible] = useState(true)
    // 提交表格
    const onFinish = async (value) => {
        showDeleteConfirm(value)
        /*         const { deviceID, command, gatewayId, ...property } = value
                const data = { deviceID: deviceID[2], command, property }
                await publishCommand(gatewayId, data).then((res)=>{
                    if (res.statusCode&&res.statusCode===200){
                        message.success(res.message)
                    }
                }) */
    }
    // 获取网关列表
    const fetchData = async () => {
        const result = await getGateway()
        setGateway(result)
    }
    // 获取子设备列表
    const fetchDevice = async (value) => {
        const result = await getDevice(value)
        console.log(result)
        setDevice(result)
    }
    //获取子设备绑定的模型的属性列表
    const fetchProperties = async (value) => {
        console.log(value)
        const result = await getProperties(value)
        console.log(result)
        setProper(result)
    }
    const Properdom =
        <Form.Item {...tailLayout1}>
            <Row gutter={4}>
                <Col span={6}>属性名称</Col>
                <Col span={6}>目标值</Col>
            </Row>
            <Row gutter={4}>
                <Col span={3}><Form.Item name='name'><Select placeholder='请选择属性'>{
                    properties.map((value) => <Option value={value.name}>{value.name}</Option>)
                }</Select></Form.Item></Col>
                <Col span={3} offset={3}><Form.Item name='target'><Input placeholder='目标值' /></Form.Item></Col>
            </Row>
        </Form.Item>

    useEffect(() => {
        fetchData()
        console.log(gatewayList)
    }, []
    )

    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <Form
                    {...layout}
                    onFinish={onFinish}
                    name='control'>
                    <Form.Item name='gatewayId' label='网关'>
                        <Select placeholder='请选择网关' onChange={(value) => {
                            fetchDevice(value)
                        }}>
                            {gatewayList.map((value) => { return <Option value={value.id}>{value.name}</Option> })}
                        </Select>
                    </Form.Item>
                    <Form.Item label='子设备' name='deviceID'>
                        <Select placeholder='请选择子设备' onChange={(value) => { fetchProperties(value[1]) }}>
                            {deviceList.map((value) => { console.log(value); return <Option value={[value.name, value.bindingModel, value.id]}>{value.name}</Option> })}
                        </Select>
                    </Form.Item>
                    <Form.Item name='command' label='控制内容'>
                        <Select placeholder='请选择控制内容' onChange={(value) => {
                            if (value === 'property') {
                                setVisible(false)
                                console.log(value)
                            }
                            else {
                                setVisible(true)
                            }
                        }}>
                            <Option value='reboot'>重启</Option>
                            <Option value='shutdown'>关机</Option>
                            <Option value='property'>属性</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item />
                    {(!visible) ? Properdom : null}
                    {/*                     <Form.Item {...tailLayout1}>
                        <Row gutter={4}>
                            <Col span={6}>属性名称</Col>
                            <Col span={6}>本次是否控制</Col>
                            <Col span={6}>目标值</Col>
                        </Row>
                        <Row gutter={4}>
                            <Col span={6}>功率因数</Col>
                            <Col span={6}><Form.Item name='switch'><Switch /></Form.Item></Col>
                            <Col span={4}><Form.Item name='input'><Input placeholder='目标值' /></Form.Item></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item /> */}
                    <Form.Item />
                    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                        <Space size={20}>
                            <Button type="primary" htmlType="submit" >
                                生成控制命令并下发到设备
                       </Button>
                            <Button onClick={() => { history.goBack() }}>取消</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </PageHeaderWrapper>)
}