import React ,{useState }from 'react';
import { Modal, Button, Input, Form, message, Icon, Upload, Select, Radio, Checkbox } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Search, } = Input;
const { Option, } = Select;
const FormItem = Form.Item;
const namespace = 'newModel';
function AddModal({
  dispatch,
  formData ,
  addModalVisible,
  addModalTitle,
  cancelAddAdModalFn,
  AddAdFn,
  name,
  adCover,
  redirectUrl,
  goodsId,
  loading,
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
 
  // console.log('表单数据', name, adCover, redirectUrl)
  function onFinish(values) {
    console.log('values', values)
    AddAdFn(values);
  }

  // 提交
  const confirmCreateAction = () => {
    formRef.current.submit();
  };

  return (
    <Modal
      destroyOnClose
      title={addModalTitle}
      visible={addModalVisible}
      onCancel={cancelAddAdModalFn}
      onOk={confirmCreateAction}
    >
      <Form
         ref={formRef}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={{
          ...formData,
        }}
      >
         <FormItem label="配置项名称" name="configName"
          rules={[
            {
              required: true,
              message: '请输入配置项名称',
            },
          ]}
        >
          <Input type="text" placeholder="请输入配置项名称"/>
        </FormItem>
        <Form.Item label="配置项类别" name="configType">
          <Radio.Group name="configType">
            <Radio value={5}>推荐</Radio>
            <Radio value={4}>新品</Radio>
          </Radio.Group>
        </Form.Item>
        <FormItem label="跳转链接" name="redirectUrl"
          rules={[
            {
              required: true,
              message: '请输入跳转链接',
            },
          ]}
        >
          <Input type="text" placeholder="请输入链接"/>
        </FormItem>
        <FormItem label="商品编号" name="goodsId"
          rules={[
            {
              required: true,
              message: '请输入商品编号',
            },
          ]}
        >
          <Input type="text" placeholder="请输入商品编号"/>
        </FormItem>
        <FormItem label="排序值" name="configRank"
          rules={[
            {
              required: true,
              message: '请输入排序值',
            },
          ]}
        >
          <Input placeholder="请输入排序值" type="number" min={0} />
        </FormItem>
      </Form>
    </Modal>
  )
}
export default AddModal;
