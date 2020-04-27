import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Form, Input, Select, Row, Col, Badge, Divider } from 'antd';
import { connect } from 'dva';
import { parseTime } from '@/utils/utils';
import AddManage from './components/AddManage';
import styles from './manage.less';

const { Option } = Select;
const namespace = 'manage';

// const formItemLayout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 14 },
// };

export default connect(({ manage }) => ({ manage }))(({ manage, dispatch }) => {
  const { visible, list, formData, adminUserId, total, limit, loading } = manage;
  const handleDel = row => {

    dispatch({
      type: `${namespace}/del`,
      payload: {
        adminUserId: row.adminUserId
      },
    });
  };
  const handleShow = record => {
    if (record.adminUserId) {
      dispatch({
        type: `${namespace}/updateState`,
        payload: {
          formData: record,
          visible: true,
          adminUserId: record.adminUserId
        },
      });
    } else {
      dispatch({
        type: `${namespace}/updateState`,
        payload: {
          visible: true,
        },
      });
    }
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'adminUserId',
      key: 'adminUserId',
    },
    {
      title: '登录帐号',
      dataIndex: 'loginUserName',
      key: 'loginUserName',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    // {
    //   title: '状态',
    //   dataIndex: 'locked',
    //   key: 'locked',
    //   render: status =>
    //     !status ? <Badge status="processing" text="启用" /> : <Badge status="error" text="禁用" />,
    // },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => handleShow(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => handleDel(record)}>删除</a>
        </span>
      ),
    },
  ];
  const pagination = {
    pageSize: limit,
    total,
  }
  const onChange = pageOption => {
    dispatch({
      type: `${namespace}/fetch`,
      payload: {
        page: pageOption.current,
        limit: 1,
      },
    })
  }
  const onFinish = values => {
    dispatch({
      type: `${namespace}/fetch`,
      payload: { ...values },
    });
  };

  const addProps = {
    visible,
    formData,
    getValue: values => {
      let type = 'add';
      if (adminUserId && adminUserId !== '') {
        type = 'edit';
      }
      dispatch({
        type: `${namespace}/${type}`,
        payload: {
          ...values,
          locked: 0,
          adminUserId,
        },
      });
    },
    handleCancel: () => {
      dispatch({
        type: `${namespace}/updateState`,
        payload: {
          visible: false,
          formData: {
            adminUserId: '',
            loginUserName: '',
            loginPassword: '',
            nickName: '',
            locked: 0,
          }
        },
      });
    },
  };
  return (
    <PageHeaderWrapper>
      <Card>
        <div className={[styles.tableOperator, 'search-bar'].join(' ')}>
          <Button onClick={handleShow} type="primary">
            新建
          </Button>
        </div>
        <Table rowKey="adminUserId" loading={loading} onChange={onChange} pagination={pagination} dataSource={list} columns={columns} scroll={{ x: 1000, y: 400 }} />
      </Card>
      <AddManage {...addProps} />
    </PageHeaderWrapper>
  );
});
