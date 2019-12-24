// import request from '@/utils/request';
import { getPatrolEvent, getPatrolPerson } from './_mock';

export async function queryPatrolPerson(data: Pageable<{}>) {
  return getPatrolPerson();

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}

export async function queryPatrolEvent(data: Pageable<{}>) {
  return getPatrolEvent();

  // return request('/api/rule', {
  // method: 'POST',
  // data,
  // });
}
