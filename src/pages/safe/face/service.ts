import request from '@/utils/request';
import { PeopleFaceListSearch } from './data.d';

export async function queryFaceLog(data?: Pageable<PeopleFaceListSearch>) {
  return request.post('/busi/face/log/list', {
    data,
  });
}
