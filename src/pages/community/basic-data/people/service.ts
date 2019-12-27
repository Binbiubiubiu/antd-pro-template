import request from '@/utils/request';

export async function queryBasicDataPerson(data: Pageable<PeopleTableSearch>) {
  return request('/busi/csp/busi/house/userinfo/list', {
    method: 'POST',
    data,
  });
}
