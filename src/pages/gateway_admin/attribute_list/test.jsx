import React, { useState } from 'react';
import { Form, Input, Space, Select, Button, Radio, Col, Row, message, InputNumber } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { addAttribute } from './service'
import styles from './index.less'

const { Option } = Select;
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

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 12, offset: 9 },
        sm: { span: 12, offset: 5 },
    },
};
const selectways = [
    null,
    <Form.List name="names">
        {(fields, { add, remove }) => (
            <div>
                {fields.map((field) =>
                    <span>
                        <Form.Item name={['a', '1']}>
                            <Radio.Group buttonStyle="solid" defaultValue='or' onChange={(e) => { console.log(e.target.value) }}>
                                <Radio.Button value="is">是</Radio.Button>
                                <Radio.Button value="or">或</Radio.Button>
                                <Radio.Button value="no">非</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name={['a', '2']}>
                            <Radio.Group buttonStyle="solid" onChange={(e) => { console.log(e.target.value) }}>
                                <Radio.Button value="1">大于</Radio.Button>
                                <Radio.Button value="2">等于</Radio.Button>
                                <Radio.Button value="3">小于</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name={['a', '3']}>
                            <InputNumber placeholder='数值' />
                        </Form.Item>
                    </span>
                )
                }
                {fields.map((field) =>
                    <Form.Item {...field}><Input /></Form.Item>)}
                {fields.map((field) =>
                    <Form.Item {...field}><Input /></Form.Item>)}
                <Button onClick={() => add()}>Add</Button>
            </div>)}
    </Form.List>
]
const AddAttribute = () => {
    const [form] = Form.useForm();
    // 上传方式
    const [way, setWay] = useState(0)
    // 添加数据
    const onFinish = async (values) => {
        console.log(values)
        /*         const hide = message.loading('正在添加');
                try {
                    await addGateway(values)
                        .then((res) => {
                            hide();
                            const gatewayInfo = { ...res.data.gatewayInfo }
                            history.push({ pathname: 'gateway_list', query: { gatewayInfo, visible: true } })
                        })
                    return true
                }
                catch (error) {
                    hide();
                    message.error('添加失败！请重试!');
                    return false;
                }
         */
    };

    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="attribute_add"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label={
                            <span>
                                属性名称&nbsp;
                            </span>
                        }
                        rules={[
                            {
                                // required: true,
                                message: '请输入属性名称',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder='给属性起个名字' />
                    </Form.Item>
                    <Form.Item
                        name="adress"
                        label="地址"
                    >
                        <Input placeholder='输入数据地址' />
                    </Form.Item>
                    <Form.Item
                        name="caijijiange"
                        label="采集间隔"
                        rules={[
                            {
                                // required: true,
                                message: '请输入采集间隔!',
                            },
                        ]}
                    >
                        <Input placeholder='输入采集间隔' />
                    </Form.Item>

                    <Form.Item
                        name='fanwei'
                        label="数据范围"
                        rules={[
                            {
                                required: false,
                                message: '请输入数据范围!',
                            },
                        ]}
                    >

                        <Input style={{ width: 150, textAlign: 'center' }} placeholder="输入数据范围上限" />

                        <Input
                            className="site-input-split"
                            style={{
                                width: 30,
                                borderLeft: 0,
                                borderRight: 0,
                                pointerEvents: 'none',
                            }}
                            placeholder="~"
                            disabled
                        />

                        <Input
                            className="site-input-right"
                            style={{
                                width: 150,
                                textAlign: 'center',
                            }}
                            placeholder="输入量程下限"
                        />

                    </Form.Item>

                    <Form.Item
                        name="protocoll"
                        label="数据类型"
                        rules={[
                            {
                                //  required: true,
                                message: '请选择类型!',
                            },
                        ]}
                    >
                        <Select placeholder='请选择数据类型' >
                            <Option value="int">整形</Option>
                            <Option value="float">浮点型</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="protocol"
                        label="数据长度"
                        rules={[
                            {
                                // required: true,
                                message: '请选择模式!',
                            },
                        ]}
                    >
                        <Select placeholder='请选择模式' >
                            <Option value="8">8</Option>
                            <Option value="16">16</Option>
                            <Option value="32">32</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="单位"
                        name='dataPlan'
                        rules={[
                            {
                                //  required: true,
                                message: '请输入单位',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder='请输入单位' />
                    </Form.Item>
                    <Form.Item
                        label="计算公式"
                        name='dataPlan1'
                        rules={[
                            {
                                //  required: true,
                                message: '请输入计算公式',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder='请输入计算公式' />
                    </Form.Item>

                    <Form.Item
                        label='上传方式'
                        name='shangchuan'
                        rules={[
                            {
                                required: true,
                                message: '请选择类型!',
                            },
                        ]}>
                        <Radio.Group buttonStyle="solid" defaultValue={0} onChange={(e) => { setWay(e.target.value) }}>
                            <Radio.Button value={0} >上报即上传</Radio.Button>
                            <Radio.Button value={1}>模板条件</Radio.Button>
                            <Radio.Button value={2}>自定条件</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    {selectways[way]}

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

export default AddAttribute 