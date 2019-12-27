import request from '@/utils/request';
import { PeopleTableSearch } from './data.d';

export async function queryBasicDataPerson(data: Pageable<PeopleTableSearch>) {
  return request('/busi/csp/busi/house/userinfo/list', {
    method: 'POST',
    data,
  });
}
