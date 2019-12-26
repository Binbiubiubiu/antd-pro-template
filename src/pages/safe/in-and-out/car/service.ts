import request from '@/utils/request';

export async function getCarInOutListPage(data?: Pageable<CarAccessListParams>) {
  return request.post('/inOut/getCarInOutListPage', {
    data,
  });
}
