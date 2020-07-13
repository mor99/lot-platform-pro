import React, { useState } from 'react';
import { Form, Input, Space, Select, Button, Radio, Col, Row, message, InputNumber } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { regExp } from '@/utils/numAndRegexp'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { addAttribute } from './service'
import styles from './index.less'

const { Option } = Select;
const formItemLayout = {labelCol: { span: 7 },wrapperCol: { span: 10 }};
const tailFormItemLayout = {wrapperCol: {xs: {span: 12,offset: 9,},sm: {span: 12,offset: 7,}}};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 12, offset: 0 },
        sm: { span: 12, offset: 0 },},
};
const formItemLayoutWithOutLabel1 = {
    wrapperCol: {
        xs: { span: 12, offset: 20 },
        sm: { span: 12, offset: 6 },
    },
};


// 添加属性组件
const AddAttribute = () => {
    const [form] = Form.useForm();
    // 上传方式
    const [way, setWay] = useState('instant')
    const { modelId, radio } = history.location.query
    const [codeState, setCode] = useState()
    // const [a,setA]= useState([])
    // 添加数据
    const onFinish = async (values) => {
        console.log(values)
        const { name, dataAddr, functionCode, customConditions,alias,interval,symbol,operationData,method,...dataConfig } = values;
        const value = { name, alias,dataAddr, functionCode, dataConfig:{...dataConfig,dataFormula:`${symbol}${operationData}`}, uploadCondition: {method,codition:{interval:parseInt(interval),customConditions}} }
        const hide = message.loading('正在添加');
        try {
            await addAttribute(modelId, value)
                .then(res=>{
                    if (res.statusCode&&res.statusCode===201){
                        message.success('添加成功')
                        history.goBack()
                    }
                })
            return true
        }
        catch (error) {
            hide();
            message.error('添加失败！请重试!');
            return false;
        }
    };
// 上传条件
const selectways = {
    // 即时上传
    instant:null,
    // 自定条件
    custom:<Form.List name='customConditions'>
        {(fields, { add, remove }) => {
            
            return (
                <span>
                    <Form.Item {...formItemLayoutWithOutLabel} label='当采集到的数据' >
                    <Row gutter={8}>
                        <Col>
                        <Form.Item name={[0,'logic']} fieldKey={[0,'logic']} initialValue='equal' noStyle>
                            <Radio.Group buttonStyle="solid" defaultValue='equal'>
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
                        {(fields.length<3)?
                        <Col>
                        <Button
                                type="dashed"
                                onClick={() => {
                                    add();
                                }}
                            >
                                <PlusOutlined /> 添加
                            </Button>
                            </Col>:null}
                        </Row>
                        </Form.Item>
                    {fields.map((field) => {
                        const a = (field.name===0)
                        // const field = {name: field1.name+1,fieldKey:field1.fieldKey+1}
                        return(
                        <Form.Item hidden={a}
                        {...formItemLayoutWithOutLabel1}>
                        <Row gutter={8}>
                                    <Col>
                                        <Form.Item initialValue='or' name={(field.name===0)?'':[field.name,'with']}  fieldKey={[field.fieldKey,'with']}>
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
                                        <Form.Item name={[field.name,'target']} fieldKey={[field.fieldKey,'target']} onChange={()=>{}}>
                                         <InputNumber placeholder='数值' />
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                            <MinusCircleOutlined
                                                onClick={() => {
                                                    console.log(field)
                                                    remove(field.name);
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
    // 定时上传
    interval:<Form.Item label='上报间隔' name='interval'>
        <Input style={{width:'30%'}} type='number'/>
    </Form.Item>
}
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
                            <InputNumber className={styles.input} placeholder="输入量程上限" />
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
                            <InputNumber className={styles.input} placeholder="输入量程下限" />
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
                        <Select placeholder='请选择数据类型' style={{width:'50%'}}>
                            <Option value="unsigned">unsigned</Option>
                            <Option value="signed">signed</Option>
                            <Option value="string">string</Option>
                            <Option value="float">float</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="dataLength"
                        label="数据字节数"
                        rules={[
                            {
                                required: true,
                                message: '请输入数据字节数!',
                            },

                        ]}
                    >
                        <InputNumber min={1} max={125} />
                        {/* <Select placeholder='请选择模式' >
                            <Option value={8}>8</Option>
                            <Option value={16}>16</Option>
                            <Option value={32}>32</Option>
                        </Select> */}
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
                     //   name='dataFormula'
                    >
                        <Form.Item name='symbol' noStyle>
                            <Select className={styles.input} placeholder='符号' style={{width:'15%'}}>
                                <Option value='+'>＋</Option>
                                <Option value='-'>－</Option>
                                <Option value='*'>×</Option>
                                <Option value='/'>÷</Option>
                            </Select> 
                        </Form.Item>
                        <Form.Item name='operationData' noStyle>
                            <InputNumber className={styles.input} min={1} placeholder='输入数据' />
                        </Form.Item>
                    </Form.Item> 

                    <Form.Item
                        label='上传方式'
                        initialValue='instant'
                        name = 'method'
                        rules={[
                            {
                                required: true,
                                message: '请选择类型!',
                            },
                        ]}>
                        <Radio.Group buttonStyle="solid"  onChange={(e) => { setWay(e.target.value) }}>
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