import React, { useState, useEffect, useRef } from 'react'
import { history } from 'umi'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Radio, message } from 'antd';
import { columns } from './columns'
import { getAttribute, deleteAttribute } from './service'
import styles from './index.less'

export default () => {
    const ref = useRef();
    const [radio, setRadio] = useState('a')
    const [data, setData] = useState([])
    const delectId = { propertyList: [] }
    const { modelId } = history.location.query
    const handlchange = e => {
        setRadio(e.target.value)
    }
    // 获取属性数据
    const fetchData = async () => {
        const result = await getAttribute(modelId)
        const resultdata = []
        for (let i = 0; i < result.length; i += 1) {
            resultdata[i] = { ...result[i], ...result[i].dataConfig }
            resultdata[i].dataConfig = undefined
        }
        setData(resultdata)
    }

    // 副作用函数
    useEffect(() => {
        fetchData()
    }, []
    )
    // 删除属性
    const handleRemove = async selectedRows => {
        const hide = message.loading('正在删除');
        if (!selectedRows) return true;
        try {
            await deleteAttribute(modelId, delectId)
            hide();
            ref.current.reload();
            // message.success('删除成功，即将刷新');
            fetchData()
            return true;
        } catch (error) {
            hide();
            message.error('删除失败，请重试');
            return false;
        }
    }

    // 选择项处理
    const rowSelection = {
        onSelect: (record, selected, selectedRows) => {
            delectId.propertyList.length = 0;
            selectedRows.forEach(
                (value) => {
                    delectId.propertyList.push(value.id)
                }
            )
        },
    };

    return (
        <PageHeaderWrapper>
            <div className={styles.div}>
                <Radio.Group buttonStyle="solid" defaultValue='a' onChange={handlchange}>
                    <Radio.Button value="a">输入寄存器</Radio.Button>
                    <Radio.Button value="b">保持寄存器</Radio.Button>
                    <Radio.Button value="c">线圈状态</Radio.Button>
                    <Radio.Button value="d">离散输入状态</Radio.Button>
                </Radio.Group>
                <ProTable
                    actionRef={ref}
                    search={false}
                    options={false}
                    rowKey='id'
                    rowSelection={rowSelection}
                    toolBarRender={(action, { selectedRows }) => [
                        <Button key="3" type="primary" onClick={() => {
                            history.push({
                                pathname:
                                    (radio === 'a' || radio === 'b') ? 'attribute_add1' : 'attribute_add2'
                                , query: { modelId, radio }
                            })
                        }}>
                            <PlusOutlined />
                                新建
                        </Button>,
                        <Button key="4" type="primary"  >
                            批量导入
                        </Button>,
                        <Button key="5" type="primary" >
                            批量导出
                                </Button>,
                        <Button key='6' type='primary' danger onClick={() => {
                            handleRemove(selectedRows)
                            action.reload()
                        }
                        }>
                            删除
                        </Button>,
                        <Input.Search placeholder="请输入"
                            onSearch={value => console.log(value)} />
                    ]}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </PageHeaderWrapper>
    )
}