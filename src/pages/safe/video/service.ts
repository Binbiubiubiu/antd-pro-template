import request from '@/utils/request';

export async function queryVideos(data: Pageable<VideoCardListParams>) {
  return request.post('/busi/device/details/list', {
    data,
  });
}

export async function queryVideosByCode(data: { indexCodeId: string; houseKey: string }) {
  return request.post('/busi/device/details/one', {
    data,
  });
}
