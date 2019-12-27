import request from '@/utils/request';

export async function queryVillage(data: Pageable<VillageTableSearch>) {
  return request('/busi/csp/busi/house/list', {
    method: 'POST',
    data,
  });
}
