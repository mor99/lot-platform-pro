/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link, history } from 'umi'
import { DownOutlined } from '@ant-design/icons';
import { Col, Row, Divider, Radio, Input, Button, List, Avatar, Menu, Dropdown, message } from 'antd';
import { getModel, deleteModel } from './service'
import styles from './index.less'

const style = {background: '#0092ff', padding: '8px 0' }
const { Search } = Input

export default () => {
    const ref = useRef();
    const [data, setData] = useState([]);
    const [num,setNum] = useState([])
    // 获取模型列表数据
    const fetchData = async () => {
        let num1 =0
        let num2 =0
        const result = await getModel()
        if (result){
            console.log(result)
            for (let i =0;i<result.length;i++){
                num1 += result[i].propertiesCtrlNum
                num2 += result[i].propertiesNum
            }
            setData(result)
            setNum([Math.round(num1/(result.length)),Math.round(num2/(result.length))])
        }
        else {setData([])}
    };
    // 组件初始化
    useEffect(() => {
        fetchData()
    }, []
    )
    // 列表展开项
    const menu = (item) => {
        return (
            <Menu>
                <Menu.Item onClick={() => {
                    history.push({ pathname: '/gateway_admin/model_edit', query: { model: item } })
                }}>
                    编辑模型
            </Menu.Item>
                <Menu.Item onClick={async () => {
                    try {
                        await deleteModel(item.id)
                        message.loading('正在删除')
                        ref.current.reload();
                        message.success('删除成功,即将刷新')
                        fetchData()
                        return true
                    } catch (error) {
                        message.loading('正在删除')
                        message.error('删除失败,请重试')
                        return false
                    }
                }}>
                    删除
            </Menu.Item>
            </Menu>
        )
    };
    return (
        <PageHeaderWrapper>
            <div className={styles.div1}>
                <Row gutter={150}>
                    <Col span={7}>
                        <p>我的模型</p>
                        <h2>{data.length}个模型</h2>
                    </Col>
                    <Divider type='vertical' />
                    <Col span={7}>
                        <p>平均属性个数</p>
                        <h2 style={{ marginLeft: 30 }}>{num[1]}</h2>
                    </Col>
                    <Divider type='vertical' />
                    <Col span={7}>
                        <p>平均控制属性个数</p>
                        <h2 style={{ marginLeft: 30 }}>{num[0]}</h2>
                    </Col>
                </Row>
            </div>
            <br />
            <div className={styles.div2} >
                {/* <Radio.Group defaultValue='a' buttonStyle='solid'>
                    <Radio.Button value='a'>RTU</Radio.Button>
                    <Radio.Button value='b'>TCP</Radio.Button>
                    <Radio.Button value='c'>NEMA</Radio.Button>
                    <Radio.Button value='d'>LoRa</Radio.Button>
                </Radio.Group> */}
                <Search
                    className={styles.search}
                    placeholder='请输入'
                    onSearch={(value) => {
                        console.log(value)
                    }
                    }
                />
                <br /><br />
                <Button block onClick={() => { history.push('model_add') }}> +添加 </Button>
                <List
                    size='large'
                    itemLayout='horizintal'
                    dataSource={data}
                    renderItem={item => {
                        return (
                            <List.Item actions={[
                                <Link to={{ pathname: '/gateway_admin/attribute_list', query: { modelId: item.id } }}>编辑属性</Link>,
                                <Dropdown overlay={menu(item)}>
                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        更多 <DownOutlined />
                                    </a></Dropdown>
                            ]}> 
                                <List.Item.Meta
                                    avatar={<Avatar src='' />}
                                    title={<Link to={{ pathname: '/gateway_admin/model_edit', query: { model: item } }}>{item.name}</Link>}
                                    description={item.description ? item.description : '暂无描述'}
                                />
                                <span className={styles.span}>
                                    <Row gutter={100}>
                                        <Col span={8}>协议</Col>
                                        <Col span={8}>属性个数</Col>
                                        <Col span={8}>控制属性</Col>
                                    </Row>
                                    <Row gutter={100}>
                                        <Col span={8} >{item.connectionMode}</Col>
                                        <Col span={8} style={{paddingRight:'20px'}}>{item.propertiesNum}</Col>
                                        <Col span={8}>{item.propertiesCtrlNum}</Col>
                                    </Row>
                                </span>
                            </List.Item>
                        )
                    }
                    }
                />
            </div>
        </PageHeaderWrapper>
    )
}
