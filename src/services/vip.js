import request from '@/utils/request';
// 列表
export async function query(data) {
  return request('/admin/users/list', {
    method: 'POST',
    data
  });
}
// 会员锁定
export async function lockUser(data) {
  return request('/admin/users/lock', {
    method: 'POST',
    data
  });
}

 