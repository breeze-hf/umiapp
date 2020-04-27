function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  // GET POST 可省略
  'POST /api/vip': [
    {
      userId: '15688187285093534',
      nickName: 'breeze',
      loginName: 15207901724,
      introduceSign: '你好啊',
      address: '北京市东城区2号楼',
      lockedFlag:1,
    },
    {
      userId: '15688187285093508',
      nickName: 'breeze',
      loginName: 15207901724,
      introduceSign: '你好啊',
      address: '北京市东城区2号楼',
      lockedFlag:0,
    },
    {
      userId: '15688187285093507',
      nickName: 'breeze',
      loginName: 15207901724,
      introduceSign: '你好啊',
      address: '北京市东城区2号楼',
      lockedFlag:1,
    },
    {
      userId: '15688183335093508',
      nickName: 'breeze',
      loginName: 15207901724,
      introduceSign: '你好啊',
      address: '北京市东城区2号楼',
      lockedFlag:1,
    },
    {
      userId: '15688187285091508',
      nickName: 'breezeh',
      loginName: 15207901724,
      introduceSign: '你好啊',
      address: '北京市东城区2号楼',
      lockedFlag:0,
    },
    {
      userId: '15688187285091598',
      nickName: 'breezeh',
      loginName: 15207901724,
      introduceSign: '你好啊',
      address: '北京市东城区2号楼',
      lockedFlag:1,
    },
    {
      userId: '15678187285091508',
      nickName: 'breezeh',
      loginName: 15207901724,
      introduceSign: '你好啊',
      address: '北京市东城区2号楼',
      lockedFlag:0,
    },
    {
      userId: '19988187285091508',
      nickName: 'breezeh',
      loginName: 15207901724,
      introduceSign: '你好啊',
      address: '北京市东城区2号楼',
      lockedFlag:1,
    },
    {
      userId: '15688187825091508',
      nickName: 'breezeh',
      loginName: 15207901724,
      introduceSign: '你好啊',
      address: '北京市东城区2号楼',
      lockedFlag:0,
    },
    {
      userId: '15685557825091508',
      nickName: 'breezeh',
      loginName: 15207901724,
      introduceSign: '你好啊',
      address: '北京市东城区2号楼',
      lockedFlag:1,
    },
    {
      userId: '15688187826091508',
      nickName: 'breezeh',
      loginName: 15207901724,
      introduceSign: '你好啊',
      address: '北京市东城区2号楼',
      lockedFlag:0,
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
