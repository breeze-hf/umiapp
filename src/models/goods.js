import { query,getCategory,addGoods,delGoods,findOne,edit } from '@/services/goods';
import { message } from 'antd';
import { toTreeData, formatRoutes } from '@/utils/utils';

const goodsInfo = {
  goodsCategory: [20],
  goodsName: '',
  goodsIntro: '',
  originalPrice: '',
  sellingPrice: '',
  stockNum: '',
  goodsSellStatus: 0,
  goodsCoverImg:'',
  goodsCarousel:[],
  goodsDetailContent:'',
}
const GoodsModel = {
  namespace: 'goods',
  state: {
    goodsId: '',
    list: [],
    category:[],
    goodsInfo: {
      ...goodsInfo
    },
    limit:10,
    total:0,
    goodsDetailContent:'',
    visible: false,
    previewVisible:false,
    previewImage: '',
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname }) => {
        if (pathname === '/goodsManage/list') {
          dispatch({
            type: 'fetch',
            payload:{
              page:1,
              limit:10
            }
          });
          dispatch({ type: 'getCategory' })
        }
      });
    },
  },
  effects: {
    *fetch(_, { call, put }) {
      const { payload } = _;
      const response = yield call(query, payload);
      const {data} = response
      yield put({
        type: 'updateState',
        payload: {
          list:data.list,
          total:data.totalCount
        },
      });
    },
    *getCategory(_, { call, put }) {
      const { payload } = _;
      const response = yield call(getCategory, payload);
      const {data} = response

      const category = data.allCategoryies

      // const category = [...data.firstLevelCategories,...data.secondLevelCategories,...data.thirdLevelCategories]
      const tree = formatRoutes(category)
      console.log('data',tree)
      yield put({
        type: 'updateState',
        payload: {
          category:tree
        },
      });
    },
    *find(_, { call, put }) {
      const { payload,callback } = _;
      const response = yield call(findOne, payload);

      const { data } = response
      const goodsOne = data.goods
      goodsOne.goodsCategory = [data.firstLevelCategoryId,data.secondLevelCategoryId,data.thirdLevelCategoryId]
      goodsOne.goodsCoverImg = [
        {
          uid: new Date().getTime,
          statue: 'done',
          url: goodsOne.goodsCoverImg,
          name:'cover'
        }
      ]
      const goodsCarousel = goodsOne.goodsCarousel.split(',')
      const temp = []
      goodsCarousel.forEach(item => {
        temp.push({
          uid: new Date().getTime(),
          status: 'done',
          url: item,
          name:'goodsCarousel'
        })
      })
      yield put({
        type: 'updateState',
        payload: {
          goodsId:payload.goodsId,
          goodsInfo: {
            ...goodsOne,
            goodsCarousel:temp
          },
          visible:true
        },
      });
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
    *add(_, { call, put }) {
      const { payload, callback } = _;
      let response = {}
      if (!payload.goodsId) {
        response = yield call(addGoods, payload);
      } else {
        response = yield call(edit, payload);
      }

      if (response.resultCode === 200) {
        yield put({
          type: 'updateState',
          payload: {
            visible:false,
          }
        });
        yield put({
          type: 'fetch',
          payload: {
            page:1,
            limit:10
          }
        });

        message.success('编辑成功');
      } else {
        message.error('编辑失败');
      }

    },
    *del(_, { call, put }) {
      const { payload,callback } = _;

      const response = yield call(delGoods, payload);
      if (response.resultCode === 200) {
        yield put({
          type: 'fetch',
          payload: {
            page:1,
            limit:10
          }
        });
        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }

    },
  },
  reducers: {
    save(state, action) {
      return { ...state, list: action.payload.list || {} };
    },
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
export default GoodsModel;
