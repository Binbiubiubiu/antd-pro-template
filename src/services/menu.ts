import request from '@/utils/request';

export async function moduleListAll() {
  return request('/sys/module/moduleListAll', {
    method: 'POST',
    data: {},
  });
}

export async function getSysUserAuthList() {
  return request('/sys/user/getSysUserAuthList', {
    method: 'POST',
    data: {},
  });
}
