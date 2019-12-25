import request from '@/utils/request';

export async function getHouseListOfSelector() {
  return request('/busi/csp/busi/house/list', {
    method: 'POST',
    data: {},
  });
}

export async function getSysCodeList(data: { code: number }) {
  return request('/sys/code/getSysCodeList', {
    method: 'POST',
    data,
  });
}
