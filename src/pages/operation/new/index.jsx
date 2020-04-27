import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { connect, } from 'dva';
import { Table, Button, Input, Select, Card, Modal, Form, Badge, Popover, Divider } from 'antd';
import styles from './index.less';
import AddModal from './components/addConfig';

const { Option } = Select;
const namespace = 'newModel';
function newList({ dispatch, newModel, }) {
  const {
    addModalVisible,
    addModalTitle,
    formData,
    // configType,
    dataSource,
    loading,
    resultCount,
    page,
    limit,
    editId,
  } = newModel;

  /* 改变分页 */
  function pageOnChange(page, limit) {
    dispatch({
      type: `${namespace}/pageChange`,
      payload: {
        page,
        // limit,
      },
    });
  }
  // 新增
  function showAddTaModalFn() {
    console.log('新增模态框')
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        addModalVisible: true,
        addModalTitle: '新建分类',
        formData: {
          configName: '',
          goodsId: '',
          configType: 4  ,
          redirectUrl: '',
          configRank: ''
        },
        editId: ''
      },
    });
  }
  // 关闭模态框--input框清除数据
  function cancelAddAdModalFn() {
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        addModalVisible: false,
        formData: {
          configName: '',
          goodsId: '',
          configType: 4  ,
          redirectUrl: '',
          configRank: ''
        },
        editId: ''
      },
    });
  }

  // 新增/编辑数据处理函数
  function AddAdFn(value) {
    console.log('addAdFn', value, editId)
    if (editId) {
      dispatch({
        type: `${namespace}/update`,
        payload: {
          ...value,
          configId: editId,
        },
      });
    } else {
      dispatch({
        type: `${namespace}/save`,
        payload: {
          ...value,
        },
      });
    }
  }

  const addProp = {
    addModalVisible,
    addModalTitle,
    AddAdFn,
    cancelAddAdModalFn,
    formData,
    loading,
    dispatch,
  };
  const columns = [
    {
      title: '新品ID',
      dataIndex: 'configId',
      key: 'configId',
      align: 'center',
      width: '150px',
    },
    {
      title: '配置项名称',
      dataIndex: 'configName',
      name: 'configName',
      align: 'center',
      width: '150px',
    },
    {
      title: '配置项类别',
      dataIndex: 'configType',
      name: 'configType',
      align: 'center',
      width: '120px',
      render: text => (
        <div>
          {text == '5' ? '推荐' : text == '4' ? '新品' : '-'}
        </div>
      )
    },
    {
      title: '跳转链接',
      dataIndex: 'redirectUrl',
      key: 'redirectUrl',
      align: 'center',
      width: '150px',
      render: (text, _record) => (
        <Popover content={text}
          placement="top"
          trigger="hover"
        >
          {text ? (
            <div>
              <a className={styles.show_ellipsis}>{text}</a>
            </div>
          ) : text}
        </Popover>
      ),
    },
    {
      title: '商品编号',
      dataIndex: 'goodsId',
      key: 'goodsId',
      align: 'center',
      width: '150px',
    },
    {
      title: '排序值',
      dataIndex: 'configRank',
      key: 'configRank',
      align: 'center',
      width: '120px',
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
      )
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      width: '180px',
      fixed: 'right',
      render: (text, record) => (
        <div>
          <a onClick={() => {
            console.log('record', record.name)
            dispatch({
              type: `${namespace}/findOne`,
              payload: {
                id: record.configId
              },
            });
          }}
            type="primary"
          >编辑</a>
          <Divider type="vertical" />
          <a onClick={() => {
            dispatch({
              type: `${namespace}/toDelete`,
              payload: {
                ids: record.configId,
              },
            });
          }}
            type="primary"
          >删除</a>
        </div>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <Card>
        <div className={[styles.tableOperator, 'search-bar'].join(' ')}>
          <Button onClick={showAddTaModalFn} type="primary">
            新建
          </Button>
        </div>
        <Table rowKey="configId" dataSource={dataSource} columns={columns} scroll={{ x: 1000, y: 400 }}
          pagination={
            {
              total: dataSource.length,
              pageSize: 10,
              pageIndex: page,
            }
          } />
        <AddModal {...addProp} />
      </Card>
    </PageHeaderWrapper>
  )
}
function mapStateToProps({ newModel, }) {
  return { newModel, };
}
export default connect(mapStateToProps)(newList);
