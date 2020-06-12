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
          name: 'register',
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
            // 控制台
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
                  name: 'device-state',
                  path: '/console/device_state',
                  component: './console/device_state'
                }
              ],
            },
            // 网关管理
            {
              name: 'gateway-admin',
              icon: 'table',
              path: '/gateway_admin',
              routes: [
                // 网关列表
                {
                  name: 'gateway-list',
                  path: '/gateway_admin/gateway_list',
                  component: './gateway_admin/gateway_list',
                },
                // 模型列表
                {
                  name: 'model-list',
                  path: '/gateway_admin/model_list',
                  component: './gateway_admin/model_list',
                },
                // 模型添加
                {
                  name: 'model-add',
                  path: '/gateway_admin/model_add',
                  component: './gateway_admin/model_list/model_add',
                  hideInMenu: true
                },
                // 模型编辑
                {
                  name: 'model-edit',
                  path: '/gateway_admin/model_edit',
                  component: './gateway_admin/model_list/model_edit',
                  hideInMenu: true
                },
                // 网关添加
                {
                  name: 'gateway-add',
                  path: '/gateway_admin/gateway_add',
                  component: './gateway_admin/gateway_list/gateway_add.jsx',
                  hideInMenu: true,
                },
                // 网关编辑
                {
                  name: 'gateway-edit',
                  path: '/gateway_admin/gateway_edit',
                  component: './gateway_admin/gateway_list/gateway_edit.jsx',
                  hideInMenu: true
                },
                // 属性列表
                {
                  name: 'attribute-list',
                  path: '/gateway_admin/attribute_list',
                  component: './gateway_admin/attribute_list',
                  hideInMenu: true
                },
                // 添加属性
                {
                  name: 'attribute-add1',
                  path: '/gateway_admin/attribute_add1',
                  component: './gateway_admin/attribute_list/attribute_add1',
                  hideInMenu: true
                },
                {
                  name: 'attribute-add2',
                  path: '/gateway_admin/attribute_add2',
                  component: './gateway_admin/attribute_list/attribute_add2',
                  hideInMenu: true
                },
                // 编辑属性(线圈)
                {
                  name: 'attribute-edit1',
                  path: '/gateway_admin/attribute_edit1',
                  component: './gateway_admin/attribute_list/attribute_edit1',
                  hideInMenu: true
                },
                // 编辑属性(非线圈)
                {
                  name: 'attribute-edit2',
                  path: '/gateway_admin/attribute_edit2',
                  component: './gateway_admin/attribute_list/attribute_edit2',
                  hideInMenu: true
                },
                {
                  name: '属性测试',
                  path: '/gateway_admin/attribute_add9',
                  component: './gateway_admin/attribute_list/test.jsx',
                  hideInMenu: true
                }
              ],
            },
            // 数据监控
            {
              name: 'data-monitoring',
              icon: 'table',
              path: '/data_monitoring',
              routes: [
                // 实时监控
                {
                  name: 'real-time',
                  path: '/data_monitoring/real_time',
                  component: './data_monitoring/real_time',
                },
                // 历史数据
                {
                  name: 'history',
                  path: '/data_monitoring/history',
                  component: './data_monitoring/history'
                }
              ],
            },
            // 网关控制
            {
              name: 'gateway-control',
              icon: 'table',
              path: '/gateway_control',
              routes: [
                // 下发命令
                {
                  name: 'order',
                  path: '/gateway_control/order',
                  component: './gateway_control/order',
                },
                // 历史记录
                {
                  name: 'history',
                  path: '/gateway_control/history',
                  component: './gateway_control/history'
                }
              ],
            },
            //设备管理
            {
              name: 'device-admin',
              path: '/device_admin',
              hideInMenu: true,
              routes: [
                // 设备列表
                {
                  name: 'device-list',
                  path: '/device_admin/device_list',
                  component: './device_admin/device_list'
                },
                // 设备添加
                {
                  name: 'device-add',
                  path: '/device_admin/device_add',
                  component: './device_admin/device_list/device_add.jsx'
                },
                // 设备编辑
                {
                  name: 'device-edit',
                  path: '/device_admin/device_edit',
                  component: './device_admin/device_list/device_edit'
                }
              ]
            },

            {
              name: 'test',
              path: '/test',
              component: './test',
              hideInMenu: true,
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
