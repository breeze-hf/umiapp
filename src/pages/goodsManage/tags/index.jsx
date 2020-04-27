import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { connect, } from 'dva';
import { Spin, Table, Button, Input, Select, Card, Form, Popover, Divider, message } from 'antd';
import AddManage from './component/addTags'
import styles from './index.less';

const namespace = 'tagsModel';
function tagsList({ dispatch, tagsModel, }) {
  const {
    addModalVisible,
    addModalTitle,
    dataSource,
    formData,
    loading,
    resultCount,
    page,
    limit,
    editId,
    categoryLevel,
    parentId,
    isDisabled,
    categoryId,
    categoryName,
  } = tagsModel;

  /* 改变分页 */
  function pageOnChange(page, limit) {
    dispatch({
      type: `${namespace}/pageChange`,
      payload: {
        page,
        limit,
        categoryLevel,
        parentId,
      },
    });
  }

  // 新增
  function showModal() {
    console.log('新建Modal', formData)
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        addModalVisible: true,
        addModalTitle: '新增分类',
        formData: {
          // categoryLevel: '',
          // parentId: '',
          // categoryName: '',
          // categoryRank: '',
        },
        editId: ''
      },
    });

  }
  // 编辑
  function handleEdit(record) {
    dispatch({
      type: `${namespace}/findOne`,
      payload: {
        id: record.categoryId,
      },
    });
  }
  // 关闭模态框--input框清除数据
  function cancelModal() {
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        addModalVisible: false,// 模态框隐藏
        formData: {
          // categoryLevel: '',
          // parentId: '',
          // categoryName: '',
          // categoryRank: '',
        },
        editId: ''
      },
    });
  }

  // 删除
  function handleDel(record) {
    console.log('删除', record.categoryId)
    dispatch({
      type: `${namespace}/toDelete`,
      payload: {
        ids: record.categoryId
      },
    });
  }
  // 新增/编辑数据处理函数
  function AddFn(value) {
    if (editId) {
      console.log('编辑')
      dispatch({
        type: `${namespace}/update`,
        payload: {
          ...value,
          categoryId: editId,
        },
      });
    } else {
      console.log('新增', categoryId)
      dispatch({
        type: `${namespace}/save`,
        payload: {
          ...value,
          parentId,
          categoryLevel
        },
      });
    }
  }

  // 管理下一级分类
  function toNextCate(record) {
    console.log('管理下一级', categoryLevel)
    if (record.categoryLevel <= 2) {
      dispatch({
        type: `${namespace}/fetch`,
        payload: {
          limit: 10,
          page: 1,
          categoryLevel: record.categoryLevel + 1,
          parentId: record.categoryId,
          categoryId: !categoryId ? record.categoryId : categoryId
        },
      });
    } else {
      message.error('没有下级分类')
    }
    if (categoryLevel > 0) {
      dispatch({
        type: `${namespace}/updateState`,
        payload: {
          isDisabled: false
        },
      });
    }
  }
  const onFinish = values => {
    const { categoryName } = { ...values }
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        categoryName,
      },
    });
    dispatch({
      type: `${namespace}/fetch`,
      payload: {
        categoryName,
        page,
        limit,
        categoryLevel,
        parentId,
        categoryName,
      },
    });
    // dispatch({
    //   type: `${namespace}/fetch`,
    //   payload: { ...values,page:1,limit:10 },
    // });
  };
  // 返回上一级
  function toBack() {
    console.log('类别', categoryLevel)
    if (categoryLevel > 1) {
      dispatch({
        type: `${namespace}/fetch`,
        payload: {
          limit: 10,
          page: 1,
          categoryLevel: categoryLevel - 1,
          parentId: categoryLevel == 2 ? 0 : categoryId,
        },
      });
    }
    if (categoryLevel <= 2) {
      dispatch({
        type: `${namespace}/updateState`,
        payload: {
          isDisabled: true
        },
      });
    }
  }
  const addProp = {
    addModalVisible,
    addModalTitle,
    AddFn,
    cancelModal,
    formData,
    loading,
    dispatch,
  };
  const columns = [
    {
      title: '编号',
      dataIndex: 'categoryId',
      key: 'categoryId',
      align: 'center',
      width: '180px',
      render: (text, record) => (
        <span>
          <a onClick={() => toNextCate(record)}>{text}</a>
        </span>
      ),
    },
    {
      title: '分类级别',
      dataIndex: 'categoryLevel',
      key: 'categoryLevel',
      align: 'center',
      width: '150px',
      render: (text, record) => (
        <div>{text == 1 ? '一级分类' : text == 2 ? '二级分类' : text == 3 ? '三级分类' : '-'}</div>
      ),
    },
    {
      title: '父分类ID',
      dataIndex: 'parentId',
      key: 'parentId',
      align: 'center',
      width: '150px',
    },
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
      align: 'center',
      width: '230px',
    },
    {
      title: '排序值',
      dataIndex: 'categoryRank',
      key: 'categoryRank',
      align: 'center',
      width: '150px',
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
      title: '修改时间',
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
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '180px',
      align: 'center',
      fixed: 'right',
      render: (text, record) => (
        <span>
          <a onClick={() => handleEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => handleDel(record)}>删除</a>
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
            <Form.Item name="categoryName" >
              <Input placeholder="请输入名称" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                查询
                </Button>
              <Button htmlType="button" onClick={toBack} disabled={isDisabled}>
                返回上一级
              </Button>
            </Form.Item>
          </Form>
          <Button onClick={showModal} type="primary">
            新建
          </Button>
        </div>
        <Table rowKey="categoryId" tableLayout="auto" dataSource={dataSource} columns={columns} scroll={{ x: 1000, y: 400 }}
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
        <AddManage {...addProp} />
      </Card>
    </PageHeaderWrapper>
  );
}
function mapStateToProps({ tagsModel, }) {
  return { tagsModel, };
}
export default connect(mapStateToProps)(tagsList);
