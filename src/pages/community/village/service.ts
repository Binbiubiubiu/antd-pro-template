// import request from '@/utils/request';
import { getFakeList } from './_mock';

export async function queryVillage(data: Pageable<VillageTableSearch>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
