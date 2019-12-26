import { UserRegisterParams } from './index';
import request from '@/utils/request';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}
