// import request from '@/utils/request';
import { getFakeList } from '@/pages/community/suggestion/_mock';

export async function querySuggestion() {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
