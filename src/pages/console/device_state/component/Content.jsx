import React,{useState, useEffect} from 'react';
import {Input,Row,Col} from 'antd'
import { connect } from 'dva';
import {Line} from '@ant-design/charts'
import {getDeviceList} from '../service'
import styles from './index.less'

/* const data = [
    {
        time:'17:08',
         value:3
    },
    {
        time:'17:09',
        value:11
    },
    {
        time:'17:10',
        value:22
    },
    {
        time:'17:11',
        value:0
    },
    {
        time:'17:18',
        value:0
    },
    {
        time:'17:35',
        value:0
    },
    {
        time:'18:11',
        value:23
    }
] */
/* const lineConfig ={
      height:220,
      width:'100%',
      forceFit: true,
      padding: 'auto',
      data,
      xField: 't',
      yField: 'w',
      point: { visible: true },
      label: {
        visible: true,
        type: 'point',
      },
} */

const mapStateToPros=(state)=>{
    return {
        list_state:state.list.list_state,
        chart_state:state.list.chart_state
    }
}
const DeviceChart = props => {
    const {chart_state,chartdata,list_state} = props
    console.log(chartdata)
    console.log(chart_state)
    console.log(list_state)
    const [deviceList,setDevice] =useState([])
    // 获取属性列表
    const getList = async ()=>{
            const result = await getDeviceList('5f1110617f31b83db06617ec')
            console.log(result)
            if (!result.status) {
                console.log(222)
                setDevice(result.ports[0].devices)
            }
            else setDevice([])
    }
    useEffect(()=>{
        getList()},[]
    )
    // 折线图配置
    const lineConfig ={
        /* title: {
            visible: true,
            text: '带数据点的折线图',
          },
          description: {
            visible: true,
            text: '将折线图上的每一个数据点显示出来\uFF0C作为辅助阅读\u3002',
          }, */
          height:220,
          width:'100%',
          forceFit: true,
          padding: 'auto',
          chart_state,
          xField: 't',
          yField: 'w',
          point: { visible: true },
          label: {
            visible: true,
            type: 'point',
          },
    }
    console.log(deviceList)
    return (
        (chart_state ==='gateway')?
        <div style={{textAlign:'center'}}>请先选择设备</div>
        :
        <div style={{textAlign:'center'}}>
            <p onClick={()=>{}} style={{textAlign:'right',marginRight:'120px'}}><a>切换原始属性</a></p>
            <br/>
            {deviceList.map((value)=>{
                    //  if (value.name ===chart_state)
                    return (
                        value.name ===chart_state) ?
                            <div>{value.properties.map((value1)=>{
                                 return <div>{value1.alias}</div>
                                }
                            )
                        }</div>
                         : ''
            })}
        </div>
    );
  };

export default connect(mapStateToPros,null)(DeviceChart)