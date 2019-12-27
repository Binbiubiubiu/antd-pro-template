import request from '@/utils/request';
import { CarTableSearch } from './data.d';

export async function queryBasicDataPerson(data: Pageable<CarTableSearch>) {
  return request('/car/getCarInfoListPage', {
    method: 'POST',
    data,
  });
}
