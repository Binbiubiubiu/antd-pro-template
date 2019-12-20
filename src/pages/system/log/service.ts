import request from '@/utils/request';
import { LogTableParams } from './data.d';

export async function queryLog(data: Pageable<LogTableParams>) {
  return request('/sys/log/list', {
    method: 'POST',
    data,
  });
}
