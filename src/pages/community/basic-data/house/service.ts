// import request from '@/utils/request';
import { getFakeList } from './_mock';
import { HouseTableSearch } from './data.d';

export async function queryBasicDataPerson(data: Pageable<HouseTableSearch>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
