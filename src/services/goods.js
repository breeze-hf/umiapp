import request from '@/utils/request';

export async function query(data) {
  return request('/admin/goods/list', {
    method: 'POST',
    data,
  });
}

// export async function addGoods(data) {
//   return request('/api/goods/add', {
//     method: 'GET',
//     data,
//   });
// }

export async function addGoods(data) {
  return request('/admin/goods/save',{
    method: 'POST',
    data,
  })
}

export async function getCategory(data) {
  return request('/admin/goods/edit',{
    method: 'POST',
    data,
  })
}

export async function delGoods(data) {
  return request('/admin/goods/delete', {
    method: 'POST',
    data,
  });
}

export async function findOne(data) {
  return request('/admin/goods/detail', {
    method: 'POST',
    data,
  });
}
export async function edit(data) {
  return request('/admin/goods/update', {
    method: 'POST',
    data,
  });
}
// export async function getCategory(data) {
//   return request('/api/category', {
//     method: 'POST',
//     data,
//   });
// }
