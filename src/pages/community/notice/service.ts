// import request from '@/utils/request';
import { getFakeList } from './_mock';

export async function queryNotice() {
  // (data: Pageable<NoticeTableParams>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
