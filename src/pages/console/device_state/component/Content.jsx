import React,{useState} from 'react';
import { connect } from 'umi';
import {timestampToTime1} from '@/utils/time'
import {Line,StepLine} from '@ant-design/charts'

const mapStateToPros=(state)=>{
    return {
        list_state:state.list.list_state,
        chart_state:state.list.chart_state,
        monitor_data:state.list.monitor_data
    }
}
const DeviceChart = props => {
    const {chart_state,chartdata,list_state,monitor_data} = props
    // const [datatype,setType] = useState({yField:'w',color:'',text:'切换原始属性'})
    const [data,setData] = useState([])
    // 折线图配置
    const lineConfig ={
          height:300,
          width:'100%',
          forceFit: true,
          padding: 'auto',
          xField: 'time',
          yField: 'w',
          point: { visible: true },
         /*  xAxis:{
              type:'time'
          }, */
          label: {
            visible: true,
            type: 'point',
          },
          guideLine:[
              {
                  start:['0%','1400'],
                  end:['100%','1400'],
                  lineStyle: {
                    stroke: 'red',
                    lineDash: [4, 6],
                  },
                  text:{
                    position: 'start',
                    content:'max(1400)',
                    style: {
                        fill: 'red',
                     },
                    }
              },
              {
                start:['0%','50'],
                end:['100%','50'],
                lineStyle: {
                  stroke: 'red',
                  lineDash: [4, 6],
                },
                text:{
                  position: 'start',
                  content:'min(50)',
                  style: {
                      fill: 'red',
                   },
                  }
            }
          ]
    }
    // 测试数据
    setTimeout(()=>{
        const now = new Date()
        const a= {time:timestampToTime1(now.getTime()),
                  w:parseInt(Math.random()*1500,10),
                  o:parseInt(Math.random()*100,10)}
        const arr1 = [...data]
        if (arr1.length <=20){
            setData([...arr1,a])
        }
        else {
            arr1.push(a)
            arr1.shift()
            setData(arr1)
        }
    },2000)
    // 折线图设置
    const stepconfig = {...lineConfig,step:'hvh'}
    return (
        (chart_state ==='gateway')?
        <div style={{textAlign:'center',paddingTop:'400px'}}><a>请先选择设备</a></div>
        :
        <div style={{textAlign:'center'}}>
            <h2>{chart_state}属性监控</h2>
            <p onClick={()=>{
                      }} 
                style={{textAlign:'right',marginRight:'120px'}}><a>查看原始属性</a></p>
            <br/>
            {(monitor_data.ports)?monitor_data.ports.map((value)=>{
                    return (
                            <div>{value.devices.map((value1)=>{
                                     return <div>{value1.properties.map((value2)=>{
                                        return  (value1.name===chart_state)?<div><Line {...lineConfig} data={value2.data.datas} onlyChangeData/>{value2.alias}</div>:''
                                     })}</div>
                                 
                                }
                            )
                        }</div>)
                         
            }):<div>
                    <Line {...lineConfig} data={data} smooth onlyChangeData/><p>测试属性1</p>
                    <Line {...lineConfig} data={data} onlyChangeData/><p>测试属性2</p>
                    <StepLine {...stepconfig} data={data}  onlyChangeData /><p>测试属性3</p>
                </div>}
        </div>
    );
  }

export default connect(mapStateToPros,null)(DeviceChart)