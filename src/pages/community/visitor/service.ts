// import request from '@/utils/request';
import { getFakeList } from './_mock';

export async function queryVisitor() {
  // (data: Pageable<VisitorTableParams>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
