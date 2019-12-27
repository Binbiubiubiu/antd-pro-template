// import request from '@/utils/request';
import { getFakeList } from './_mock';
import { PollTableSearch } from './data.d';

export async function queryPoll(data: Pageable<PollTableSearch>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
