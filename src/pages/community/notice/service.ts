// import request from '@/utils/request';
import { getFakeList } from './_mock';
import { NoticeTableItem } from './data.d';

export async function queryNotice(data: Pageable<NoticeTableItem>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
