function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  // GET POST 可省略
  'POST /api/adv': [
    {
      key: '1',
      name:'新品上线 狗粮',
      sortOrder: '6',
      age: 32,
      address: 'New York No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      adUrl:'http:www.baidu.com',
      redirectUrl:'http:www.baidu.com',
      goodsId:'153638494995',
      status:'0',
      createTime:'2020-03-03 12:00:00'
    },
    {
      key: '2',
      name:'新品上线 猫粮',
      sortOrder: '3',
      age: 42,
      address: 'London No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      adUrl:'http:www.baidu.com',
      status:'1',
      createTime:'2020-03-03 12:00:00'
    },
    {
      key: '3',
      name:'新品上线 狗粮',
      name:'新品上线 ',
      sortOrder: '5',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      adUrl:'http:www.baidu.com',
      status:'0',
      createTime:'2020-03-03 12:00:00'
    },
    {
      key: '4',
      name:'新品上线 狗粮',
      sortOrder: '6',
      age: 32,
      address: 'New York No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      adUrl:'http:www.baidu.com',
      status:'1',
      createTime:'2020-03-03 12:00:00'
    },
    {
      key: '5',
      name:'新品上线 猫粮',
      sortOrder: '3',
      age: 42,
      address: 'London No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      adUrl:'http:www.baidu.com',
      status:1,
      createTime:'2020-03-03 12:00:00'
    },
    {
      key: '6',
      name:'新品上线 猫粮',
      sortOrder: '5',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      adUrl:'http:www.baidu.com',
      status:0,
      createTime:'2020-03-03 12:00:00'
    },
    {
      key: '7',
      name:'新品上线 猫粮',
      sortOrder: '6',
      age: 32,
      address: 'New York No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      status:1,
      adUrl:'http:www.baidu.com',
    },
    {
      key: '8',
      sortOrder: '3',
      age: 42,
      address: 'London No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      status:1
    },
    {
      key: '9',
      sortOrder: '5',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      status:1
    },
    {
      key: '10',
      sortOrder: '3',
      age: 42,
      address: 'London No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      status:1
    },
    {
      key: '11',
      sortOrder: '5',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      status:1
    },
    {
      key: '12',
      sortOrder: '3',
      age: 42,
      address: 'London No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      status:1
    },
    {
      key: '13',
      sortOrder: '5',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      adCover:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      status:1
    },
  ],
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;

    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    if (password === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
