import React, { useState } from 'react';
import { history, Link } from 'umi'
import { Form, Input, Row, Col, Button, message, } from 'antd';
import { regExp } from '@/utils/numAndRegexp';
import { fakeRegister } from './service';
import styles from './style.less'

const FormItem = Form.Item;
/* const formItemLayout = {
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
}; */

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [count, setcount] = useState(0);
  let interval;

  const onGetCaptcha = () => {
    let counts = 59;
    setcount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setcount(counts);

      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  // 注册
  const onFinish = async (values) => {
    fakeRegister(values)
  };

  return (
    <div className={styles.main}>
      <h3>注册</h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
            {
              pattern: regExp.userRule,
              message: '只能使用数字,字母和下划线!',
            },
          ]}
        >
          <Input size="large" maxLength={16} placeholder="请输入用户名" />
        </FormItem>
        <FormItem
          name="password"
          className={
            form.getFieldValue('password') &&
            form.getFieldValue('password').length > 0 &&
            styles.password
          }
          rules={[
            {
              required: true,
              message: '请输入你的密码!',
            },
          ]}
          hasFeedback
        >
          <Input
            size="large"
            maxLength={16}
            type="password"
            placeholder="至少六位密码,区分大小写"
          />
        </FormItem>

        <Form.Item
          name="confirm"
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
          <Input.Password size='large' placeholder="再次输入密码" />
        </Form.Item>
        <FormItem
          name="phone"
          rules={[
            {
              required: true,
              message: '请输入手机号',
            },
            {
              pattern: /^1\d{10}$/,
              message: '输入正确的手机号码',
            },
          ]}
        >
          <Input size="large" placeholder="请输入手机号" />
        </FormItem>
        {/*         <InputGroup compact>
          <Select
            size="large"
            value={prefix}
            onChange={changePrefix}
            style={{
              width: '20%',
            }}
          >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
          <FormItem
            style={{
              width: '80%',
            }}
            name="phone"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1\d{10}$/,
                message: '输入正确的手机号码',
              },
            ]}
          >
            <Input size="large" placeholder="手机号" />
          </FormItem>
        </InputGroup> */}
        <Row gutter={8}>
          <Col span={16}>
            <FormItem
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                },
              ]}
            >
              <Input minLength={6} maxLength={6} size="large" placeholder="验证码" />
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              size="large"
              disabled={!!count}
              className={styles.getCaptcha}
              onClick={onGetCaptcha}
            >
              {count ? `${count} s` : '获取验证码'}
            </Button>
          </Col>
        </Row>
        <FormItem>
          <Button
            size="large"
            className={styles.submit}
            type="primary"  
            htmlType="submit"
          >
            注册
          </Button>
          <Link className={styles.login} to="/user/login">
            使用已有账户登录
          </Link>
        </FormItem>
      </Form>
    </div>
  );
  /* return (
    <div className={styles.main}>
      <Form
       {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label={
            <span>
              用户名&nbsp;
          </span>
          }
          rules={[
            {
              required: true,
              pattern: regExp.userRule,
              message: '用户名只能包括数字,字母和下划线!',
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
          name="confirm"
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
              pattern: /^1\d{10}$/,
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
            <Col span={8}>
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
        <Form.Item 
        {...tailFormItemLayout}
        >
          <Button type="primary" htmlType="submit">
            提交
        </Button>
        </Form.Item>
      </Form>
    </div>
  ); */

};

export default RegistrationForm