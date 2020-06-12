import React, { useState } from 'react';
import { Form, Input, Space, Button, Radio, Col, Row, message, InputNumber } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { addAttribute } from './service'
import styles from './index.less'

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
    <Form.Item label='上保间隔' name='asdsaf'>
        <Input placeholder='请输入上报间隔' />
    </Form.Item>,
    <Form.List name='uploadCondition'>
        {(fields, { add, remove }) => {
            return (
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Form.Item label='当采集到的数据' name='data'>
                        <Radio.Group buttonStyle="solid" defaultValue='b' onChange={(e) => { console.log(e.target.value) }}>
                            <Radio.Button value="a">大于</Radio.Button>
                            <Radio.Button value="b">等于</Radio.Button>
                            <Radio.Button value="c">小于</Radio.Button>
                        </Radio.Group>
                        <InputNumber placeholder='数值' />
                        <Button
                            type="dashed"
                            onClick={() => {
                                add();
                            }}
                            style={{ width: '25%' }}
                        >
                            <PlusOutlined /> 添加
                        </Button>
                    </Form.Item>
                    {fields.map((field, index) => (
                        <Form.Item
                            {...field}>
                            <Input.Group >
                                <Row gutter={8}>
                                    <Col>
                                        <Radio.Group buttonStyle="solid" defaultValue='or' onChange={(e) => { console.log(e.target.value) }}>
                                            <Radio.Button value="is">是</Radio.Button>
                                            <Radio.Button value="or">或</Radio.Button>
                                            <Radio.Button value="no">非</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                    <Col >
                                        <Radio.Group buttonStyle="solid" defaultValue='b' onChange={(e) => { console.log(e.target.value) }}>
                                            <Radio.Button value="a">大于</Radio.Button>
                                            <Radio.Button value="b">等于</Radio.Button>
                                            <Radio.Button value="c">小于</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                    <Col span={3}>
                                        <InputNumber placeholder='数值' />
                                    </Col>
                                    <Col>
                                        {fields.length > 0 ? (
                                            <MinusCircleOutlined
                                                className={styles.delete}
                                                style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                    console.log(field)
                                                }}
                                            />
                                        ) : null}
                                    </Col>
                                    <Col>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add();
                                            }}
                                        >
                                            <PlusOutlined /> 添加
                                             </Button>
                                    </Col>
                                </Row>
                            </Input.Group>
                        </Form.Item>
                    ))}
                </Form.Item>
            );
        }}
    </Form.List>,
]
const AddAttribute = () => {
    const [form] = Form.useForm();
    // 上传方式
    const [way, setWay] = useState(0)
    const { modelId, radio } = history.location.query
    const [codeState, setCode] = useState()
    // 添加数据
    const onFinish = async (values) => {
        const value = { ...values }
        value.uploadCondition = { a: 1 }
        const hide = message.loading('正在添加');
        try {
            console.log(modelId)
            await addAttribute(modelId, { propertyInfo: value })
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
                    initialValues={{ functionCode: radio === "c" ? '01' : '02' }}
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
                                required: true,
                                message: '请输入属性名称',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder='给属性起个名字' />
                    </Form.Item>
                    <Form.Item
                        name="dataAddr"
                        label="地址"
                    >
                        <Input placeholder='输入数据地址' />
                    </Form.Item>
                    <Form.Item
                        name="acquireInterval"
                        label="采集间隔"
                        rules={[
                            {
                                required: true,
                                message: '请输入采集间隔,必须为数字!',
                            },
                        ]}
                    >
                        <Input type='number' placeholder='输入采集间隔' />
                    </Form.Item>

                    <Form.Item
                        label="属性类型"
                        name="functionCode">
                        <Radio.Group
                            onChange={e => {
                                setCode(e.target.value);
                                console.log(codeState)
                            }}
                            defaultValue={radio === "c" ? '01' : '02'}
                            value={codeState}>
                            {(radio === "c") ?
                                <span>
                                    <Radio value='01'>读</Radio>
                                    <Radio value='06'>写</Radio></span>
                                :
                                <span>
                                    <Radio value='02'>读</Radio>
                                    <Radio value='99' disabled>写</Radio>
                                </span>
                            }
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="dataLength"
                        label="数据位置"
                        rules={[
                            {
                                required: true,
                                message: '必须为0-7之间的整数!',
                                pattern: new RegExp(/^[0-7]\d*$/, "g"),
                            },
                        ]}
                    >
                        <Input placeholder='请输入0-7之间的数字' type='number'/>
                    </Form.Item>

                    <Form.Item
                        label='上传方式'>
                        <Radio.Group buttonStyle="solid" defaultValue='0' onChange={(e) => { setWay(e.target.value) }}>
                            <Radio.Button value="0">上报即上传</Radio.Button>
                            <Radio.Button value="1">定时上传</Radio.Button>
                            <Radio.Button value="2">自定条件</Radio.Button>
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