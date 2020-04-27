import React from 'react';
import { Modal, Button, Input, Form, message, Icon, Upload, Select, Radio, Checkbox } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { Option, } = Select;
const FormItem = Form.Item;
const namespace = 'advModel';
function AddModal({
  dispatch,
  formData,
  addModalVisible,
  addModalTitle,
  cancelModal,
  AddFn,
}) {
  const formRef = React.createRef();
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };


  function onFinish(values) {
    AddFn(values);
    console.log('提交', values)
  }
  function onFinishFailed({ errorFields }) {
    form.scrollToField(errorFields[0].name);
  };

  // 提交
  const handleOk = () => {
    formRef.current.submit();
  };

  return (
    <Modal
      destroyOnClose
      title={addModalTitle}
      visible={addModalVisible}
      onCancel={cancelModal}
      onOk={handleOk}
    >
      <Form
        ref={formRef}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          ...formData,
        }}
      >
        <FormItem label="名称：" name="categoryName"
          rules={[
            {
              required: true,
              message: '请输入名称',
            },
          ]}
        >
          <Input placeholder="请输入标题" type="text" />
        </FormItem>
        {/* <Form.Item label="等级：" name="categoryLevel"
          rules={[
            {
              required: true,
              message: '请选择等级',
            },
          ]}>
          <Select placeholder="选择分类等级">
            <Select.Option value="1">一级分类</Select.Option>
            <Select.Option value="2">二级分类</Select.Option>
            <Select.Option value="3">三级分类</Select.Option>
          </Select>
        </Form.Item> */}
        {/* <FormItem label="父分类" name="parentId"
          rules={[
            {
              required: true,
              message: '请选择父分类',
            },
          ]}
        >
          <Select placeholder="选择分类等级">
            <Select.Option value="0">0</Select.Option>
            <Select.Option value="2">1</Select.Option>
            <Select.Option value="3">2</Select.Option>
          </Select>
        </FormItem> */}
        <FormItem label="排序值" name="categoryRank"
          rules={[
            {
              required: true,
              message: '请输入排序值',
            },
          ]}
        >
          <Input type="number" min={0} placeholder="请输入排序值" />
        </FormItem>
      </Form>
    </Modal>
  )
}
export default AddModal;
