import React, { useState } from 'react';
import { Form, Input, Space, Select, Button, Radio, Col, Row, message, InputNumber } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { regExp } from '@/utils/numAndRegexp'
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
                    {fields.map((field) => (
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
    <Form.Item label='上报间隔' name='asdsaf'>
        <Input placeholder='x > = 160 || x < 100' />
    </Form.Item>
]
const AddAttribute = () => {
    const [form] = Form.useForm();
    // 上传方式
    const [way, setWay] = useState(0)
    const { modelId, radio } = history.location.query
    const [codeState, setCode] = useState()
    // 添加数据
    const onFinish = async (values) => {
        // const value = { ...values }
        console.log(values)
        const value = {}
        value.name = values.name
        value.dataAddr = values.dataAddr
        value.functionCode = values.functionCode
        value.acquireInterval = values.acquireInterval
        value.dataConfig = {
            upperLimit : values.upperLimit,
            lowerLimit: values.lowerLimit,
            dataType:values.dataType,
            dataLength:values.dataLength,
            dataUnit:values.dataUnit,
            dataFormula:values.dataFormula
        }
        value.uploadCondition = { a: 1 }
        const hide = message.loading('正在添加');
        try {
            console.log(value)
            console.log(modelId)
            await addAttribute(modelId,  value )
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
                    initialValues={{ functionCode: radio === "a" ? '04' : '03' }}
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
                        rules={[
                            {
                                required: true,
                                message: '必须为0x开头的4位十六进制数',
                                pattern:regExp.four16,
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder='请输入地址'/>
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
                            defaultValue={radio === "a" ? '04' : '03'}
                            value={codeState}>
                            {(radio === "a") ?
                                <span>
                                    <Radio value='04'>读</Radio>
                                    <Radio value='99' disabled>写</Radio>
                                </span> :
                                <span>
                                    <Radio value='03'>读</Radio>
                                    <Radio value='06'>写</Radio></span>}
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="数据范围"
                        rules={[
                            {
                                required: false,
                                message: '请输入数据范围!',
                            },
                        ]}
                    >
                        <Form.Item name='upperLimit'
                            rules={[{
                                require: true,
                                pattern:new RegExp(/^[0-9]\d*$/, "g"),
                                message: '请输入一个数字!'
                            }]}
                            noStyle>
                            <Input className={styles.input}  placeholder="输入量程上限" />
                        </Form.Item>
                        <Input
                            className={styles.input1}
                            placeholder="~"
                            disabled
                            noStyle
                        />
                        <Form.Item name='lowerLimit'
                            rules={[{
                                require: true,
                                pattern:new RegExp(/^[0-9]\d*$/, "g"),
                                message: '请输入一个数字!'
                            }]}
                            noStyle>
                            <Input className={styles.input} placeholder="输入量程下限"/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        name="dataType"
                        label="数据类型"
                        rules={[
                            {
                                required: true,
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
                        name="dataLength"
                        label="数据长度"
                        rules={[
                            {
                                required: true,
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
                        name='dataUnit'
                        rules={[
                            {
                                required: true,
                                message: '请输入单位',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder='请输入单位' />
                    </Form.Item>
                    <Form.Item
                        label="计算公式"
                        name='dataFormula'
                        rules={[
                            {
                                required: true,
                                message: '请输入计算公式',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder='请输入计算公式' />
                    </Form.Item>

                    <Form.Item
                        label='上传方式'
                        rules={[
                            {
                                required: true,
                                message: '请选择类型!',
                            },
                        ]}>
                        <Radio.Group buttonStyle="solid" defaultValue={0} onChange={(e) => { setWay(e.target.value) }}>
                            <Radio.Button value={0} >上报即上传</Radio.Button>
                            <Radio.Button value={1}>自定条件</Radio.Button>
                            <Radio.Button value={2}>定时上传</Radio.Button>
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