import request from '@/utils/request';

/**
 * 查询角色列表接口
 */
export async function queryRole() {
  return request('/sys/role/list', {
    method: 'POST',
    params: {},
  });
}

/**
 * 查询当前用户角色
 * @param data
 */
export async function getUserRoleList(data: { id: number }) {
  return request('/sys/user/getUserRoleList', {
    method: 'POST',
    data,
  });
}

/**
 * 保存或修改角色
 * @param data
 */
export async function saveOrUpdateRole(data: RoleListForm) {
  return request('/sys/role/saveOrUpdateRole', {
    method: 'POST',
    data,
  });
}

/**
 * 删除角色
 * @param data
 */
export async function deleteRole(data: RoleListForm) {
  return request('/sys/role/deleteRole', {
    method: 'POST',
    data,
  });
}

/**
 * 检查角色名称是否重复
 * @param data
 */
export async function checkRoleName(data: { name: string }) {
  return request('/sys/role/checkRoleName', {
    method: 'POST',
    data,
  });
}
