// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              name: 'console',
              icon: 'table',
              path: '/console',
              routes: [
                {
                  name: 'userdata',
                  path: '/console/userdata',
                  component: './console/userdata',
                },
                {
                  name:'设备状态',
                  path:'/console/device_state',
                  component:'./console/device_state'
                }
              ],
            },
            {
              name: '网关管理',
              icon: 'table',
              path: '/gateway_admin',
              routes: [
                {
                  name: '网关列表',
                  path: '/gateway_admin/gateway_list',
                  component: './gateway_admin/gateway_list',
                },
                {
                  name:'模型列表',
                  path:'/gateway_admin/model_list',
                  component:'./gateway_admin/model_list'
                }
              ],
            },
            {
              name: '数据监控',
              icon: 'table',
              path: '/data_monitoring',
              routes: [
                {
                  name: '实时数据',
                  path: '/data_monitoring/real_time',
                  component: './data_monitoring/real_time',
                },
                {
                  name:'历史数据',
                  path:'/data_monitoring/history',
                  component:'./data_monitoring/history'
                }
              ],
            },
            {
              name: '网关控制',
              icon: 'table',
              path: '/gateway_control',
              routes: [
                {
                  name: '下发命令',
                  path: '/gateway_control/order',
                  component: './gateway_control/order',
                },
                {
                  name:'历史记录',
                  path:'/gateway_control/history',
                  component:'./gateway_control/history'
                }
              ],
            },
            {
              name: 'test',
              path: '/test',
              component: './test',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
