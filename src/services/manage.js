import request from '@/utils/request';

// export async function query(data) {
//   return request('/api/manage', {
//     method: 'POST',
//     data,
//   });
// }
//
// export async function addManage(data) {
//   return request('/api/register', {
//     method: 'POST',
//     data,
//   });
// }
//
// export async function findOne(data) {
//   return request('/api/findOne', {
//     method: 'POST',
//     data,
//   });
// }
//
// export async function edit(data) {
//   return request('/api/register', {
//     method: 'POST',
//     data,
//   });
// }

export async function query(data) {
  return request('/admin/user/list',{
    method: 'POST',
    data,
  });
}
export async function queryCurrent() {
  return request('/admin/profile',{
    method: 'POST',
  });
}
export async function editManage(data) {
  return request('/admin/user/save',{
    method: 'POST',
    data,
  });
}

export async function update(data) {
  return request('/admin/user/update',{
    method: 'POST',
    data,
  });
}

export async function deleteAdmin(data) {
  return request('/admin/user/delete',{
    method: 'POST',
    data,
  });
}
