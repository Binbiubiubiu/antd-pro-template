import request from '@/utils/request';

export async function getUrlByUri(data: { uri: string }) {
  return request('/sys/iscSysCommon/getUrlByUri', {
    method: 'POST',
    data,
  });
}

export async function getUrlByUriBatch(data: string[]) {
  return request('/sys/iscSysCommon/getUrlByUriBatch', {
    method: 'POST',
    data,
  });
}
