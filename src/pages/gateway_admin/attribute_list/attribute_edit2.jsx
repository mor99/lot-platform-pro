import React from 'react';
import { Form, Input, Select, Radio, Button, message, Space } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi'
import { regExp } from '@/utils/numAndRegexp'
import { editAttribute } from './service'
import { formItemLayout, tailFormItemLayout } from './Items'
import styles from './index.less'

const { Option } = Select;

const AttributeEdit = (props) => {
    const [form] = Form.useForm();
    const { modelId, property } = props.location.query;

    // 修改属性
    const onFinish = async (values) => {
        const { name, dataAddr, functionCode, acquireInterval, ...dataConfig } = values;
        const value = { name, dataAddr, functionCode, acquireInterval, dataConfig, uploadCondition: { a: 1 } }
        const hide = message.loading('正在修改');
        try {
            await editAttribute(modelId, property.id, value)
            hide();
            // message.success('修改成功')
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
                        <Input maxLength={8}  />
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
                        name="acquireInterval"
                        label="采集间隔"
                        rules={[
                            {
                                pattern: regExp.num,
                                message: '请输入采集间隔,必须为数字!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="属性类型"
                        name="functionCode">
                        <Radio.Group>
                            {(property.functionCode === 2) ?
                                <span>
                                    <Radio value={2}>读</Radio>
                                    <Radio value='99' disabled>写</Radio>
                                </span> :
                                <span>
                                    <Radio value={1}>读</Radio>
                                    <Radio value={6}>写</Radio></span>}
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="dataLength"
                        label="数据位置"
                        rules={[
                            {
                                message: '必须为0-7之间的整数!',
                                pattern: regExp.datalengthRule,
                            },
                        ]}
                    >
                        <Select>
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