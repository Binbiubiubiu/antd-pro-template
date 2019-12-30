import request from '@/utils/request';
import { CarAccessListSearch } from './data.d';

export async function getCarInOutListPage(data?: Pageable<CarAccessListSearch>) {
  return request.post('/inOut/getCarInOutListPage', {
    data,
  });
}
