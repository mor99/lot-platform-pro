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
                    initialValues={property}
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
                        ]}
                    >
                        <Input />
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
                        <Input type='number' />
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
                        <Form.Item name='upperLimit'
                            rules={[{
                                require: true,
                                pattern: regExp.num,
                                message: '请输入一个数字!'
                            }]}
                            noStyle>
                            <Input style={{ width: 120, textAlign: 'center' }} />
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
                        <Form.Item name='lowerLimit'
                            rules={[{
                                pattern: regExp.num,
                                require: true,
                                message: '请输入一个数字!'
                            }]}
                            noStyle>
                            <Input
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
                                message: '请选择类型!',
                            },
                        ]}
                    >
                        <Select>
                            <Option value="int">整形</Option>
                            <Option value="float">浮点型</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="dataLength"
                        label="数据长度"
                        rules={[
                            {
                                message: '请选择模式!',
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
                        name='dataFormula'
                        rules={[
                            {
                                message: '请输入计算公式',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='上传方式'
                        rules={[
                            {
                                required: true,
                                message: '请选择类型!',
                            },
                        ]}>
                        <Radio.Group buttonStyle="solid" onChange={() => { }}>
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