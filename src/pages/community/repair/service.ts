// import request from '@/utils/request';
import { getFakeList } from './_mock';

export async function queryRepair() {
  // (data: Pageable<RepairTableParams>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
