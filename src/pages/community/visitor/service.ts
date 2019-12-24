// import request from '@/utils/request';
import { getFakeList } from './_mock';

export async function queryVisitor(data: Pageable<VisitorTableSearch>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
