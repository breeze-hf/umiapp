import Mock from 'mockjs';

function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据
const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      account: '@email',
      'status|1': [0, 1],
      'role|1': ['admin', 'edit'],
      createTime: '@now',
    },
  ],
});
export default {
  // 支持值为 Object 和 Array
  // GET POST 可省略
  'POST /api/manage': (req, res) => {
    const { status } = req.body;
    const { items } = data;
    let result = items;
    if (status) {
      result = items.filter(item => item.status === Number(status));
    }

    res.send({
      status: 'ok',
      data: result,
    });
  },
  'POST /api/findOne': (req, res) => {
    const resData = Mock.mock({
      id: '@id',
      account: '@email',
      'status|1': [0, 1],
      'role|1': ['admin', 'edit'],
      createTime: '@now',
    });
    res.send({
      status: 'ok',
      data: resData,
    });
  },
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
