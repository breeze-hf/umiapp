function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  // GET POST 可省略
  'POST /api/tags': [
    {
      category_id: '1',
      category_level: '2',
      parent_id: 1,
      category_name: '测试',
      category_rank: 1,
      create_time: '2019-09-18 23:00:18',
      create_user: 'tom',
      update_time: '2019-09-18 22:55:32',
      update_user: '哈哈哈',
      is_deleted:'0'
    },
    {
      category_id: '2',
      category_level: '2',
      parent_id: 1,
      category_name: '嘎嘎嘎',
      category_rank: 1,
      create_time: '2019-09-18 23:00:18',
      create_user: 'tom',
      update_time: '2019-09-18 22:55:32',
      update_user: '哈哈哈',
      is_deleted:'0'
    },
    {
      category_id: '3',
      category_level: '1',
      parent_id: 1,
      category_name: '本地',
      category_rank: 1,
      create_time: '2019-09-18 23:00:18',
      create_user: 'tom',
      update_time: '2019-09-18 22:55:32',
      update_user: '哈哈哈',
      is_deleted:'0'
    },
    {
      category_id: '4',
      category_level: '1',
      parent_id: 1,
      category_name: '嘎嘎嘎',
      category_rank: 1,
      create_time: '2019-09-18 23:00:18',
      create_user: 'tom',
      update_time: '2019-09-18 22:55:32',
      update_user: '哈哈哈',
      is_deleted:'0'
    },
    {
      category_id: '5',
      category_level: '2',
      parent_id: 1,
      category_name: '嘎嘎嘎',
      category_rank: 1,
      create_time: '2019-09-18 23:00:18',
      create_user: 'tom',
      update_time: '2019-09-18 22:55:32',
      update_user: '哈哈哈',
      is_deleted:'0'
    },
    {
      category_id: '6',
      category_level: '1',
      parent_id: 1,
      category_name: '嘎嘎嘎',
      category_rank: 1,
      create_time: '2019-09-18 23:00:18',
      create_user: 'tom',
      update_time: '2019-09-18 22:55:32',
      update_user: '哈哈哈',
      is_deleted:'0'
    },
    {
      category_id: '7',
      category_level: '2',
      parent_id: 1,
      category_name: '嘎嘎嘎',
      category_rank: 1,
      create_time: '2019-09-18 23:00:18',
      create_user: 'tom',
      update_time: '2019-09-18 22:55:32',
      update_user: '哈哈哈',
      is_deleted:'0'
    },
    {
      category_id: '8',
      category_level: '1',
      parent_id: 1,
      category_name: '嘎嘎嘎',
      category_rank: 1,
      create_time: '2019-09-18 23:00:18',
      create_user: 'tom',
      update_time: '2019-09-18 22:55:32',
      update_user: '哈哈哈',
      is_deleted:'0'
    },
    {
      category_id: '9',
      category_level: '3',
      parent_id: 1,
      category_name: '嘎嘎嘎',
      category_rank: 1,
      create_time: '2019-09-18 23:00:18',
      create_user: 'tom',
      update_time: '2019-09-18 22:55:32',
      update_user: '哈哈哈',
      is_deleted:'0'
    },
    {
      category_id: '10',
      category_level: '3',
      parent_id: 1,
      category_name: '嘎嘎嘎',
      category_rank: 1,
      create_time: '2019-09-18 23:00:18',
      create_user: 'tom',
      update_time: '2019-09-18 22:55:32',
      update_user: '哈哈哈',
      is_deleted:'0'
    },
    {
      category_id: '11',
      category_level: '2',
      parent_id: 1,
      category_name: '嘎嘎嘎',
      category_rank: 1,
      create_time: '2019-09-18 23:00:18',
      create_user: 'tom',
      update_time: '2019-09-18 22:55:32',
      update_user: '哈哈哈',
      is_deleted:'0'
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
