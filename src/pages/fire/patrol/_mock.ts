import mockjs from 'mockjs';

export const getPatrolPerson = () => [
  {
    id: 1,
    houseName: '绿城小区',
    name: '陈天然',
    sex: '男',
    phone: '15990286543',
  },
  {
    id: 2,
    houseName: '绿城小区',
    name: '陈天然',
    sex: '男',
    phone: '15990286543',
  },
];

export const getPatrolEvent = () => [
  {
    id: 1,
    name: '林东东',
    eventName: '巡更任务',
    address: '美哉美城',
    createTime: '2019-12-23 13:05:02',
  },
  {
    id: 1,
    name: '林东东',
    eventName: '巡更任务',
    address: '美哉美城',
    createTime: '2019-12-23 13:05:02',
  },
];

export default {
  'GET  /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
};
