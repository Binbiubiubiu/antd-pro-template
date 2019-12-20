import request from '@/utils/request';

/**
 * 查找用户列表
 * @param data
 */
export async function queryUser(data: Pageable<UserTableParams>) {
  return request('/sys/user/list', {
    method: 'POST',
    data,
  });
}

/**
 * 删除用户
 * @param data
 */
export async function removeUser(data: { key: number[] }) {
  return request('/rule', {
    method: 'POST',
    data: {
      ...data,
    },
  });
}

/**
 * 新增用户
 * @param data
 */
export async function addUser(data: UserTableForm) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...data,
    },
  });
}

/**
 * 修改用户
 * @param data
 */
export async function updateUser(data: UserTableForm) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...data,
    },
  });
}
