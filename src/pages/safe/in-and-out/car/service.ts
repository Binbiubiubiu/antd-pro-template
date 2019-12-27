import request from '@/utils/request';

export async function getCarInOutListPage(data?: Pageable<CarAccessListSearch>) {
  return request.post('/inOut/getCarInOutListPage', {
    data,
  });
}
