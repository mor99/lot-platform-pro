import React,{useState} from 'react';
import { connect } from 'umi';
import {timestampToTime1} from '@/utils/time'
import {ToolTwoTone,MailTwoTone} from '@ant-design/icons';
import { Timeline,Descriptions,Row,Col } from 'antd'
import {Line,StepLine, Pie} from '@ant-design/charts'
import styles from './index.less'


const DeviceChart = props => {
    const {monitor_data,elect,deviceName} = props
    // const [datatype,setType] = useState({yField:'w',color:'',text:'切换原始属性'})
    const [data,setData] = useState([])
      // 饼图数据
    const piedata = [
        {
          type: '运行中',
          value: 18,
        },
        {
          type: '待机',
          value: 5,
        },
        {
          type: '未激活',
          value: 3,
        },
        {
          type: '异常',
          value: 4,
        },
        {
          type: '关机',
          value: 12,
        },
          ]
    // 饼图配置
       const pieconfig = {
        forceFit: true,
        title: {
          visible: true,
          text: '当前设备运行情况',
        },
        radius: 0.8,
        angleField: 'value',
        colorField: 'type',
        label: {
          visible: true,
          type: 'inner',
        },
      };

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
    },4000)
    // 折线图设置
    const stepconfig = {...lineConfig,step:'hvh'}
    const content = () =>{
      switch (elect) {
        case 'default':
          return <div style={{textAlign:'center',paddingTop:'400px'}}><h1><i>XXX监控系统</i></h1></div>
        case 'gateway':
          return <div style={{paddingTop:'20px',paddingLeft:'10px',width:'99%'}}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <div className={styles.pie}>
                          <Pie {...pieconfig} data={piedata}/>
                        </div>
                        <br />
                        <div style={{paddingLeft:'25px',paddingTop:'20px',background:'white'}}>
                          <Descriptions column={1}   title='配置信息'>
                            <Descriptions.Item label="当前网关"><a>网关1</a></Descriptions.Item>
                            <Descriptions.Item label="CPU">Intel 酷睿i5 10210U 4核8线程</Descriptions.Item>
                            <Descriptions.Item label="内存">
                              <a>DDR4 2666MHz</a>
                            </Descriptions.Item>
                            <Descriptions.Item label="进程">16</Descriptions.Item>
                            <Descriptions.Item label="流量总计">1241232M</Descriptions.Item>
                            <Descriptions.Item label="剩余流量">
                              123213M
                            </Descriptions.Item>
                          </Descriptions>
                          </div>
                          <br/>
                        </Col>
                    <Col span={12}>
                    <div className={styles.timeline} >
                      <p style={{fontSize:'15px',textAlign:'center'}}><b>近期发生错误设备</b></p>
                      {/* <Calendar {...configdate} data={data11} forceFit/> */}
                      <Timeline  pending="Recording..." reverse ='false' mode='alternate'>
                        <Timeline.Item  position='left' dot={<ToolTwoTone twoToneColor='red' style={{ fontSize: '18px' }}/>}>设备B发生配置错误 2015-09-02 09:12:11</Timeline.Item>
                        <Timeline.Item  dot={<MailTwoTone twoToneColor='red' />} position='right'>设备A发生通信错误 2015-09-01 09:12:11</Timeline.Item>
                        <Timeline.Item  dot={<MailTwoTone twoToneColor='red' />} position='right'>设备A发生通信错误 2015-09-01 09:12:11</Timeline.Item>
                        <Timeline.Item  dot={<ToolTwoTone twoToneColor='red' style={{ fontSize: '18px' }}/>} position='left'>设备B发生配置错误 2015-09-02 09:12:11</Timeline.Item>
                        <Timeline.Item  dot={<ToolTwoTone twoToneColor='red' style={{ fontSize: '18px' }}/>} position='left'>设备B发生配置错误 2015-09-02 09:12:11</Timeline.Item>
                        <Timeline.Item  dot={<ToolTwoTone twoToneColor='red' style={{ fontSize: '18px' }}/>} position='left'>设备B发生配置错误 2015-09-02 09:12:11</Timeline.Item>
                        <Timeline.Item  dot={<MailTwoTone twoToneColor='red' />} position='right'>设备A发生通信错误 2015-09-01 09:12:11</Timeline.Item>
                        <Timeline.Item  dot={<ToolTwoTone twoToneColor='red' style={{ fontSize: '18px' }}/>} position='left'>设备B发生配置错误 2015-09-02 09:12:11</Timeline.Item>
                        <Timeline.Item  dot={<MailTwoTone twoToneColor='red' />} position='right'>设备A发生通信错误 2015-09-01 09:12:11</Timeline.Item>
                        <Timeline.Item  dot={<ToolTwoTone twoToneColor='red' style={{ fontSize: '18px' }}/>} position='left'>设备B发生配置错误 2015-09-02 09:12:11</Timeline.Item>
                        <Timeline.Item  dot={<MailTwoTone twoToneColor='red' />} position='right'>设备A发生通信错误 2015-09-01 09:12:11</Timeline.Item>
                        <Timeline.Item  dot={<ToolTwoTone twoToneColor='red' style={{ fontSize: '18px' }}/>} position='left'>设备B发生配置错误 2015-09-02 09:12:11</Timeline.Item>
                        <Timeline.Item  dot={<ToolTwoTone twoToneColor='red' style={{ fontSize: '18px' }}/>} position='left'>设备B发生配置错误 2015-09-02 09:12:11</Timeline.Item>
                      </Timeline>
                      <p style={{fontSize:'12px',textAlign:'center'}}><b>通信错误&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;配置错误</b></p>
                    </div>
                    </Col>
                    </Row>
                  </div>
        case 'device' :
          return <div className={styles.charts}>
                  <h2>{deviceName}属性监控</h2>
                  <p onClick={()=>{
                            }} 
                      style={{textAlign:'right',marginRight:'120px'}}><a>查看原始属性</a></p>
                    <br/>
                    {(monitor_data.ports)?monitor_data.ports.map((value)=>{
                            return (
                                    <div>{value.devices.map((value1)=>{
                                            return <div>{value1.properties.map((value2)=>{
                                                return  (value1.name===deviceName)?<div><Line {...lineConfig} data={value2.data.datas} onlyChangeData/>{value2.alias}</div>:''
                                            })}</div>
                                        
                                        }
                                    )
                                }</div>)
                                
                    }):<div>
                            <Line {...lineConfig} data={data} smooth onlyChangeData/><p><b>测试属性1</b></p>
                            <Line {...lineConfig} data={data} onlyChangeData/><p><b>测试属性2</b></p>
                            <StepLine {...stepconfig} data={data}  onlyChangeData /><p><b>测试属性3</b></p>
                        </div>}
                    </div>
      default : 
            return <p>暂无数据</p>
      }
    }

    return (
      content()
    );
  }

export default connect((state)=>{
  return {
      elect:state.monitor.elect,
      deviceName:state.monitor.deviceName,
      monitor_data:state.monitor.monitor_data
  }
},null)(DeviceChart)