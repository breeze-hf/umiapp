import request from '@/utils/request';
// 查询所有
export async function query(data) {
  return request('/admin/categories/list',{
    method: 'POST',
    data
  });
}
// 新增
export async function save(data) {
  return request('/admin/categories/save',{
    method: 'POST',
    data
  });
}
// 单个查询
export async function findOne(data) {
  return request('/admin/categories/info',{
    method: 'POST',
    data
  });
}
// 更新
export async function update(data) {
  return request('/admin/categories/update',{
    method: 'POST',
    data
  });
}
// 删除
export async function toDelete(data) {
  return request('/admin/categories/delete',{
    method: 'POST',
    data
  });
}
// 下拉接口
export async function listForSelect(data) {
  return request('/admin/categories/listForSelect',{
    method: 'POST',
    data
  });
}