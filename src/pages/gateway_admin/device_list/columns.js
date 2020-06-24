import React ,{useState} from 'react'
import { Link, history } from 'umi'
import {Popconfirm,message} from 'antd'
import { PropertySafetyFilled } from '@ant-design/icons'

  function confirm(e) {
      setBan('启用')
    message.error('禁用成功!');
  }
  function cancel(e) {
    console.log(e);
    message.success('启用成功');
  }
export const columns = (gatewayId,isban,setBan) => {
    function confirm(e) {
      message.error('禁用成功!');
    }
    function cancel(e) {
      console.log(e);
      message.success('启用成功');
    }
    return [{
        title: '子设备ID',
        dataIndex: 'name',
        key: 'name',
        width: 160,
        render: (text, row) => <Link to={{
            pathname: '/gateway_admin/device_edit',
            query: {
                device: row,
                gatewayId: history.location.query.gatewayId
            }
        }}>
            {text}
        </Link>,
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
        hideInSearch: true,
        width: 180
    },
    {
        title: '从站(slave)',
        dataIndex: 'slaveNo',
        key: 'slaveNo',
        align: 'center',
        width: 180,
        sorter: (a, b) => a.slaveNo - b.slaveNo,
        hideInSearch: true,
    },
    {
        title: '接入方式',
        dataIndex: 'connectionMode',
        key: 'connectionMode',
        width: 180,
        hideInSearch: true,
        sorter: (a, b) => a.name - b.name,
    },
    {
        title: '绑定模型',
        dataIndex: 'bindingModel',
        key: 'bindingModel',
        width: 230
    },
    {
        title: '操作',
        valueType: 'option',
        align: 'center',
        width: 230,
        render: (text, row) => [
            <Link to={{
                pathname: '/gateway_admin/model_bind',
                query: { deviceId: row.id, gatewayId: gatewayId }
            }}>
                绑定模型
            </Link>,
            <Link to={{
                pathname: '/gateway_admin/device_edit',
                query: {
                    device: row,
                    gatewayId: history.location.query.gatewayId
                }
            }}>
                修改
            </Link>,
/*             <Popconfirm
                title="确定禁用设备?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="是"
                cancelText="否"
            >
                <Link>{isban}</Link>
            </Popconfirm>, */
            <Link to={{
                pathname: '#',
                query: {}
            }}>
                查看详情
            </Link>,
        ],
    }
]}
