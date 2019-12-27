import request from '@/utils/request';

export async function queryBasicDataPerson(data: Pageable<CarTableSearch>) {
  return request('/car/getCarInfoListPage', {
    method: 'POST',
    data,
  });
}
