import request from '@/utils/request';
export async function query() {
  return request('/admin/user/list');
}
export async function queryCurrent() {
  return request('/admin/profile',{
    method: 'POST',
  });
}
export async function save() {
  return request('/admin/user/save');
}
