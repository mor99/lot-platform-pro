import React from 'react';
import { connect } from 'dva';
import {Line} from '@ant-design/charts'

const mapStateToPros=(state)=>{
    return {
        test:state.list.test,
        list_state:state.list.list_state,
        chart_state:state.list.chart_state,
        monitor_data:state.list.monitor_data
    }
}
const DeviceChart = props => {
    const {chart_state,chartdata,list_state,monitor_data,test} = props
    console.log(monitor_data)
    // 折线图配置
    const lineConfig ={
          height:220,
          width:'100%',
          forceFit: true,
          padding: 'auto',
          // data:chart_state,
          xField: 'time',
          yField: 'w',
          point: { visible: true },
          label: {
            visible: true,
            type: 'point',
          },
    }
    return (
        (chart_state ==='gateway')?
        <div style={{textAlign:'center',paddingTop:'400px'}}><a>请先选择设备</a></div>
        :
        <div style={{textAlign:'center'}}>
            <h2>{chart_state}属性监控</h2>
            <p onClick={()=>{}} style={{textAlign:'right',marginRight:'120px'}}><a>切换原始属性</a></p>
            <br/>
            {(monitor_data.ports)?monitor_data.ports.map((value)=>{
                console.log(value)
                    return (
                            <div>{value.devices.map((value1)=>{
                                    console.log(value1)
                                     return <div>{value1.properties.map((value2)=>{
                                        console.log(value2)
                                        return  (value1.name===chart_state)?<div><Line {...lineConfig} data={value2.data.datas} onlyChangeData={true}/>{value2.alias}</div>:''
                                     })}</div>
                                 
                                }
                            )
                        }</div>)
                         
            }):'暂无数据'}
        </div>
    );
  };

export default connect(mapStateToPros,null)(DeviceChart)