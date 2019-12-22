// mock data
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

export const offlineData = offlineChartData;

export const alarmTableData = [
  {
    id: 1,
    houseName: '测试小区',
    state: '状态',
    type: '类型',
    equipName: '测试设备名称',
    address: '住址',
    alarmTime: '报警时间',
    confirmTime: '确认时间',
  },
  {
    id: 2,
    houseName: '测试小区',
    state: '状态',
    type: '类型',
    equipName: '测试设备名称',
    address: '住址',
    alarmTime: '报警时间',
    confirmTime: '确认时间',
  },
];

export default {
  'GET  /api/fake_chart_data': [],
};
