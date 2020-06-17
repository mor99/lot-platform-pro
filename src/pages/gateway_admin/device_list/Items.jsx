import React from 'react';
import { Form, Input, Select, InputNumber } from 'antd';
import { regExp} from '@/utils/numAndRegexp';

const { Option } = Select
export const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 10 }
};

export const tailFormItemLayout = {
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
// 子设备添加
// TCP表单项
export const TcpA = (
    <span>
        <Form.Item
            label="IP地址"
            name="ip"
            rules={[
                {
                    required: true,
                    message: '输入ip地址!',
                },
            ]}
        >
            <Input placeholder='请输入IP地址' />
        </Form.Item>
        <Form.Item
            label="端口号"
            name='port'
            rules={[
                {
                    required: true,
                    message: '输入端口号,必须为整数!',
                    pattern: regExp.num,
                    whitespace: true
                },
            ]}
        >
            <InputNumber placeholder='端口号' />
        </Form.Item>
    </span>)
// RTU表单项
export const RtuA = (
    <span>
        <Form.Item
            label="串口号"
            name='serialNo'
            rules={[
                {
                    required: true,
                    pattern: regExp.num,
                    message: '请输入串口号,必须为整数!',
                },
            ]}
        >
            <Input placeholder='请输入串口号' />
        </Form.Item>

        <Form.Item
            name="baudRate"
            label="波特率"
            rules={[
                {
                    required: true,
                    message: '选择波特率!',
                },
            ]}
        >
            <Select placeholder='请选择波特率' >
                <Option value="9600">9600</Option>
                <Option value="9600">115200</Option>
                <Option value="MIPS">1830000</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="dataLength"
            label="数据位"
            rules={[
                {
                    required: true,
                    message: '选择数据位!',
                },
            ]}
        >
            <Select placeholder='请选择模式' >
                <Option value="7">7</Option>
                <Option value="8">8</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="parity"
            label="校验"
            rules={[
                {
                    required: true,
                    message: '请选择模式!',
                },
            ]}
        >
            <Select
                placeholder='请选择模式' >
                <Option value="无校验">无校验</Option>
                <Option value="奇校验">奇校验</Option>
                <Option value="偶校验">偶校验</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="stopBit"
            label="停止位"
            rules={[
                {
                    required: true,
                    message: '请选择模式!',
                },
            ]}
        >
            <Select placeholder='请选择模式' >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
            </Select>
        </Form.Item>
    </span>
)

// 编辑子设备
// TCP表单项
export const TcpE = (value) => {
    return (
        <span>
            <Form.Item
                label="IP地址"
                name="ip"
                rules={[
                    {
                        message: '输入ip地址!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="端口号"
                name='port'
                rules={[
                    {
                        message: '请输入端口号,必须为整数!',
                        pattern: regExp.num,
                        whitespace: true
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
        </span>)
}
// RTU表单项
export const RtuE = (value) => {
    return (
        <span>
            <Form.Item
                label="串口号"
                name='serialNo'
                rules={[
                    {
                        pattern: regExp.num,
                        message: '请输入串口号,必须为整数!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="baudRate"
                label="波特率"
                rules={[
                    {
                        message: '选择波特率!',
                    },
                ]}
            >
                <Select>
                    <Option value="9600">9600</Option>
                    <Option value="9600">115200</Option>
                    <Option value="MIPS">1830000</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="dataLength"
                label="数据位"
                rules={[
                    {
                        message: '选择数据位!',
                    },
                ]}
            >
                <Select>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="parity"
                label="校验"
                rules={[
                    {
                        message: '请选择模式!',
                    },
                ]}
            >
                <Select>
                    <Option value="无校验">无校验</Option>
                    <Option value="奇校验">奇校验</Option>
                    <Option value="偶校验">偶校验</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="stopBit"
                label="停止位"
                rules={[
                    {
                        message: '请选择模式!',
                    },
                ]}
            >
                <Select >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                </Select>
            </Form.Item>
        </span>
    )
}