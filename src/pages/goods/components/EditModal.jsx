import React, { useState } from 'react';
import { Modal, Input, Form, Select, Cascader, InputNumber, Radio, Upload } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const tmpList = [
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];
const EditModal = props => {
  const { visible, category, goodsInfo } = props;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState(goodsInfo.goodsCoverImg);
  const [carousel, setCarousel] = useState([]);
  const handleEditorChange = (content, editor) => {
    form.setFieldsValue({ goodsDetailContent: content });
  };
  const handleOk = () => {
    form.submit();
  };
  const onFinish = values => {
    props.getValue(values);
  };
  const handleChange = ({ file, fileList, event }) => {
    let obj = {};
    console.log('file',file)
    if (file.status === 'done') {
      obj = {
        uid: new Date().getTime,
        statue: 'done',
        url: file.response.data,
        name: 'cover',
      };
      setFileList([{ ...obj }]);
    } else {
      setFileList([]);
    }
  };
  const handleCarousel = ({ file, fileList, event }) => {

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

    setCarousel(tmp);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const formatValue = (value, prevValue, prevValues)=>{
    console.log(value, prevValue, prevValues)
  }
  const normFile = e => {
    console.log('eeee',e)
    if (Array.isArray(e)) {

      return e ;
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
  return (
    <Modal
      title="编辑商品"
      width="75%"
      bodyStyle={{ padding: '16px 0' }}
      onOk={handleOk}
      onCancel={props.handleCancel}
      destroyOnClose
      visible={visible}
      centered
    >
      <Form
        form={form}
        {...layout}
        style={{ height: 500, overflow: 'auto', padding: '0 24px 0 0' }}
        name="basic"
        initialValues={{ ...goodsInfo }}
        onFinish={onFinish}
      >
        <Form.Item
          name="goodsCategory"
          label="分类"
          rules={[{ type: 'array', required: true, message: '请选择商品分类' }]}
          wrapperCol={{ span: 12 }}
        >
          <Cascader options={category} />
        </Form.Item>
        <Form.Item
          label="商品名称"
          name="goodsName"
          rules={[{ required: true, message: '请输入商品名称' }]}
          wrapperCol={{ span: 12 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="goodsCoverImg"
          label="商品封面图"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: '请上传封面图' }]}
        >
          <Upload
            action="/hf/admin/upload/file"
            name="file"
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item
          name="goodsCarousel"
          label="商品轮播图"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: '请上传轮播图' }]}
        >
          <Upload
            action="/hf/admin/upload/file"
            name="file"
            listType="picture-card"
            fileList={carousel}
            onChange={handleCarousel}
          >
            {carousel.length >= 5 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item
          label="商品描述"
          name="goodsIntro"
          rules={[{ required: true, message: '请输入商品描述' }]}
          wrapperCol={{ span: 12 }}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="商品原价"
          name="originalPrice"
          rules={[{ required: true, message: '请输入商品原价' }]}
        >
          <InputNumber min={0} max={100000} step={0.01} />
        </Form.Item>
        <Form.Item
          label="商品售卖价"
          name="sellingPrice"
          rules={[{ required: true, message: '请输入商品售卖价' }]}
        >
          <InputNumber min={0} max={100000} step={0.01} />
        </Form.Item>
        <Form.Item
          label="商品库存"
          name="stockNum"
          rules={[{ required: true, message: '请输入商品库存' }]}
        >
          <InputNumber min={0} max={1000000} step={1} />
        </Form.Item>
        <Form.Item label="商品状态" name="goodsSellStatus">
          <Radio.Group name="goodsSellStatus">
            <Radio value={0}>上架</Radio>
            <Radio value={1}>下架</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="商品标签"
          name="tag"
          wrapperCol={{ span: 12 }}
        >
          <Input />
        </Form.Item>
        <Form.Item label="商品详情" name="goodsDetailContent">
          <div>
            <Editor
              initialValue={goodsInfo.goodsDetailContent}
              init={{
                language: 'zh_CN',
                height: 300,
                menubar: false,
                automatic_uploads: true,
                images_upload_url: '/demo/upimg.php',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar: `undo redo | image | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help`,
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
