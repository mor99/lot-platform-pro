import React ,{useState, useEffect} from 'react';
import { Form, Input, Select, Row,Col,InputNumber,Radio, Button, message, Space } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { history } from 'umi'
import { regExp } from '@/utils/numAndRegexp'
import { editAttribute } from './service'
import { formItemLayout, tailFormItemLayout } from './Items'
import styles from './index.less'

const { Option } = Select;
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
const AttributeEdit = (props) => {
    const [form] = Form.useForm();
    const { modelId, property } = props.location.query;
    const [way, setWay] = useState('instant')
    const [data,setData] = useState({})

    const result = {...property,...property.dataConfig,...property.uploadCondition,...property.uploadCondition.condition}
    const [symbol,...number]=result.dataFormula
    const number1 = number.join('')
    result.operationData = parseInt(number1)
    // 初始数据处理
    const fetchData = ()=>{
        const result = {...property,...property.dataConfig,...property.uploadCondition,...property.uploadCondition.condition}
        const [symbol,...number]=result.dataFormula
        const number1 = number.join('')
        result.operationData = parseInt(number1)
        console.log(result)
        setWay(result.method)
        setData(result)
    }
    // 数据初始化
    useEffect(()=>{
        fetchData()
    },[])
    // 修改属性
    const onFinish = async (values) => {
        console.log(values)
        const { name, dataAddr, functionCode, customConditions,alias,interval,operationData,method,...dataConfig } = values;
        const value = { name, alias,dataAddr, functionCode, dataConfig:{...dataConfig,dataFormula:`${symbol}${operationData}`}, uploadCondition: {method,condition:{interval:parseInt(interval),customConditions}} }
        const hide = message.loading('正在修改');
        try {
            hide();
            await editAttribute(modelId, property.id, value)
                .then(res=>{
                    if(res.statusCode && res.statusCode===200){
                        message.success(res.message)
                    }
                })
            history.goBack()
            return true
        }
        catch (error) {
            hide();
            message.error('修改失败！请重试!');
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
                console.log(fields)
                return (
                    <span>
                        <Form.Item {...formItemLayoutWithOutLabel} label='当采集到的数据' >
                        <Row gutter={8}>
                            <Col>
                            <Form.Item name={[0,'logic']} fieldKey={[0,'logic']} noStyle>
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="greaterThan">大于</Radio.Button>
                                    <Radio.Button value="equal">等于</Radio.Button>
                                    <Radio.Button value="lessThan">小于</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            </Col>
                            <Col>
                            <Form.Item name={[0,'target']} fieldKey={[0,'target']}  noStyle>
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
                            return(
                            <Form.Item 
                            hidden={a}
                            {...formItemLayoutWithOutLabel1}>
                            <Row gutter={8}>
                                        <Col>
                                            <Form.Item initialValue='or' name={(field.name===0)?'':[field.name,'withSecond']}  fieldKey={[field.fieldKey,'with']}>
                                            <Radio.Group buttonStyle="solid">
                                                <Radio.Button value="and">与</Radio.Button>
                                                <Radio.Button value="or">或</Radio.Button>
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
                                    </Row>
                            </Form.Item>
                        )})}
                        </span>
                );
            }}
        </Form.List>,
        // 定时上传
        interval:<Form.Item label='上报间隔' name='interval'  >
            <Input style={{width:'30%'}} type='number'/>
        </Form.Item>
    }
    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <Form
                    {...formItemLayout}
                    initialValues={result}
                    form={form}
                    name="attribute_edit"
                    onFinish={onFinish}
                    scrollToFirstError>
                    <Form.Item
                        name="name"
                        label={
                            <span>
                                属性名称&nbsp;
                            </span>
                        }
                        rules={[
                            {
                                message: '请输入属性名称',
                                whitespace: true,
                            },
                            {
                                pattern:regExp.gatewayRule,
                                message:'请输入数字,字母和下划线'
                            }
                        ]}
                    >
                        <Input />
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
                        <Input maxLength={8} />
                    </Form.Item>
                    <Form.Item
                        name="dataAddr"
                        label="地址"
                        rules={[{
                            pattern: regExp.four16,
                            require: true,
                            message: '必须为0x开头的4位十六进制数!'
                        }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="属性类型"
                        name="functionCode">
                        <Radio.Group>
                            {(property.functionCode) === 4 ?
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
                        <Form.Item name='lowerLimit'
                            rules={[{
                                require: true,
                                pattern: regExp.num,
                                message: '请输入一个数字!'
                            }]}
                            noStyle>
                            <InputNumber style={{ width: 120, textAlign: 'center' }} />
                        </Form.Item>
                        <Form.Item noStyle>
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
                        </Form.Item>
                        <Form.Item name='upperLimit'
                            rules={[{
                                pattern: regExp.num,
                                require: true,
                                message: '请输入一个数字!'
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                if (!value || getFieldValue('lowerLimit')<value) {
                                    return Promise.resolve();
                                }
                                    return Promise.reject('数据范围不正确');
                                    },
                                }),
                            ]}
                            noStyle>
                            <InputNumber
                                className="site-input-right"
                                style={{
                                    width: 120,
                                    textAlign: 'center',
                                }} />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        name="dataType"
                        label="数据类型"
                        rules={[
                            {
                                required:true,
                                message: '请选择类型!',
                            },
                        ]}
                    >
                        <Select  style={{width:'50%'}}>
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
                                required:true,
                                message: '输入字节数!',
                            },
                        ]}
                    >
                        <InputNumber min={1} max={125} />
                    </Form.Item>

                    <Form.Item
                        label="单位"
                        name='dataUnit'
                        rules={[
                            {
                                message: '请输入单位',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="计算公式"
                     //   name='dataFormula'
                    >
                        <Form.Item name='symbol' noStyle>
                            <Select className={styles.input} style={{width:'15%'}}>
                                <Option value='+'>＋</Option>
                                <Option value='-'>－</Option>
                                <Option value='*'>×</Option>
                                <Option value='/'>÷</Option>
                            </Select> 
                        </Form.Item>
                        <Form.Item name='operationData' noStyle>
                            <InputNumber className={styles.input} min={1} />
                        </Form.Item>
                    </Form.Item> 

                    <Form.Item
                        name = 'method'
                        label='上传方式'
                        rules={[
                            {
                                required: true,
                                message: '请选择类型!',
                            },
                        ]}>
                        <Radio.Group buttonStyle="solid" onChange={(e) => {setWay(e.target.value)}}>
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

export default AttributeEdit 