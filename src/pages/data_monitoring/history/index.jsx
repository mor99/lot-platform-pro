import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Select,Button} from 'antd'

import styles from './index.less'

export default class HistoryData extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <PageHeaderWrapper>
                <div className={styles.div}>
                    选择网关：
                    <Select style={{width:200}}
                        placeholder='搜索网关名称'
                    />
                    <Select style={{width:200,marginLeft:'20px'}}
                            placeholder='开始时间   ~   结束时间'
                    />    
                    <span className={styles.span}>  
                    <Button className={styles.button2} type="primary" >连接</Button>               
                    <Button className={styles.button1} >断开</Button>
                    </span>
                </div>
                <br />
                <div className={styles.div}>
                    {/* <h2><b>子设备1</b></h2> */}
                    <br />
                    <br />
                </div>
                <br/>
                <div className={styles.div}>
                    {/* <h2><b>子设备2</b></h2> */}
                    <br />
                    <br />
                </div>
            </PageHeaderWrapper>
        )
    }
}
