import request from '@/utils/request';

export async function getPersonInOutListPage(data?: Pageable<PersonAccessListParams>) {
  return request.post('/inOut/getPersonInOutListPage', {
    data,
  });
}
