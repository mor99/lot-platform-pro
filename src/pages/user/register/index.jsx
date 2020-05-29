import React from 'react';
import { Form, Input, Row, Col, Checkbox, Button, } from 'antd';
import axios from 'axios'

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 5 }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 12,
      offset: 9,
    },
    sm: {
      span: 12,
      offset: 10,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    axios.post('/api/user/register', values
    )
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label={
          <span>
            用户名&nbsp;
          </span>
        }
        rules={[
          {
            required: true,
            message: '请输入你的用户名!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入你的密码!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="password"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请再次输入你的密码!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject('输入的密码不一致!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phone"
        label="电话"
        rules={[
          {
            required: true,
            message: '请输入你的电话号码!',
          },
        ]}
      >
        <Input
          // addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item label="验证码">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="verificationCode"
              noStyle
              rules={[
                {
                  required: true,
                  message: '请输入验证码!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>获取验证码</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              // eslint-disable-next-line prefer-promise-reject-errors
              value ? Promise.resolve() : Promise.reject('请阅读协议后再进行注册！'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          我已经阅读并同意 <a href="#">注册须知</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm