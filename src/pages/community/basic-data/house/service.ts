// import request from '@/utils/request';
import { getFakeList } from './_mock';

export async function queryBasicDataPerson(data: Pageable<HouseTableSearch>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
