// import request from '@/utils/request';
import { getFakeList } from './_mock';

export async function queryIndustry(data: Pageable<IndustryTableSearch>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
