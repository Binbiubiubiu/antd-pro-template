import { ListItemDataType } from './data.d';
import request from '@/utils/request';

export async function queryFakeList(params: ListItemDataType) {
  return request('/api/fake_list', {
    params,
  });
}
