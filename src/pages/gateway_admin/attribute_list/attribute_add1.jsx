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
        xs: { span: 12, offset: 0 },
        sm: { span: 12, offset: 0 },
    },
};
const formItemLayoutWithOutLabel1 = {
    wrapperCol: {
        xs: { span: 12, offset: 20 },
        sm: { span: 12, offset: 6 },
    },
};
const selectways = {
    instant:null,
    custom:<Form.List name='customConditions'>
        {(fields, { add, remove }) => {
            return (
                <span>
                    <Form.Item {...formItemLayoutWithOutLabel} label='当采集到的数据' >
                    <Row gutter={8}>
                    <Col>
                        <Form.Item name={[0,'logic']} fieldKey={[0,'logic']} initialValue='equal' noStyle>
                            <Radio.Group buttonStyle="solid" defaultValue='equal' onChange={(e) => { console.log(e.target.value) }}>
                                <Radio.Button value="greaterThan">大于</Radio.Button>
                                <Radio.Button value="equal">等于</Radio.Button>
                                <Radio.Button value="lessThan">小于</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        </Col>
                        <Col>
                        <Form.Item name={[0,'target']} fieldKey={[0,'target']} noStyle>
                            <InputNumber placeholder='数值' />
                        </Form.Item>
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
                        </Form.Item>
{/*                     {fields.map((field) => (
                        <span>
                        <Form.Item
                        {...formItemLayoutWithOutLabel1}
                            name={[field.name+1,'logic']}
                            fieldKey = {[field.fieldKey+1,'logic']}>
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
                                        <Radio.Group buttonStyle="solid" defaultValue='equal' onChange={(e) => { console.log(e.target.value) }}>
                                            <Radio.Button value="greaterThan">大于</Radio.Button>
                                            <Radio.Button value="equal ">等于</Radio.Button>
                                            <Radio.Button value="lessThan">小于</Radio.Button>
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
                        </span>
                    ))} */}
                    {fields.map((field) => {
                        field.name += 1
                        field.fieldKey += 1
                        return(
                        <Form.Item
                        {...formItemLayoutWithOutLabel1}>
                        <Row gutter={8}>
                                    <Col>
                                        <Form.Item initialValue='or' name={[field.name,'with']} fieldKey={[field.fieldKey,'with']}>
                                        <Radio.Group buttonStyle="solid">
                                            <Radio.Button value="is">是</Radio.Button>
                                            <Radio.Button value="or">或</Radio.Button>
                                            <Radio.Button value="no">非</Radio.Button>
                                        </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item initialValue='equal' name={[field.name,'logic']} fieldKey={[field.fieldKey,'logic']}>
                                        <Radio.Group buttonStyle="solid"  >
                                            <Radio.Button value="greaterThan">大于</Radio.Button>
                                            <Radio.Button value="equal">等于</Radio.Button>
                                            <Radio.Button value="lessThan">小于</Radio.Button>
                                        </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                        <Form.Item name={[field.name,'target']} fieldKey={[field.fieldKey,'target']}>
                                         <InputNumber placeholder='数值' />
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                            <MinusCircleOutlined
                                                onClick={() => {
                                                    remove(field.name-1);
                                                }}
                                            />
                                    </Col>
                                    {/* <Col>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add();
                                            }}
                                        >
                                            <PlusOutlined /> 添加
                                             </Button>
                                    </Col> */}
                                </Row>
                        </Form.Item>
                    )})}
                    </span>
            );
        }}
    </Form.List>,
    interval:<Form.Item label='上报间隔' name='interval'>
        <Input style={{width:'30%'}} type='number'/>
    </Form.Item>
}
const AddAttribute = () => {
    const [form] = Form.useForm();
    // 上传方式
    const [way, setWay] = useState('instant')
    const { modelId, radio } = history.location.query
    const [codeState, setCode] = useState()
    // 添加数据
    const onFinish = async (values) => {
        console.log(values)
        const { name, dataAddr, functionCode, acquireInterval, alias,interval,method,...dataConfig } = values;
        const value = { name, alias,dataAddr, functionCode, acquireInterval, dataConfig, uploadCondition: {method,codition:{interval}} }
        const hide = message.loading('正在添加');
        try {
            await addAttribute(modelId, value)
            // message.success('添加成功')
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
                    initialValues={{ functionCode: radio === "a" ? 4 : 3 }}
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
                            {
                                pattern:regExp.gatewayRule,
                                message:'请输入数字,字母和下划线'
                            }
                        ]}
                    >
                        <Input placeholder='给属性起个名字' />
                    </Form.Item>
                    <Form.Item
                        name="alias"
                        label="属性别名"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input maxLength={8} placeholder='请输入属性别名' />
                    </Form.Item>
                    <Form.Item
                        name="dataAddr"
                        label="地址"
                        rules={[
                            {
                                required: true,
                                message: '必须为0x开头的4位十六进制数',
                                pattern: regExp.four16,
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder='请输入地址' />
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
                            }}
                            value={codeState}>
                            {(radio === "a") ?
                                <span>
                                    <Radio value={4}>读</Radio>
                                    <Radio value='99' disabled>写</Radio>
                                </span> :
                                <span>
                                    <Radio value={3}>读</Radio>
                                    <Radio value={6}>写</Radio></span>}
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
                                pattern: regExp.num,
                                message: '请输入一个数字!'
                            }]}
                            noStyle>
                            <Input className={styles.input} placeholder="输入量程上限" />
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
                                pattern: regExp.num,
                                message: '请输入一个数字!'
                            }]}
                            noStyle>
                            <Input className={styles.input} placeholder="输入量程下限" />
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
                            <Option value={8}>8</Option>
                            <Option value={16}>16</Option>
                            <Option value={32}>32</Option>
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
                                message: '请输入计算公式',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder='请输入计算公式' />
                    </Form.Item> 

                    <Form.Item
                        label='上传方式'
                        name = 'method'
                        rules={[
                            {
                                required: true,
                                message: '请选择类型!',
                            },
                        ]}>
                        <Radio.Group buttonStyle="solid" defaultValue='instant' onChange={(e) => { setWay(e.target.value) }}>
                            <Radio.Button value='instant' >上报即上传</Radio.Button>
                            <Radio.Button value='custom'>自定条件</Radio.Button>
                            <Radio.Button value='interval'>定时上传</Radio.Button>
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