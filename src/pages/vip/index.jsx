import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { connect, } from 'dva';
import { Spin, Table, Button, Input, Select, Card, Modal, Popover, Form, Badge } from 'antd';
import styles from './index.less';

const { Option } = Select;
const namespace = 'vipModel';
function vipList({ dispatch, vipModel, }) {
  const {
    searchContent,
    form,
    loading,
    dataSource,
    resultCount,
    page,
    limit,
    userId,
  } = vipModel;

  /* 改变分页 */
  function pageOnChange(page, limit) {
    dispatch({
      type: `${namespace}/pageChange`,
      payload: {
        page,
        limit,
      },
    });
  }

  function handleClose(record, type) {
    dispatch({
      type: `${namespace}/lockUser`,
      payload: {
        ids: record.userId,
        lockStatus: type
      },
    });

  }
  const onFinish = values => {
    const { userId } = { ...values }
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        userId,
      },
    });
    dispatch({
      type: `${namespace}/fetch`,
      payload: {
        id:userId,
        page,
        limit,
      },
    });
    // console.log('values', values)
    // dispatch({
    //   type: `${namespace}/fetch`,
    //   payload: { id: values.userId, page: 1, limit: 10 },
    // });
  };
  const columns = [
    {
      title: '用户Id',
      dataIndex: 'userId',
      key: 'userId',
      align: 'center',
      width: '100px',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
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
      title: '登录账户',
      dataIndex: 'loginName',
      key: 'loginName',
      align: 'center',
      width: '120px',
    },
    {
      title: '个性签名',
      dataIndex: 'introduceSign',
      key: 'introduceSign',
      align: 'center',
      width: '100px',
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
      title: '收货地址',
      dataIndex: 'address',
      key: 'address',
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
      title: '身份状态',
      dataIndex: 'lockedFlag',
      key: 'lockedFlag',
      align: 'center',
      width: '100px',
      render: text => (
        <div>
          {text == '0' ? <Badge status="processing" text="未锁定" /> : text == '1' ? <Badge status="error" text="已锁定" /> : '-'}
        </div>
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
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '120px',
      align: 'center',
      fixed: 'right',
      render: (text, record) => (
        <span>
          {record.lockedFlag == '1' ? (<a onClick={() => handleClose(record, 0)}>解除锁定</a>) :
            ((<a onClick={() => handleClose(record, 1)}>锁定账户</a>))
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
              price: {
                status: 0,
              },
            }}
          >
            <Form.Item name="userId" >
              <Input placeholder="请输入编号" />
            </Form.Item>
            <Form.Item name="nickName">
              <Input placeholder="请输入昵称" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                查询
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Table rowKey="userId" dataSource={dataSource} columns={columns} scroll={{ x: 1000, y: 400 }}
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
      </Card>
    </PageHeaderWrapper>
  );
}
function mapStateToProps({ vipModel, }) {
  return { vipModel, };
}
export default connect(mapStateToProps)(vipList);