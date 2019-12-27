import request from '@/utils/request';
import { UserTableForm, UserTableSearch } from './user.d';

/**
 * 查找用户列表
 * @param data
 */
export async function queryUser(data: Pageable<UserTableSearch>) {
  return request('/sys/user/list', {
    method: 'POST',
    data,
  });
}

/**
 * 删除用户
 * @param data
 */
export async function removeUser(data: { id: number }) {
  return request('/sys/user/deleteSysUser', {
    method: 'POST',
    data,
  });
}

/**
 * 新增或修改用户
 * @param data
 */
export async function saveOrUpdateUser(data: UserTableForm) {
  return request('/sys/user/saveOrUpdateUser', {
    method: 'POST',
    data,
  });
}

/**
 * 检查用户名是否重复
 * @param data
 */
export async function checkUserName(data: { userName: string }) {
  return request('/sys/user/checkUserName', {
    method: 'POST',
    data,
  });
}
