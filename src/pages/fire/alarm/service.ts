import request from '@/utils/request';

export async function queryAlarm(data: Pageable<{}>) {
  return request('/warnLogCount/listPage', {
    method: 'POST',
    data,
  });
}

export async function countAlarmByDay(data: { dayCount: number }) {
  return request('/warnLogCount/countByDay', {
    method: 'POST',
    data,
  });
}
