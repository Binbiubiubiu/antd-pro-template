import request from '@/utils/request';
import { VillageTableSearch } from './data.d';

export async function queryVillage(data: Pageable<VillageTableSearch>) {
  return request('/busi/csp/busi/house/list', {
    method: 'POST',
    data,
  });
}
