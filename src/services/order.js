import request from '@/utils/request';

export async function query(data) {
  return request('/admin/orders/list',{
    method: 'POST',
    data
  });
}
// 订单详情
export async function queryItem(data) {
  return request('/admin/order/items',{
    method: 'POST',
    data
  });
}
// 关闭订单
export async function closeOrder(data) {
  return request('/admin/orders/close',{
    method: 'POST',
    data
  });
}
// 配货
export async function checkDone(data) {
  return request('/admin/orders/checkDone',{
    method: 'POST',
    data
  });
}
// 出库
export async function checkOut(data) {
  return request('/admin/orders/checkOut',{
    method: 'POST',
    data
  });
}

