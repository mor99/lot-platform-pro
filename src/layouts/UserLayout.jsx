import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useIntl, connect } from 'umi';
import React from 'react';
import SelectLang from '@/components/SelectLang';
import { GithubOutlined } from '@ant-design/icons';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';


const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>物联网平台</span>
              </Link>
            </div>
            <div className={styles.desc}>基于Ant Design的物联网平台</div>
          </div>
          {children}
        </div>
        <DefaultFooter 
            copyright="2020 宁夏计算机技术与软件服务有限公司"
            links={[
              {
                key: 'Ant Design Pro',
                title: 'Ant Design Pro',
                href: 'https://pro.ant.design',
                blankTarget: true,
              },
              {
                key: 'github',
                title: <GithubOutlined />,
                href: 'https://github.com/ant-design/ant-design-pro',
                blankTarget: true,
              },
              {
                key: 'Ant Design',
                title: 'Ant Design',
                href: 'https://ant.design',
                blankTarget: true,
              },
            ]}
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
