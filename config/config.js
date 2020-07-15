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
      // 用户
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        // 登录
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: '注册页',
          icon: 'smile',
          path: '/user/register1',
          component: './user/register1',
        }, // 注册
        {
          name: 'register',
          path: '/user/register',
          component: './user/register',
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
              redirect: '/console/userdata',
            }, // 控制台
            {
              name: '控制台',
              icon: 'BarChartOutlined',
              path: '/console',
              routes: [
                // 用户数据
                {
                  name: '用户数据',
                  path: '/console/userdata',
                  component: './console/userdata',
                }, // 设备状态
                {
                  name: '设备状态',
                  path: '/console/device_state',
                  component: './console/device_state',
                },
              ],
            }, // 网关管理
            {
              name: '网关管理',
              icon: 'Gateway',
              path: '/gateway_admin',
              routes: [
                // 网关列表
                {
                  name: '网关列表',
                  path: '/gateway_admin/gateway_list',
                  component: './gateway_admin/gateway_list',
                }, // 网关添加
                {
                  name: '网关添加',
                  path: '/gateway_admin/gateway_add',
                  component: './gateway_admin/gateway_list/gateway_add.jsx',
                  hideInMenu: true,
                }, // 网关编辑
                {
                  name: '网关编辑',
                  path: '/gateway_admin/gateway_edit',
                  component: './gateway_admin/gateway_list/gateway_edit.jsx',
                  hideInMenu: true,
                },
                {
                  name:'网关添加结果',
                  path:'/gateway_admin/gateway_result',
                  component:'./gateway_admin/gateway_list/result',
                  hideInMenu:true
                },
                {
                  name:'结构图',
                  path:'/gateway_admin/gateway_structure',
                  component:'./gateway_admin/gateway_list/structure',
                  hideInMenu:true
                },
                {
                  name:'结构图',
                  path:'/gateway_admin/gateway_structure1',
                  component:'./gateway_admin/gateway_list/structure1',
                  hideInMenu:true
                },
                 // 模型列表
                {
                  name: '模型列表',
                  path: '/gateway_admin/model_list',
                  component: './gateway_admin/model_list',
                }, // 模型添加
                {
                  name: '模型添加',
                  path: '/gateway_admin/model_add',
                  component: './gateway_admin/model_list/model_add',
                  hideInMenu: true,
                }, // 模型编辑
                {
                  name: '模型编辑',
                  path: '/gateway_admin/model_edit',
                  component: './gateway_admin/model_list/model_edit',
                  hideInMenu: true,
                }, // 属性列表
                {
                  name: '属性列表',
                  path: '/gateway_admin/attribute_list',
                  component: './gateway_admin/attribute_list',
                  hideInMenu: true,
                }, // 添加属性(线圈)
                {
                  name: '添加属性',
                  path: '/gateway_admin/attribute_add1',
                  component: './gateway_admin/attribute_list/attribute_add1',
                  hideInMenu: true,
                }, // 添加属性(非线圈)
                {
                  name: '添加属性',
                  path: '/gateway_admin/attribute_add2',
                  component: './gateway_admin/attribute_list/attribute_add2',
                  hideInMenu: true,
                }, // 编辑属性(线圈)
                {
                  name: '编辑属性',
                  path: '/gateway_admin/attribute_edit1',
                  component: './gateway_admin/attribute_list/attribute_edit1',
                  hideInMenu: true,
                }, // 编辑属性(非线圈)
                {
                  name: '编辑属性',
                  path: '/gateway_admin/attribute_edit2',
                  component: './gateway_admin/attribute_list/attribute_edit2',
                  hideInMenu: true,
                }, //设备列表
                {
                  name: '设备列表',
                  path: '/gateway_admin/device_list',
                  component: './gateway_admin/device_list',
                  hideInMenu: true,
                }, // 设备添加
                {
                  name: '设备添加',
                  path: '/gateway_admin/device_add',
                  component: './gateway_admin/device_list/device_add',
                  hideInMenu: true,
                }, // 设备编辑
                {
                  name: '设备编辑',
                  path: '/gateway_admin/device_edit',
                  component: './gateway_admin/device_list/device_edit',
                  hideInMenu: true,
                }, // 设备-模型绑定
                {
                  name: '创建绑定操作',
                  path: '/gateway_admin/model_bind',
                  component: './gateway_admin/device_list/model_bind',
                  hideInMenu: true,
                },
                {
                  name: '属性测试',
                  path: '/gateway_admin/attribute_add9',
                  component: './gateway_admin/attribute_list/test.jsx',
                  hideInMenu: true,
                },
              ],
            }, // 数据监控
            {
              name: '数据监控',
              icon: 'FundProjectionScreen',
              path: '/data_monitoring',
              routes: [
                // 实时监控
                {
                  name: '实时数据',
                  path: '/data_monitoring/real_time',
                  component: './data_monitoring/real_time',
                },
                // 具体信息
                {
                  name:'监控信息',
                  path:'/data_monitoring/concrete',
                  component:'./data_monitoring/real_time/concrete',
                  hideInMenu:true
                },
                // 历史数据
                {
                  name: '历史数据',
                  path: '/data_monitoring/history',
                  component: './data_monitoring/history',
                },
              ],
            }, // 网关控制
            {
              name: '网关控制',
              icon: 'VerticalLeftOutlined',
              path: '/gateway_control',
              routes: [
                // 下发命令
                {
                  name: '下发命令',
                  path: '/gateway_control/order',
                  component: './gateway_control/order',
                }, 
                // 生成控制命令
                {
                  name:'生成控制命令',
                  path:'/gateway_control/control',
                  component:'./gateway_control/order/control',
                  hideInMenu:true
                },
                // 控制记录
                {
                  name: '控制记录',
                  path: '/gateway_control/history',
                  component: './gateway_control/history',
                },
                // 结果页
                {
                  name:'成功下发控制命令',
                  path:'/gateway_control/result',
                  component:'./gateway_control/result',
                  hideInMenu:true
                }
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
