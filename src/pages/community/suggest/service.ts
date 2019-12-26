// import request from '@/utils/request';
import { getFakeList } from './_mock';

export async function querySuggestion(data: Pageable<SuggestTableParams>) {
  return Promise.resolve(getFakeList());

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
