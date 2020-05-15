/* eslint-disable no-console */
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {Link} from 'umi'
import {  Col, Row, Divider,Radio,Input ,Button,List,Avatar} from 'antd';
import styles from './index.less'

const {Search} = Input

const data = [
    {
        title:'模型1'
    },
    {
        title:'模型2'
    }
]
export default class DeviceState extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <PageHeaderWrapper>
                <div className={styles.div1}>
                    <Row gutter={100}>
                        <Col span={7}>
                            <p>我的模型</p>
                            <h2>6个模型</h2>
                        </Col>
                        <Divider type='vertical' />
                        <Col span={7}>
                            <p>平均属性个数</p>
                            <h2 style={{marginLeft:30}}>8</h2>
                        </Col>
                        <Divider type='vertical' />
                        <Col span={7}>
                            <p>上传的属性个数</p>
                            <h2 style={{marginLeft:30}}>3</h2>
                        </Col>
                    </Row>
                </div>
                <br />
                <div className={styles.div2} >
                    <Radio.Group defaultValue='a' buttonStyle='solid'>
                        <Radio.Button value='a'>RTU</Radio.Button>
                        <Radio.Button value='b'>TCP</Radio.Button>
                        <Radio.Button value='c'>NEMA</Radio.Button>
                        <Radio.Button value='d'>LoRa</Radio.Button>
                    </Radio.Group>
                    <Search 
                        className={styles.search} 
                        placeholder='请输入'
                        onSearch = {value => console.log(value)}
                           />
                    <br /><br />
                    <Button block> +添加 </Button>
                    <List 
                        size='large'
                        itemLayout='horizintal'
                        dataSource={data}
                        renderItem={ item => (
                                <List.Item actions={[<Link to='/attribute_list'>编辑属性</Link>,<Link to='#'>更多</Link>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src=''/>}
                                        title={item.title}
                                        description='一段假想的简介,这是一段比较长的描述'
                                    />
                                <span className={styles.span}>
                                    <Row>
                                        <Col span={8}>协议</Col>
                                        <Col span={8}>属性个数</Col>
                                        <Col span={8}>控制属性</Col>
                                    </Row>
                                    <Row>
                                        <Col span={8}>RTU</Col>
                                        <Col span={8}>15</Col>
                                        <Col span={8}>2</Col>
                                    </Row>
                                </span>
                                </List.Item>
                                
                            )
                        }
                    />
                </div>
            </PageHeaderWrapper>
        )
    }
}
