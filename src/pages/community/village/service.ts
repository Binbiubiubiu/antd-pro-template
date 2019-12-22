// import request from '@/utils/request';
import { getFakeList } from './_mock';

export async function queryVillage() {
  // (data: Pageable<VillageTableParams>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
