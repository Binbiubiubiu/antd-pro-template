import { LogTableParams } from './data.d';
import request from '@/utils/request';

export async function queryLog(data: Pageable<LogTableParams>) {
  return request('/sys/log/list', {
    method: 'POST',
    data,
  });
}
