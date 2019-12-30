import request from '@/utils/request';
import { PersonAccessListSearch } from './data.d';

export async function getPersonInOutListPage(data?: Pageable<PersonAccessListSearch>) {
  return request.post('/inOut/getPersonInOutListPage', {
    data,
  });
}
