import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { connect, } from 'dva';
import { Table, Button, Input, Select, Card, Modal, Form, Badge, Popover, Divider } from 'antd';
import AddModal from './component/AddAdv';
import styles from './index.less';

const { Option } = Select;
const namespace = 'advModel';
function advList({ dispatch, advModel, }) {
  const {
    formData,
    previewVisible,
    previewImage,
    addModalVisible,
    addModalTitle,
    editId,
    dataSource,
    loading,
    resultCount,
    page,
    limit,
    carouselId
  } = advModel;

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

  // 新增
  function showAddTaModalFn() {
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        addModalVisible: true,
        addModalTitle: '新建广告',
        formData: {
          carouselUrl: [],
          redirectUrl: '',
          carouselRank: ''
        },
        editId: '',

      },
    });
  }
  // 编辑
  function handleShow(record) {
    dispatch({
      type: `${namespace}/findOne`,
      payload: {
        id: record.carouselId
      },
    });
    console.log('record', record)
  }
  // 删除
  function handleDel(record) {
    dispatch({
      type: `${namespace}/toDelete`,
      payload: {
        ids: record.carouselId
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
          carouselUrl: [],
          redirectUrl: '',
          carouselRank: ''
        },
        editId: ''
      },
    });
  }

  // 新增/编辑数据处理函数
  function AddAdFn(value) {
    // value.carouselUrl = value.carouselUrl && value.carouselUrl[0].response.data
    console.log('addAdFn', value)
    const imgs = []
    value.carouselUrl.forEach(item => {
      imgs.push(item.url)
    })
    value.carouselUrl = imgs.join(',')
    console.log('addAdFn', value)

    if (editId) {
      console.log('编辑', value)
      dispatch({
        type: `${namespace}/update`,
        payload: {
          ...value,
          carouselId: editId,
        },
      });
    } else {
      console.log('创建', value)

      dispatch({
        type: `${namespace}/save`,
        payload: {
          ...value,
        },
      });
    }
  }

  const onFinish = values => {
    const { carouselId } = { ...values }
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        carouselId,
      },
    });
    dispatch({
      type: `${namespace}/fetch`,
      payload: {
        carouselId,
        page,
        limit,
      },
    });
    // dispatch({
    //   type: `${namespace}/fetch`,
    //   payload: { ...values,page:1,limit:10 },
    // });
  };



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
      title: '广告ID',
      dataIndex: 'carouselId',
      key: 'carouselId',
      align: 'center',
      width: '150px',
    },
    {
      title: '广告图片',
      dataIndex: 'carouselUrl',
      key: 'carouselUrl',
      align: 'center',
      width: '150px',
      render: (text, record) => (
        <div><img onClick={
          () => {
            dispatch({
              type: `${namespace}/updateState`,
              payload: {
                previewVisible: true,
                previewImage: text,
              },
            });
          }
        }
          src={text}
          style={{ cursor: 'pointer', width: "60px", height: '50px' /* margin: '10px', */ }}
        /></div>
      ),
    },
    {
      title: '广告链接',
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
      title: '排序值',
      dataIndex: 'carouselRank',
      key: 'carouselRank',
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
      width: '150px',
      align: 'center',
      fixed: 'right',
      render: (text, record) => (
        <span>
          <a onClick={() => handleShow(record)}>编辑</a>
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
                currency: 'rmb',
              },
            }}
          >
            <Form.Item name="carouselId" >
              <Input placeholder="请输入编号" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                查询
              </Button>
            </Form.Item>
          </Form>
          <Button onClick={showAddTaModalFn} type="primary">
            新建
          </Button>
        </div>
        <Table rowKey="carouselId" dataSource={dataSource} tableLayout="auto" columns={columns} scroll={{ x: 1000, y: 400 }}
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
        {
          addModalVisible && <AddModal {...addProp} />
        }

        <Modal
          title="预览图片"
          visible={previewVisible}
          footer={null}
          onCancel={
            () => {
              dispatch({
                type: `${namespace}/updateState`,
                payload: {
                  previewVisible: false,
                  previewImage: ''
                },
              });
            }
          }
        >
          <img alt=""
            src={previewImage}
            style={{ width: '100%', }}
          />
        </Modal>
      </Card>
    </PageHeaderWrapper>
  );
}
function mapStateToProps({ advModel, }) {
  return { advModel, };
}
export default connect(mapStateToProps)(advList);
