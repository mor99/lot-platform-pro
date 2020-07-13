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
export const TcpA = (field)=>{
    return(
    <span>
        <Form.Item
            // label={<span>接口名称{field.name+1}</span>}
            label='接口名称'
            name={[field.name,'name']}
            fieldKey = {[field.fieldKey,'name']}
            rules={[
                {
                    required:true,
                    message:'请输入接口名称'
                }
            ]}>
            <Input placeholder='请输入接口名称'/>
        </Form.Item>
        <Form.Item
            label={<span>IP地址&emsp;</span>}
            name={[field.name,'ip']}
            fieldKey = {[field.fieldKey,'ip']}
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
            label={<span>端口号&emsp;</span>}
            name={[field.name,'port']}
            fieldKey = {[field.fieldKey,'port']}
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
    </span>)}
// RTU表单项
export const RtuA = (field)=>(
    <span>
        <Form.Item
            label="接口名称"
            name={[field.name,'name']}
            fieldKey = {[field.fieldKey,'name']}
            rules={[
                {
                    required:true,
                    message:'请输入接口名称'
                }
            ]}>
            <Input placeholder='请输入接口名称'/>
        </Form.Item>
        <Form.Item
            label={<span>串口号&emsp;</span>}
            name={[field.name,'serialNo']}
            fieldKey = {[field.fieldKey,'serialNo']}
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
            name={[field.name,'baudRate']}
            fieldKey = {[field.fieldKey,'baudRate']}
            label={<span>波特率&emsp;</span>}
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
            name={[field.name,'dataLength']}
            fieldKey = {[field.fieldKey,'dataLength']}
            label={<span>数据位&emsp;</span>}
            rules={[
                {
                    required: true,
                    message: '选择数据位!',
                },
            ]}
        >
            <Select placeholder='请选择模式' >
                <Option value={8}>8</Option>
                <Option value={7}>7</Option>
                <Option value={6}>6</Option>
                <Option value={5}>5</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name={[field.name,'parity']}
            fieldKey = {[field.fieldKey,'parity']}
            label={<span>校验&emsp;&emsp;</span>}
            rules={[
                {
                    required: true,
                    message: '请选择模式!',
                },
            ]}
        >
            <Select
                placeholder='请选择模式' >
                    <Option value="none">无校验</Option>
                    <Option value="odd">奇校验</Option>
                    <Option value="even">偶校验</Option>
                    <Option value="mark">检验位为1</Option>
                    <Option value="space">校验位为0</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name={[field.name,'stopBit']}
            fieldKey = {[field.fieldKey,'stopBit']}
            label={<span>停止位&emsp;</span>}
            rules={[
                {
                    required: true,
                    message: '请选择模式!',
                },
            ]}
        >
            <Select placeholder='请选择模式' >
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
            </Select>
        </Form.Item>
    </span>
)

// 编辑子设备
// TCP表单项
export const TcpE = () => {
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
export const RtuE = () => {
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
                    <Option value={9600}>9600</Option>
                    <Option value={115200}>115200</Option>
                    <Option value={1830000}>1830000</Option>
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
                    <Option value={8}>8</Option>
                    <Option value={7}>7</Option>
                    <Option value={6}>6</Option>
                    <Option value={5}>5</Option>
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
                    <Option value="none">无校验</Option>
                    <Option value="odd">奇校验</Option>
                    <Option value="even">偶校验</Option>
                    <Option value="mark">检验位为1</Option>
                    <Option value="space">校验位为0</Option>
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
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                </Select>
            </Form.Item>
        </span>
    )
}