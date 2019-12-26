import request from '@/utils/request';

export async function queryIndustry(data: Pageable<IndustryTableSearch>) {
  return request('/busi/csp/busi/ownerCommittee/list', {
    method: 'POST',
    data,
  });
}

export async function addIndustry(data: IndustryTableForm) {
  return request('/busi/csp/busi/ownerCommittee/add', {
    method: 'POST',
    data,
  });
}

export async function editIndustry(data: IndustryTableForm) {
  return request('/busi/csp/busi/ownerCommittee/edit', {
    method: 'POST',
    data,
  });
}

export async function deleteIndustry(data: IndustryTableForm) {
  return request('/busi/csp/busi/ownerCommittee/delete', {
    method: 'POST',
    data,
  });
}
