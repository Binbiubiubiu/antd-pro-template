import request from '@/utils/request';

export async function queryVisitor(data: Pageable<VisitorTableSearch>) {
  return request('/busi/csp/busi/accessRecords/list', {
    method: 'POST',
    data,
  });
}
