// import request from '@/utils/request';
import { getFakeList } from './_mock';

export async function queryRepair(data: Pageable<RepairTableSearch>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
