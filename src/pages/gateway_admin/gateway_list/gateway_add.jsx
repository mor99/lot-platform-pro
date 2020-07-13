import React from 'react';
import { Form, Input, Space, Select, Button, Radio, message,InputNumber,Divider } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { regExp } from '@/utils/numAndRegexp'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {formItemLayout,tailFormItemLayout,TcpA,RtuA} from './Items'
import { addGateway } from './service'
import styles from './index.less'

const { Option } = Select;
const { TextArea } = Input

const formItemLayoutWithOutLabel = {
   /*  wrapperCol: {
        span:12,offset:6,
    },
    labelCol:{
        span:12,offset:5
    } */
    labelCol: { span: 7 },
    wrapperCol: { span: 10 ,offset:6}
};

const GatewayAddForm = () => {
    const [form] = Form.useForm();
    // 添加数据
    const onFinish = async (values) => {
        const hide = message.loading('正在添加');
        console.log(values)
        try {
            hide();
            await addGateway(values)
                .then((res) => {
                    console.log(res)
                    if (res.statusCode && res.statusCode === 201) {
                        const gatewayInfo = { ...res.gatewayInfo }
                        history.push({ pathname: 'gateway_result', query: { gatewayInfo, success: true } })
                    }

                })
            return true
        }
        catch (error) {
            hide();
            message.error('添加失败！');
            return false;
        }

    };

    return (
        <PageHeaderWrapper>
            <div className={styles.div1}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="gateway_add"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                <Divider>基本信息</Divider>
                    <Form.Item
                        name="name"
                        label={
                            <span>
                                网关名称&nbsp;
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: '请输入数字,字母和下划线!',
                                pattern: regExp.gatewayRule,
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder='给网关起个名字' />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="网关描述"
                    >
                        <TextArea rows={4}
                            maxLength={128}
                            placeholder='请输入你的网关描述' />
                    </Form.Item>
                    <Divider>技术参数</Divider>
                    <Form.Item
                        name="coreModule"
                        label="核心模块"
                        rules={[
                            {
                                required: true,
                                message: '选择核心模块!',
                            },
                        ]}
                    >
                        <Select placeholder='请选择核心模块' >
                            <Option value="ARM">ARM</Option>
                            <Option value="MIPS" disabled='true'>MIPS</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="protocol"
                        label="通信协议"
                        rules={[
                            {
                                required: true,
                                message: '选择协议!',
                            },
                        ]}
                    >
                        <Select placeholder='请选择通信协议' >
                            <Option value="MQTT" >MQTT</Option>
                            <Option value="COAP" disabled>COAP</Option>
                            <Option value="HTTP" disabled>HTTP</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='通信方式'
                        name='isEncrypted'
                        rules={[
                            {
                                required:true,
                                message:'请选择通信方式!'
                            }
                        ]}>
                        <Radio.Group >
                            <Radio value>加密</Radio>
                            <Radio value={false}>不加密</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="流量限额"
                        name='dataPlan'
                        rules={[
                            {
                                message: '请输入整数',
                                pattern: regExp.num,
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input style={{ width: '30%' }} addonAfter="MB" />
                    </Form.Item>
                    <Divider>网口配置</Divider>
                        <br/>
{/*                     <Form.List name='tcpConfig'>
                        {(fields,{add,remove})=>{
                            return (
                                <Form.Item {...formItemLayoutWithOutLabel}>
                                {TcpA}
                                {fields.map((field,index)=>(
                                    <Form.Item key={field.key}>
                                         {TcpA}
                                         {fields.length > 0 ? (
                                            <MinusCircleOutlined
                                                className={styles.delete}
                                                style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        ) : null}
                                     </Form.Item>  
                                    ))}
                                <Button type="dashed" onClick={() => {
                                add();
                                 }}
                                    style={{ width: '15%' }}> <PlusOutlined /> 添加</Button>
                             </Form.Item>
                            )
                        }}
                    </Form.List> */}
{/*                     <Form.List name='tcpConfig'>
                        {(fields,{add,remove})=>{
                            return(
                                <span>
                                    {fields.map((field,index)=>(
                                        <Form.Item key={field.key} noStyle>
                                            {TcpA}
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }}/> ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                    <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    style={{ width: '60%' }}
                                    >
                                    <PlusOutlined /> 添加
                                    </Button>
              </Form.Item>
                                </span>
                            )
                        }}
                    </Form.List> */}
                   
                    {/* <br/>{TcpA}<br/>{RtuA} */}

                    <Form.List name="tcpConfig">
                        {(fields, { add, remove }) => {
                        const feild1 = {name:0,fieldKey:0}
                        return (
                            <div>
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                {TcpA(feild1)}
                            </Form.Item>
                            {fields.map(field => {
                                console.log(field)
                                field.name += 1
                                field.fieldKey +=1
                            return (
                                <Form.Item key={field.fieldKey}  {...formItemLayoutWithOutLabel}>
                                {TcpA(field)}
                                <MinusCircleOutlined
                                    onClick={() => {
                                        remove(field.name-1)
                                    
                                    }}
                                />
                                </Form.Item>
                            )})}

                            <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button type="dashed" onClick={() => {
                                add();
                                 }}
                                    style={{ width: '25%' }}> <PlusOutlined /> 添加端口</Button>
                            </Form.Item>
                            </div>
                        );
                        }}
                    </Form.List>
                    <Divider>串口配置</Divider>
                    <Form.List name="uartConfig">
                        {(fields, { add, remove }) => {
                        const feild2 = {name:0,fieldKey:0}
                        return (
                            <div>
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                {RtuA(feild2)}
                            </Form.Item>
                            {fields.map(field => {
                                field.name += 1
                                field.fieldKey +=1
                                return(
                                <Form.Item key={field.key}  {...formItemLayoutWithOutLabel}>
                                {RtuA(field)}
                                <MinusCircleOutlined
                                    onClick={() => {
                                    remove(field.name);
                                    }}
                                />
                                </Form.Item>
                            )})}
                            
                            <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button type="dashed" onClick={() => {
                                add();
                                 }}
                                    style={{ width: '25%' }}> <PlusOutlined /> 添加串口</Button>
                            </Form.Item>
                            </div>
                        );
                        }}
                    </Form.List>
                    <Divider dashed />
{/*                     <Form.List name='uartConfig'>
                        {(fields,{add,remove})=>{
                            console.log(fields)
                            return (
                                <Form.Item {...formItemLayoutWithOutLabel}>
                                {RtuA}
                                {fields.map((field)=>{console.log(field) 
                                    return(
                                <Form.Item {...field}>
                                 {RtuA}
                                 {fields.length > 0 ? (
                                            <MinusCircleOutlined
                                                className={styles.delete}
                                                style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        ) : null}
                             </Form.Item>
                         )})}
                                <Button type="dashed" onClick={() => {
                                add();
                                 }}
                                    style={{ width: '15%' }}> <PlusOutlined /> 添加</Button>
                             </Form.Item>
                            )
                        }}
                    </Form.List> */}

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

export default GatewayAddForm 