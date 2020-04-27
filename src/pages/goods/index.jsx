import React, { useState, useEffect } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Form, Input, Select, Row, Col, Badge, Divider, Popover, Modal } from 'antd';
import { connect } from 'dva';
import EditModal from './components/EditModal'
import styles from './index.less';

const namespace = 'goods';
const Goods = props => {

  const { goods, dispatch } = props
  const { list,
    goodsInfo,
    category,
    goodsId,
    visible,
    previewVisible,
    previewImage,
    limit,
    total
  } = goods
  const handleShow = record => {
    if (record && record.goodsId) {
      dispatch({
        type: `${namespace}/find`,
        payload: {
          goodsId: record.goodsId,

        },
      })
    } else {
      dispatch({
        type: `${namespace}/updateState`,
        payload: {
          goodsId: '',
          visible: true,
          goodsInfo: {
            goodsCategory: [1, 2, 3],
            goodsName: '',
            goodsIntro: '',
            originalPrice: '',
            sellingPrice: '',
            stockNum: '',
            goodsSellStatus: 0,
            goodsCoverImg: '',
            goodsCarousel: [],
            goodsDetailContent: '',
          },
        },
      })
    }


  }
  const handleCancel = () => {
    dispatch({
      type: `${namespace}/updateState`,
      payload: {

        visible: false
      }
    })
  }
  const handleDel = row => {
    dispatch({
      type: `${namespace}/del`,
      payload: {
        ids: row.goodsId
      },
    });
  };
  const columns = [
    {
      title: '商品编号',
      dataIndex: 'goodsId',
      key: 'goodsId',
      width: 180,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
      width: 150,
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
      title: '商品简介',
      dataIndex: 'goodsIntro',
      key: 'goodsIntro',
      width: '150px',
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
      title: '商品图片',
      dataIndex: 'goodsCoverImg',
      key: 'goodsCoverImg',
      width: 150,
      // render: value => (<img src={value} width="50" alt="" />)
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
      title: '商品售价',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
      width: 150,
    },
    {
      title: '商品库存',
      dataIndex: 'stockNum',
      key: 'stockNum',
      width: 150
    },
    {
      title: '状态',
      width: 120,
      dataIndex: 'goodsSellStatus',
      key: 'goodsSellStatus',
      render: status =>
        !status ? <Badge status="processing" text="上架" /> : <Badge status="error" text="下架" />,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
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
      key: 'action',
      width: 180,
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
  const pagination = {
    pageSize: limit,
    total,
  }
  const onFinish = values => {
    dispatch({
      type: `${namespace}/fetch`,
      payload: {
        ...values,
        page:1,
        limit,
      },
    });
  };
  const onChange = pageOptions => {
    dispatch({
      type: `${namespace}/fetch`,
      payload: {
        page: pageOptions.current,
        limit,
      },
    })
  }
  const modalProps = {
    visible,
    goodsInfo,
    category,
    getValue(values) {
      const { goodsCoverImg, goodsCarousel, goodsCategory } = values
      console.log('values', values)
      values.goodsCategoryId = goodsCategory[goodsCategory.length - 1]
      values.goodsCoverImg = goodsCoverImg && goodsCoverImg[0].url
      const imgs = []
      goodsCarousel.forEach(item => {
        imgs.push(item.url)
      })
      values.goodsCarousel = imgs.join(',')
      console.log('goodsId', goodsId)
      if (goodsId) {
        dispatch({
          type: `${namespace}/add`,
          payload: {
            ...values,
            goodsId,
          },
        })
      } else {
        dispatch({
          type: `${namespace}/add`,
          payload: {
            ...values,
          },
        })
      }

    },
    handleCancel
  }
  return (
    <PageHeaderWrapper>
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
            <Form.Item name="goodsId" >
              <Input placeholder="请输入编号" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                查询
              </Button>
            </Form.Item>
          </Form>
          <Button onClick={handleShow} type="primary">
            新建
          </Button>
        </div>
        <Table rowKey="goodsId" onChange={onChange} pagination={pagination} tableLayout="auto" scroll={{ x: 1000, y: 400 }} dataSource={list} columns={columns} />
      </Card>
      {visible && <EditModal {...modalProps} />}
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
    </PageHeaderWrapper>
  )
}
const stateToProps = ({ goods }) => ({ goods })
export default connect(stateToProps)(Goods)
