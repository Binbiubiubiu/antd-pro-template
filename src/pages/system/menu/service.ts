import request from '@/utils/request';
import { MenuTableForm } from './data.d';

export async function saveOrUpdateParentModule(data: MenuTableForm) {
  return request('/sys/module/saveOrUpdateParentModule', {
    method: 'POST',
    data,
  });
}

export async function saveOrUpdateChildModule(data: MenuTableForm) {
  return request('/sys/module/saveOrUpdateChildModule', {
    method: 'POST',
    data,
  });
}

export async function removeMenu(data: MenuTableForm) {
  return request('/sys/module/deleteModule', {
    method: 'POST',
    data,
  });
}
