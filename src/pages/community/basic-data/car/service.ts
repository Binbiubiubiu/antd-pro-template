// import request from '@/utils/request';
import { getFakeList } from './_mock';

export async function queryBasicDataPerson(data: Pageable<CarTableSearch>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
