import React from 'react'
import { Link, history } from 'umi'

export const columns = [
    {
        title: '地址',
        dataIndex: 'dataAddr',
        /* render: text => <a>{text}</a>, */
    },
    {
        title: '显示名称',
        align:'center',
        dataIndex: 'name',
        hideInSearch: true,
    },
    {
        title:'属性别名',
        dataIndex:'alias',
        align:'center'
    },
    {
        title: '数据类型',
        align:'center',
        dataIndex: 'dataType'
    },
    {
        title: '数据长度',
        align:'center',
        dataIndex: 'dataLength'
    },
    {
        title: '单位',
        align:'center',
        dataIndex: 'dataUnit'
    },
    {
        title: '量程上限',
        align:'center',
        dataIndex: 'upperLimit',
        hideInSearch: true,
    },
    {
        title: '量程下限',
        align:'center',
        dataIndex: 'lowerLimit',
    },
    {
        title: '计算公式',
        align:'center',
        dataIndex: 'dataFormula'
    },
    {
        title: '功能码',
        align:'center',
        dataIndex: 'functionCode',
        hideInSearch: true,
    },
    {
        title: '上传条件',
        align:'center',
        dataIndex: 'method'
    },
    {
        title: '操作',
        valueType: 'option',
        width: 100,
        render: (text, row) => [
            <Link to={{
                pathname: (row.dataType) ? '/gateway_admin/attribute_edit1' : '/gateway_admin/attribute_edit2',
                query: { modelId: history.location.query.modelId, property: row }
            }} >
                编辑
            </Link >]
    }
]