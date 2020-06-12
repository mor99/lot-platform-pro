import React, { useState } from 'react'
import { Radio, InputNumber, PlusOutlined ,Button} from 'antd'

const dataInput = ({ value = {}, onChange }) => {
    return (
        <span>
            <Radio.Group buttonStyle="solid" defaultValue='or' onChange={(e) => { console.log(e.target.value) }}>
                <Radio.Button value="is">是</Radio.Button>
                <Radio.Button value="or">或</Radio.Button>
                <Radio.Button value="no">非</Radio.Button>
            </Radio.Group>
            <Radio.Group buttonStyle="solid" defaultValue='b' onChange={(e) => { console.log(e.target.value) }}>
                <Radio.Button value="a">大于</Radio.Button>
                <Radio.Button value="b">等于</Radio.Button>
                <Radio.Button value="c">小于</Radio.Button>
            </Radio.Group>
            <InputNumber placeholder='数值' />
            <Button
                type="dashed"
                onClick={(add) => {
                    add();
                }}
            >
                <PlusOutlined /> 添加
              </Button>
        </span>
    )
}