import React from 'react';
import styles from './index.less'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';

const CodePreview = ({ children }) => (
    <pre className={styles.pre}>
      <code>
        <Typography.Text copyable>{children}</Typography.Text>
      </code>
    </pre>
  );
export default () => {
    return (<PageHeaderWrapper><h1>测试</h1></PageHeaderWrapper>)
 }