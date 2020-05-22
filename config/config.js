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
        {
          name:'register',
          path: '/user/register',
          component: './user/register'
        }
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
              redirect: '/console/userdata',
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
                  name:'device-state',
                  path:'/console/device_state',
                  component:'./console/device_state'
                }
              ],
            },
            {
              name: 'gateway-admin',
              icon: 'table',
              path: '/gateway_admin',
              routes: [
                {
                  name: 'gateway-list',
                  path: '/gateway_admin/gateway_list',
                  component: './gateway_admin/gateway_list',
                },
                {
                  name:'model-list',
                  path:'/gateway_admin/model_list',
                  component:'./gateway_admin/model_list',
                },
                {
                  name:'gateway-add',
                  path:'/gateway_admin/gateway_add',
                  component:'./gateway_admin/gateway_list/gateway_add.jsx',
                  hideInMenu:true,
                },
                {
                  name:'gateway-edit',
                  path:'/gateway_admin/gateway_edit',
                  component:'./gateway_admin/gateway_list/gateway_edit.jsx',
                  hideInMenu:true
                }
              ],
            },
            {
              name: 'data-monitoring',
              icon: 'table',
              path: '/data_monitoring',
              routes: [
                {
                  name: 'real-time',
                  path: '/data_monitoring/real_time',
                  component: './data_monitoring/real_time',
                },
                {
                  name:'history',
                  path:'/data_monitoring/history',
                  component:'./data_monitoring/history'
                }
              ],
            },
            {
              name: 'gateway-control',
              icon: 'table',
              path: '/gateway_control',
              routes: [
                {
                  name: 'order',
                  path: '/gateway_control/order',
                  component: './gateway_control/order',
                },
                {
                  name:'history',
                  path:'/gateway_control/history',
                  component:'./gateway_control/history'
                }
              ],
            },
            {
              name:'device-admin',
              path:'/device_admin',
              hideInMenu:true,
              routes:[
                {
                  name:'device-list',
                  path:'/device_admin/device_list',
                  component:'./device_admin/device_list'
                },
                {
                  name:'device-add',
                  path:'/device_admin/device_add',
                  component:'./device_admin/device_list/device_add.jsx'
                }
              ]
            },
            {
              name:'attribute-list',
              path:'/attribute_list',
              component:'./gateway_admin/attribute_list',
              hideInMenu:true,
            },
            {
              name: 'test',
              path: '/test',
              component: './test',
              hideInMenu:true,
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
              authority: ['admin'],
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
              authority: ['admin'],
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
