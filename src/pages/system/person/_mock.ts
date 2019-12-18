import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams } from './data.d';

// mock tableListDataSource
let tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    name: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    desc: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

function getRule(req: Request, res: Response, u: string) {
  const mockData = [];
  for (let i = 0; i < 20; i++) {
    mockData.push({
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
      disabled: i % 3 < 1,
    });
  }

  return res.json(mockData);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  const result= [{
    "name": "超级管理员",
    "count": 37,
    "moduleId": 1,
    "id": null,
    "moduleList": "6,3,19,24,34,22,23,57,58,66,67,25,26,27,78,28,30,31,32,33,43,44,45,46,47,48,49,68,69,70,71,72,75,76,77,73,74"
  }, {"name": "报警日志权限", "count": 2, "moduleId": 12, "id": null, "moduleList": "73,74"}, {
    "name": "物业管理权限",
    "count": 6,
    "moduleId": 13,
    "id": null,
    "moduleList": "70,71,72,75,76,77"
  }, {
    "name": "设备管理权限",
    "count": 24,
    "moduleId": 14,
    "id": null,
    "moduleList": "33,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,68,69"
  }, {"name": "用户管理权限", "count": 3, "moduleId": 16, "id": null, "moduleList": "25,26,27"}, {
    "name": "车辆管理权限",
    "count": 5,
    "moduleId": 17,
    "id": null,
    "moduleList": "28,29,30,31,32"
  }, {"name": "小区管理权限", "count": 6, "moduleId": 18, "id": null, "moduleList": "22,23,57,58,66,67"}, {
    "name": "系统管理权限",
    "count": 5,
    "moduleId": 19,
    "id": null,
    "moduleList": "6,3,19,24,34"
  }];

  return res.json(result);
}

export default {
  'GET /isc/person': getRule,
  'GET /isc/roles': postRule,
};
