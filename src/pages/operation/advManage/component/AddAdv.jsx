import React, { useState } from 'react';
import { Modal, Button, Input, Form, message, Icon, Upload, Select, Radio, Checkbox } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const namespace = 'advModel';
function AddModal({
  dispatch,
  formData,
  addModalVisible,
  addModalTitle,
  cancelAddAdModalFn,
  AddAdFn,
}) {
  const [form] = Form.useForm();
  const [carousel, setCarousel] = useState(formData.carouselUrl);
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
  const handleChange = ({ file, fileList, event }) => {
    const tmp = [];
    fileList.forEach(item => {

      let url = '';
      if (item.url) {
        url = item.url;
      } else {
        url = item.response && item.response.data;
      }
      
      const obj = {
        uid: new Date().getTime,
        statue: 'done',
        url,
        name: 'cover',
      };
      tmp.push(obj);
      
    });
    console.log('temp',tmp)
    setCarousel(tmp);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    if(e && e.file && e.file.status === 'done'){
      const tmp = [];
      e.fileList.forEach(item => {
        let url = '';
        if (item.url) {
          url = item.url;
        } else {
          url = item.response && item.response.data;
        }
        const obj = {
          uid: new Date().getTime,
          statue: 'done',
          url,
          name: 'cover',
        };
        tmp.push(obj);
      });
      return tmp
    }
    return e && e.fileList;
  };

  function onFinish(values) {
    console.log('onfinsh', values)
    AddAdFn(values);
  }
  // 提交
  const confirmCreateAction = () => {
    form.submit();
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
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={{
          ...formData,
          // carouselUrl:[]
        }}
      >
        <FormItem
          name="carouselUrl"
          label="广告图片"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: '请上传广告图片' }]}
        >
          <Upload
            action="/hf/admin/upload/file"
            name="file"
            listType="picture-card"
            fileList={carousel}
            onChange={handleChange}
          >
            {carousel.length >= 1 ? null : uploadButton}
          </Upload>
        </FormItem>
        <FormItem label="广告链接" name="redirectUrl"
          rules={[
            {
              required: true,
              message: '请输入广告链接',
            },
          ]}
        >
          <Input type="text" placeholder="请输入链接" />
        </FormItem>
        <FormItem label="排序值" name="carouselRank"
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
