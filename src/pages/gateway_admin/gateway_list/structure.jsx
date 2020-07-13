import React,{useEffect} from 'react';
import G6 from '@antv/g6';
import {history} from 'umi'

import {getData} from './service'
import styles from './index.less'

export default ()=>{
    const data1 = 
        {
            "id": "网关1",
            "children": [
                {
                    "id": "Classification",
                    "children": [
                        {
                            "id": "Logistic regression"
                        },
                        {
                            "id": "Linear discriminant analysis"
                        },
                        {
                            "id": "Rules"
                        },
                        {
                            "id": "Decision trees"
                        },
                        {
                            "id": "Naive Bayes"
                        },
                        {
                            "id": "K nearest neighbor"
                        },
                        {
                            "id": "Probabilistic neural network"
                        },
                        {
                            "id": "子设备1"
                        }
                    ]
                },
                {
                    "id": "Consensus",
                    "children": [
                        {
                            "id": "Models diversity",
                            "children": [
                                {
                                    "id": "Different initializations"
                                },
                                {
                                    "id": "Different parameter choices"
                                },
                                {
                                    "id": "Different architectures"
                                },
                                {
                                    "id": "Different modeling methods"
                                },
                                {
                                    "id": "Different training sets"
                                },
                                {
                                    "id": "Different feature sets"
                                }
                            ]
                        },
                        {
                            "id": "Methods",
                            "children": [
                                {
                                    "id": "Classifier selection"
                                },
                                {
                                    "id": "Classifier fusion"
                                }
                            ]
                        },
                        {
                            "id": "Common",
                            "children": [
                                {
                                    "id": "Bagging"
                                },
                                {
                                    "id": "Boosting"
                                },
                                {
                                    "id": "AdaBoost"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "Regression",
                    "children": [
                        {
                            "id": "Multiple linear regression"
                        },
                        {
                            "id": "Partial least squares"
                        },
                        {
                            "id": "Multi-layer feedforward neural network"
                        },
                        {
                            "id": "General regression neural network"
                        },
                        {
                            "id": "Support vector regression"
                        }
                    ]
                }
            ]
        }
/*     const data2 = {
        id:'1',
        children:[{
            id:'2'
        },{id:'3'}]
    } */
    // const data3 = {id:'1',children:[{id:'2',children:[]},{id:'22',children:[{id:'33'},{id:'3',children:[{id:'444',children:[]},{id:'4',children:[{id:'55',children:[]},{id:'5',children:[{id:'66'},{id:'6'}]}]}]}]}]}
    // const data4 = {id:"12321",children:[{id:"1",children:[{id:"子设备：1，绑定模型：23214",children:[]},{id:"子设备：2，绑定模型：2",children:[]},{id:"子设备：3，绑定模型：23214",children:[]}]},{id:"1",children:[{id:"子设备：1，绑定模型：23214",children:[]},{id:"子设备：2，绑定模型：2",children:[]},{id:"子设备：3，绑定模型：23214",children:[]}]}]}
    const ref = React.useRef(null)
    let graph = null
    // const [data,setData] = useState({})
    const fetchData = async() =>{
        await getData(history.location.query.gatewayId)
            .then((res)=>{
                console.log(res)
                if (res&&res.id){
                    if(!graph) {
                        graph=new G6.TreeGraph({
                            container: ref.current,  // dom容器
                            width:1200,
                            height:600,
                            linkCenter: true,
                            modes: {
                              default: [
                                {
                                  type: 'collapse-expand',
                                  onChange: function onChange(item, collapsed) {
                                    const {data} = item.get('model');
                                    data.collapsed = collapsed;
                                    return true;
                                  },
                                },
                                'drag-canvas',
                                'zoom-canvas',
                              ],
                            },
                            defaultNode: {  // 锚点
                              size: 26,
                              anchorPoints: [
                                [0, 0.5],
                                [1, 0.5],
                              ],
                              style: {
                                fill: '#C6E5FF',
                                stroke: '#5B8FF9',
                              },
                            },
                            defaultEdge: {    // 垂直状态
                              type: 'cubic-vertical',
                              style: {
                                stroke: '#A3B1BF',
                              },
                            },
                            layout: {   // 数图
                              type: 'dendrogram',
                              direction: 'TB', // H / V / LR / RL / TB / BT  方向
                              nodeSep: 60,
                              rankSep: 150,
                            },
                          });
                      
                          graph.node(function(node) {
                            let position ='top';
                            let rotate = 0;
                            if (!node.children) {
                              position = 'bottom';
                              rotate = Math.PI / 2;
                            }
                            return {
                              label: node.id,
                              labelCfg: {
                                position,
                                offset: 5,
                                style: {
                                  rotate,
                                  textAlign: 'center',
                                },
                              },
                            };
                          });
                   /*  graph.data(res)
                    graph.render() */
                    graph.read(res)
                    graph.fitView();
                  }
                }
            })        
    }
    useEffect(() => {
        fetchData();
}, [])
    return (
            <div className={styles.div1} ref={ref} />
    )
}