import Mock from 'mockjs';

const data = Mock.mock({
  'items|30': [
    {
      goodsId: '@id',
      goodsName: '@word',
      goodsIntro: '@cparagraph(1, 1)',
      goodsCoverImg: "@image('50x50')",
      sellingPrice: '@float(60, 100, 2, 2)',
      stockNum: '@integer(60, 100)',
      'goodsSellStatus|1': [0, 1],
      createTime: '@now',
    },
  ],
});
const category = {
  value: 1,
  label: '家电 数码 手机',
  children: [
    {
      value: 2,
      label: '家电',
      children: [
        {
          value: 3,
          label: '生活电器',
        },
      ],
    },
  ],
};
export default {
  // 支持值为 Object 和 Array
  // GET POST 可省略
  'POST /api/goods': (req, res) => {
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
  'POST /api/category': (req, res) => {
    const result = [category];
    res.send({
      status: 'ok',
      data: result,
    });
  },
  'POST /api/upload': (req, res) => {
    res.send({
      status: 'ok',
      data: {
        'url':'https://img2.epetbar.com/common/upload/commonfile/2020/03/05/170456_66590.jpg@!water'
      },
    });
  },
  'POST /api/goods/add': (req, res) => {
    res.send({
      status: 'ok',
      data: {

      },
    });
  },
  'POST /api/goods/del': (req, res) => {
    res.send({
      status: 'ok',
      data: {

      },
    });
  },
  'POST /api/goods/findOne': (req, res) => {
    const goods = Mock.mock({
      goodsId: '@id',
      goodsCategory: [1, 2, 3],
      goodsName: '@word',
      goodsIntro: '@cparagraph(1, 1)',
      goodsCoverImg: "@image('350x350')",
      'goodsCarousel': "@image('350x350')",
      originalPrice: '@float(60, 100, 2, 2)',
      sellingPrice: '@float(60, 100, 2, 2)',
      stockNum: '@integer(60, 100)',
      'goodsSellStatus|1': [0, 1],
      createTime: '@now',
      goodsDetailContent:'<p>123123</p>'
    },);
    res.send({
      status: 'ok',
      data: goods,
    });
  },

};
