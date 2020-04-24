import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import styles from './index.less'

export default class DeviceState extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <PageHeaderWrapper>
                <div className={styles.div1}>网关列表</div>
                
            </PageHeaderWrapper>
        )
    }
}
