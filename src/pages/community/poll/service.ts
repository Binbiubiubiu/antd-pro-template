// import request from '@/utils/request';
import { getFakeList } from './_mock';

export async function queryPoll() {
  // (data: Pageable<PollTableParams>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
