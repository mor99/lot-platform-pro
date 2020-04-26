import React, { Component,useState } from 'react';
import { Table, Radio, Divider} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import styles from './index.less'

/* const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
 */

 const data=[
     {
         name:'网关一',
         age:'1234',
         da:'12312',
         as1:'as1'
     },
     {
        name:'网关2',
        age:'1234',
        da:'12312',
        as1:'as1'
    },
    {
        name:'网关三',
        age:'1234',
        da:'12312',
        as1:'as1'
    }
 ]
const columns = [
    {
        title: '多选',
        dataIndex: 'name',
        key: 'name',
        /* render: text => <a>{text}</a>, */
    },
    {
        title: '描述',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '子设备',
        dataIndex: 'da',
        key: 'asd'
    },
    {
        title: '核心模块',
        dataIndex: 'as1',
        key: 'ass',
        sorter: (a, b) => a.as1 - b.as1,
    },
    {
        title: '状态',
        filters: [
            { text: 'Joe', value: 'Joe' },
            { text: 'Jim', value: 'Jim' },
          ],
    },
    {
        title: '更新时间'
    },
    {
        title: '操作'
    }
]

export default class DeviceState extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

    render() {
        /* const [selectionType, setSelectionType] = useState('checkbox'); */
        return (
            <PageHeaderWrapper>
                <div className={styles.div1}>
{/*                     <Radio.Group
                        onChange={({ target: { value } }) => {
                            setSelectionType(value);
                        }}
                        value={selectionType}
                    >
                        <Radio value="checkbox">Checkbox</Radio>
                        <Radio value="radio">radio</Radio>
                    </Radio.Group> */}

                    <Divider />
                    <Table 
                         rowSelection={{
                             type:'checkbox',
                             getCheckboxProps: record => ({
                                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                                name: record.name,
                              }),
                            }}
                        columns={columns} dataSource={data} />
                </div>

            </PageHeaderWrapper>
        )
    }
}
