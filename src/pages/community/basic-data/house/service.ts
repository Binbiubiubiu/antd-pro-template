import request from '@/utils/request';
import { HouseTableSearch } from './data.d';

export async function queryBasicDataPerson(data: Pageable<HouseTableSearch>) {
  return request('/busi/csp/busi/houseUnit/roomList', {
    method: 'POST',
    data,
  });
}
