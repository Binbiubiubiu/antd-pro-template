// import requestquest from '@/utils/request';
import { getList } from './_mock';

export async function queryVideos(data?: Pageable<VideoCardListParams>) {
  return getList();
  // return request('/api/fake_list', {
  //   params,
  // });
}
