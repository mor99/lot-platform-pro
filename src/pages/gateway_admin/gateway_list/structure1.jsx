/* import React ,{useEffect,useState} from 'react';
import { OrganizationGraph } from '@ant-design/charts';

const DemoOrganizationGraph = () => {
    const data = {
        id: 'root',
        label: 'root',
        children: [
          {
            id: 'c1',
            label: 'c1',
            children: [
              {
                id: 'c1-1',
                label: 'c1-1',
              },
              {
                id: 'c1-2',
                label: 'c1-2',
                children: [
                  {
                    id: 'c1-2-1',
                    label: 'c1-2-1',
                  },
                  {
                    id: 'c1-2-2',
                    label: 'c1-2-2',
                  },
                ],
              },
            ],
          },
          {
            id: 'c2',
            label: 'c2',
          },
          {
            id: 'c3',
            label: 'c3',
            children: [
              {
                id: 'c3-1',
                label: 'c3-1',
              },
              {
                id: 'c3-2',
                label: 'c3-2',
                children: [
                  {
                    id: 'c3-2-1',
                    label: 'c3-2-1',
                  },
                  {
                    id: 'c3-2-2',
                    label: 'c3-2-2',
                  },
                  {
                    id: 'c3-2-3',
                    label: 'c3-2-3',
                  },
                ],
              },
              {
                id: 'c3-3',
                label: 'c3-3',
              },
            ],
          },
        ],
      };
const traverseTree = (data, fn) => {
    if (typeof fn !== 'function') {
      return;
    }
    if (fn(data) === false) {
      return false;
    }
    if (data && data.children) {
      for (let i = data.children.length - 1; i >= 0; i--) {
        if (!traverseTree(data.children[i], fn)) return false;
      }
    }
    return true;
  };
  traverseTree(data, d => {
    d.leftIcon = {
      style: {
        fill: '#e6fffb',
        stroke: '#e6fffb',
      },
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ',
    };
    return true;
  });
  return <OrganizationGraph data={data} width={800} nodeType="rect" />;
};
export default DemoOrganizationGraph; */