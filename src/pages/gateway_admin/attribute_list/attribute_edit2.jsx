import React, { useState } from 'react';
import { Form, Input, Select, Radio, Button, message, Space } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { num0to7,regExp ,num10to16} from '@/utils/numAndRegexp'
import { editAttribute } from './service'
import { formItemLayout, tailFormItemLayout } from './Items'
import styles from './index.less'

const { Option } = Select;

const AttributeEdit = (props) => {
    const [form] = Form.useForm();
    const { modelId, property } = props.location.query;
    const [codeState, setCode] = useState()

    console.log(props.location)

    // 修改属性
    const onFinish = async (values) => {
        const value = {}
        value.name = values.name
        value.dataAddr = values.dataAddr
        value.functionCode = values.functionCode
        value.acquireInterval = values.acquireInterval
        value.dataConfig = {
            upperLimit: values.upperLimit,
            lowerLimit: values.lowerLimit,
            dataType: values.dataType,
            dataLength: values.dataLength,
            dataUnit: values.dataUnit,
            dataFormula: values.dataFormula
        }
        const hide = message.loading('正在修改');
        try {
            await editAttribute(modelId, property.id, value)
            hide();
            message.success('修改成功')
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
                    name="attribute_edit"
                    initialValues={property}
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
                        ]}
                    >
                        <Input defaultValue={property.name} />
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
                        <Input defaultValue={num10to16(property.dataAddr, 4)} />
                    </Form.Item>
                    <Form.Item
                        name="acquireInterval"
                        label="采集间隔"
                        rules={[
                            {
                                message: '请输入采集间隔,必须为数字!',
                            },
                        ]}
                    >
                        <Input type='number' defaultValue={property.acquireInterval} />
                    </Form.Item>

                    <Form.Item
                        label="属性类型"
                        name="functionCode">
                        <Radio.Group
                            onChange={e => {
                                setCode(e.target.value);
                                console.log(codeState)
                            }}
                            defaultValue={property.functionCode}
                            value={codeState}>
                            {(property.functionCode === 2) ?
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
                        name="dataLength"
                        label="数据位置"
                        rules={[
                            {
                                message: '必须为0-7之间的整数!',
                                pattern: num0to7,
                            },
                        ]}
                    >
                        <Select defaultValue={property.dataLength} >
                            <Option value="8">8</Option>
                            <Option value="16">16</Option>
                            <Option value="32">32</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='上传方式'
                        rules={[
                            {
                                required: true,
                                message: '请选择类型!',
                            },
                        ]}>
                        <Radio.Group buttonStyle="solid" defaultValue={0} onChange={() => { }}>
                            <Radio.Button value={0} >上报即上传</Radio.Button>
                            <Radio.Button value={1}>自定条件</Radio.Button>
                            <Radio.Button value={2}>定时上传</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

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