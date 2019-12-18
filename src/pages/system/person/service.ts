import request from '@/utils/request';
import {TableListParams, UserTableParams} from './data.d';

export async function queryRole() {
  return request('/sys/role/list', {
    method: 'POST',
    params:{},
  });

}

export async function removeRule(data: { key: number[] }) {
  return request('/rule', {
    method: 'POST',
    data: {
      ...data,
      method: 'delete',
    },
  });
}

export async function addRule(data: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...data,
      method: 'post',
    },
  });
}

export async function updateRule(data: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...data,
      method: 'update',
    },
  });
}


export async function queryUser(data:UserTableParams) {
  const {code,data:res} = await request('/sys/user/list', {
    method: 'POST',
    data:{
      pageIndex:data.current,
      pageSize:data.pageSize,
      param:data.param
    },
  });

  if(code!== 200){
    return {
      success:false,
      data:[],
      total:0
    }
  }

  return {
    success:true,
    data:res.current==1?res.records:res.records.slice(0,4),
    total:res.total * 2
  };
}
