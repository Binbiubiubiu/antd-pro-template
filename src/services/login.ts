import request from '@/utils/request';

interface LoginParams {
  userName: string;
  passWord: string;
}

export async function login(params: LoginParams) {
  return request('/sys/user/login', {
    method: 'POST',
    data: params,
  });
}
