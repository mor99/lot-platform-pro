import React from 'react'
import { Link, history } from 'umi'
import { Divider, Button } from 'antd'
// import { deleteAttribute } from './service'

export const columns = [
    {
        title: '地址',
        dataIndex: 'dataAddr',
        /* render: text => <a>{text}</a>, */
    },
    {
        title: '显示名称',
        dataIndex: 'name',
        hideInSearch: true,
    },
    {
        title:'属性别名',
        dataIndex:'alias'
    },
    {
        title: '数据类型',
        dataIndex: 'dataType'
    },
    {
        title: '数据长度',
        dataIndex: 'dataLength'
    },
    {
        title: '单位',
        dataIndex: 'dataUnit'
    },
    {
        title: '量程上限',
        dataIndex: 'upperLimit',
        hideInSearch: true,
    },
    {
        title: '量程下限',
        dataIndex: 'lowerLimit',
    },
    {
        title: '计算公式',
        dataIndex: 'dataFormula'
    },
    {
        title: '采集频率',
        dataIndex: 'acquireInterval',
        hideInSearch: true,
    },
    {
        title: '上传条件',
        dataIndex: 'uploadCondition'
    },
    {
        title: '操作',
        valueType: 'option',
        width: 250,
        render: (text, row) => [
            <Link to={{
                pathname: (row.dataType) ? '/gateway_admin/attribute_edit1' : '/gateway_admin/attribute_edit2',
                query: { modelId: history.location.query.modelId, property: row }
            }} >
                编辑
            </Link >,
            <Divider type='vertical' />,
            <Button type="link" danger>
                删除
            </Button>]
    }
]