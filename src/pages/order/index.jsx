import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { connect, } from 'dva';
import { Spin, Table, Button, Input, Select, Card, Modal, Popover, Form, Divider } from 'antd';
import styles from './index.less';

const { Option } = Select;
const namespace = 'orderModel';
function orderList({ dispatch, orderModel, }) {
  const {
    orderNo,
    // form,
    loading,
    dataSource,
    resultCount,
    page,
    limit,
    detailVisible,
    detailData,
  } = orderModel;

  /* 改变分页 */
  function pageOnChange(page, limit) {
    dispatch({
      type: `${namespace}/pageChange`,
      payload: {
        page,
        limit,
        orderNo,
      },
    });
  }

  function handleClose(record) {
    console.log('关闭订单')
    dispatch({
      type: `${namespace}/closeOrder`,
      payload: {
        ids: record.orderId
      },
    });
  }
  // 配货
  function checkDone(record) {
    console.log('配货')
    dispatch({
      type: `${namespace}/checkDone`,
      payload: {
        ids: record.orderId
      },
    });
  }
  // 出库
  function checkOut(record) {
    console.log('出库')
    dispatch({
      type: `${namespace}/checkOut`,
      payload: {
        ids: record.orderId
      },
    });
  }
  // 订单详情
  function viewDetail(record) {
    console.log('订单详情')
    dispatch({
      type: `${namespace}/queryItem`,
      payload: {
        id: record.orderId
      },
    });
  }
  // 关闭模态框
  function cancelModal() {
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        detailVisible: false
      },
    });
  }
  const onFinish = values => {
    const { orderNo } = { ...values }
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        orderNo,
      },
    });
    dispatch({
      type: `${namespace}/fetch`,
      payload: {
        orderNo,
        page,
        limit,
      },
    });
  };
  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      width: '170px',
      render: (text, record) => (
        <a onClick={() => viewDetail(record)}>{text}</a>
      ),
    },
    {
      title: '用户Id',
      dataIndex: 'userId',
      key: 'userId',
      align: 'center',
      width: '120px',
    },
    {
      title: '订单总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'center',
      width: '100px',
    },
    {
      title: '支付状态',
      dataIndex: 'payStatus',
      key: 'payStatus',
      align: 'center',
      width: '100px',
      render: text => (
        <div>
          {text == '0' ? '待付款' : text == '1' ? '支付成功' : text == '2' ? '支付失败' : '-'}
        </div>
      ),
    },
    {
      title: '支付类型',
      dataIndex: 'payType',
      key: 'payType',
      align: 'center',
      width: '150px',
      render: text => (
        <div>
          {text == '0' ? '无' : text == '1' ? '微信支付' : text == '2' ? '支付宝支付' : '-'}
        </div>
      ),
    },

    {
      title: '支付时间',
      dataIndex: 'payTime',
      key: 'payTime',
      align: 'center',
      width: '130px',
      render: (text, _record) => (
        <Popover content={text}
          placement="top"
          trigger="hover"
        >
          {text ? (
            <div>
              <div>{text.split(' ')[0]}</div>
              <div style={{ color: '#B9B9B9' }}>{text.split(' ')[1]}</div>
            </div>
          ) : text}
        </Popover>
      ),
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      align: 'center',
      width: '120px',
      render: text => (
        <div>
          {text == '0' ? '待付款' : text == '1' ? '已支付' : text == '2' ? '配货成功' : text == '3' ? '出库成功' : text == '4' ? '交易成功' : text == '-1' ? '手动关闭' : text == '-2' ? '超时关闭' : text == '-3' ? '商家关闭' : '-'}
        </div>
      ),
    },
    {
      title: '订单主体',
      dataIndex: 'extraInfo',
      key: 'extraInfo',
      align: 'center',
      width: '120px',
    },
    {
      title: '收货地址',
      dataIndex: 'userAddress',
      key: 'userAddress',
      align: 'center',
      width: '120px',
      render: (text, _record) => (
        <Popover content={text}
          placement="top"
          trigger="hover"
        >
          {text ? (
            <div>
              <span className={styles.show_ellipsis}>{text}</span>
            </div>
          ) : text}
        </Popover>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
      width: '150px',
      render: (text, _record) => (
        <Popover content={text}
          placement="top"
          trigger="hover"
        >
          {text ? (
            <div>
              <div>{text.split(' ')[0]}</div>
              <div style={{ color: '#B9B9B9' }}>{text.split(' ')[1]}</div>
            </div>
          ) : text}
        </Popover>
      ),
    },
    {
      title: '最新修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      align: 'center',
      width: '150px',
      render: (text, _record) => (
        <Popover content={text}
          placement="top"
          trigger="hover"
        >
          {text ? (
            <div>
              <div>{text.split(' ')[0]}</div>
              <div style={{ color: '#B9B9B9' }}>{text.split(' ')[1]}</div>
            </div>
          ) : text}
        </Popover>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '200px',
      align: 'center',
      fixed: 'right',
      render: (text, record) => (
        <span>
          {record.orderStatus == '0' ? <a onClick={() => handleClose(record)}>关闭订单</a> :
            record.orderStatus == '1' ? <span><a onClick={() => handleClose(record)}>关闭订单</a><Divider type="vertical" /><a onClick={() => checkDone(record)}>配货</a><Divider type="vertical" /><a onClick={() => checkOut(record)}>出库</a></span> :
              record.orderStatus == '2' ? <span><a onClick={() => handleClose(record)}>关闭订单</a><Divider type="vertical" /><a onClick={() => checkOut(record)}>出库</a></span> :
                record.orderStatus == '3' ? <a onClick={() => handleClose(record)}>关闭订单</a> :
                  record.orderStatus == '4' ? <a onClick={() => handleClose(record)}>关闭订单</a> : '-'
          }

        </span>
      ),
    },
  ];

  return (
    <PageHeaderWrapper >
      <Card>
        <div className={[styles.tableOperator, 'search-bar'].join(' ')}>
          <Form
            onFinish={onFinish}
            name="customized_form_controls"
            layout='inline'
            initialValues={{
            }}
          >
            <Form.Item name="orderNo" >
              <Input placeholder="请输入编号" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                查询
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Table rowKey="orderId" dataSource={dataSource} columns={columns} scroll={{ x: 1000, y: 400 }}
          pagination={
            {
              total: resultCount,
              pageSize: limit,
              pageIndex: page,
              showSizeChanger: true,
              onChange: pageOnChange,
              onShowSizeChange: pageOnChange
            }
          } />
        <Modal destroyOnClose
          title="订单详情"
          visible={detailVisible}
          footer={null}
          onCancel={cancelModal}
          width='600px'
        >
          {
            detailData && detailData.map((item, index) => (
              <div key={index} style={{ padding: '10px', borderBottom: '1px dot grey', fontSize: 16 }}>
                <span>{item.goodsName}</span>  *{item.goodsCount} <span> 商品编号 {item.goodsId}</span>
              </div>

            ))
          }
        </Modal>
      </Card>
    </PageHeaderWrapper>
  );
}
function mapStateToProps({ orderModel, }) {
  return { orderModel, };
}
export default connect(mapStateToProps)(orderList);
