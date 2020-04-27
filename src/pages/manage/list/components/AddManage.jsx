import React from 'react';
import { Modal, Input, Form, Select, Switch } from 'antd';

const formRef = React.createRef();
const { Option } = Select;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const AddManage = props => {
  const { visible, formData } = props;
  const handleOk = () => {
    formRef.current.submit();
  };
  const onFinish = values => {
    props.getValue(values);
  };
  return (
    <Modal
      title="编辑管理员"
      onOk={handleOk}
      onCancel={props.handleCancel}
      destroyOnClose
      visible={visible}
    >
         <Form
        {...layout}
        initialValues={{
          ...formData,
          locked: !formData.locked,
          loginPassword:''
        }}
        name="nest-messages"
        ref={formRef}
        onFinish={onFinish}
      >
        <Form.Item
          name="loginUserName"
          label="用户名称"
          rules={[
            {
              required: true,
              message: '用户名不能为空',
            },
            {
              pattern: /^[a-zA-Z0-9_@.-]{4,18}$/,
              message: '用户名不合法',
            },
          ]}
        >
          <Input placeholder="4-16位，数字、字母、下划线" />
        </Form.Item>
        <Form.Item
          name="loginPassword"
          label="密码"
          rules={[
            {
              min: 6,
              max: 18,
              message: '密码长度为6-18位字符',
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item name="nickName" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}>
          <Input placeholder="请输入昵称" />
        </Form.Item>
        {/*<Form.Item name="locked" label="状态" valuePropName="checked">*/}
        {/*  <Switch checkedChildren="启用" unCheckedChildren="禁用" />*/}
        {/*</Form.Item>*/}
      </Form>
    </Modal>
  );
};

export default AddManage;
