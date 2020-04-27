import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { connect, } from 'dva';
import { Card, Spin, Table, Button, Input, Select, Modal, Form,Row,Col} from 'antd';
import styles from './index.less';

const { Option } = Select;

const namespace = 'goodsListModel';
function goodsList({ dispatch, goodsListModel, }) {
  const {
    previewVisible,
    dataSource,

    loading,
    resultCount,
    pageIndex,
    pageSize,

  } = goodsListModel;


  /* 改变分页 */
  function pageOnChange(pageIndex, pageSize) {
    dispatch({
      type: `${namespace}/pageChange`,
      payload: {
        pageIndex,
        pageSize,
      },
    });
  }

  // 新增
  function showAddTaModalFn() {
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        previewVisible: true,

      },
    });
  }

  // 关闭模态框--input框清除数据
  function cancelAddTaModalFn() {
    dispatch({
      type: `${namespace}/updateState`,
      payload: {
        addModalVisible: false,// 模态框隐藏
        taskName: '',
        taskType: '',
        taskDesc: '',
        taskRule: '',
        startTime: '',
        obtainFrag: '',
        editId: '',
        welfareId: '',
        welfareList: [],

      },
    });
  }

  // 新增/编辑数据处理函数
  function AddTaFn(value) {
    value.welfareId = value.welfareId ? value.welfareId.join(',') : '';
    const obj = {
      ...value,
      startTime: value.startTime[0].format('YYYY-MM-DD'),
      endTime: value.startTime[1].format('YYYY-MM-DD'),
    };
    if (editId) {
      dispatch({
        type: `${namespace}/update`,
        payload: {
          ...obj,
          id: editId,
          status: 2,
        },
      });
    } else {
      dispatch({
        type: `${namespace}/create`,
        payload: {
          ...obj,
          status,
        },
      });
    }
  }
  // const layout = {
  //   labelCol: {
  //     span: 8,
  //   },
  //   wrapperCol: {
  //     span: 16,
  //   },
  // };
  // const tailLayout = {
  //   wrapperCol: {
  //     offset: 8,
  //     span: 16,
  //   },
  // };
  const [form] = Form.useForm();
  const tableColumns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '180px',
    },
    {
      title: '任务类型',
      dataIndex: 'taskType',
      key: 'taskType',
      align: 'center',
      width: '150px',
      render: (text, record) => (
        <div>{record.taskType == 11 ? '预约教育机构' : record.taskType == 12 ? '分享他人' : '-'}</div>
      ),
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      align: 'center',
      width: '200px',
    },
    {
      title: '活动时间',
      dataIndex: 'startTime',
      key: 'startTime',
      align: 'center',
      width: '230px',
      render: (text, record) => (
        <div>{record.startTime} - {record.endTime}</div>
      ),
    },
    {
      title: '奖励惠豆',
      dataIndex: 'obtainFrag',
      key: 'obtainFrag',
      align: 'center',
      width: '150px',
      render: text => (
        <div>
          {`${text}个`}
        </div>
      ),
    },
    {
      title: '队友奖品',
      dataIndex: 'welfareNames',
      key: 'welfareNames',
      align: 'center',
      width: '150px',
      render: text => (
        <div>{text || '-'}</div>
      ),
    },
    {
      title: '任务描述',
      dataIndex: 'taskDesc',
      key: 'taskDesc',
      align: 'center',
      width: '120px',
      render: (text, record) => (
        <div><a onClick={
          () => {
            dispatch({
              type: `${namespace}/updateState`,
              payload: {
                previewVisible: true,
                previewText: text,
                previewTitle: '任务描述',
              },
            });
          }
        }
          style={{ cursor: 'pointer', width: '100%', margin: '10px', }}
        >查看</a></div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '100px',
      render: text => (
        <div>
          {text == '1' ? '启用' : text == '2' ? '停用' : text == '9' ? '过期' : '-'}
        </div>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      width: '250px',
      padding: '10px',

    },
  ];

  return (
    <PageHeaderWrapper >
      <Card>
        <div className={styles.tableOperator}>
        <Form form={form}>
          <Form.Item
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            label="描述"
            name="desc"
            rules={[
              {
                required: true,
                message: '请输入至少五个字符的规则描述！',
                min: 5,
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item 
           labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="状态"
          name="status"
          rules={[
            {
              required: true,
              message: '请输入至少五个字符的规则描述！',
              min: 5,
            },
          ]}>
          <Select
          placeholder="Select a option and change input text above"
          // onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
          </Form.Item>
      </Form>
          <div className={styles.actions}>
            <Button type="primary" className={styles.buttonFn} onClick={showAddTaModalFn}>新建</Button>
          </div>
        </div>
        <Table dataSource={dataSource} columns={tableColumns} />;
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={
            () => {
              dispatch({
                type: 'orderModel/updateState',
                payload: {
                  previewVisible: false,
                },
              });
            }
          }

        >
          新增模态框
      </Modal>
      </Card>

      {/* <div style={{
      textAlign: 'center',
    }}>
      <div style={{ width: '100%', zoom: '1', overflow: 'hidden', background:'#fff',marginBottom:'20px',padding:'20px'}}>
        <Button onClick={showAddTaModalFn}
        style={{ float: 'right', marginBottom: 10, }}
        type="primary" >新建</Button>
        <div className={styles.searchDiv}>
          <Input placeholder="员工ID" />
          <Input placeholder="用户名" />
          <Input placeholder="手机号"/>
          <Select placeholder="状态" style={{ width:150 }} >
            <Option value="0">禁用</Option>
            <Option value="1">正常</Option>
          </Select>
          <Button type='primary' >搜索</Button>
        </div>
      </div>
      <Table
          columns={tableColumns}
          dataSource={dataSource}
        />
        <Spin spinning={loading} size="large"></Spin>
    </div> */}
    </PageHeaderWrapper>

  );
}
function mapStateToProps({ goodsListModel, }) {
  return { goodsListModel, };
}
export default connect(mapStateToProps)(goodsList);
