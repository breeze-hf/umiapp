import { query, save, toDelete, update, findOne } from '@/services/adv';
import { message, } from 'antd';

const formData = {
  carouselUrl:[],
  redirectUrl: '',
  carouselRank: ''
};
const advModel = {
  namespace: 'advModel',
  state: {
    addModalVisible: false,
    addModalTitle: '',
    formData,
    editId: '',
    previewVisible: false,
    previewImage: '',
    dataSource: [],
    resultCount: 0,
    page: 1,
    limit: 10,
    loading: false,
    carouselId:''
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        if (pathname === '/Operation/advManage') {
          dispatch({
            type: 'fetch',
            payload: {
              page: 1,
              limit: 10,
            },
          })
        }
      });
    },
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(query, _.payload)
      yield put({
        type: 'updateState',
        payload: {
          dataSource: response.data.list,
          resultCount: response.data.totalCount,
        }
      })
    },
    // 新增
    *save(_, { call, put, select, }) {
      const state = yield select(state => state.advModel);
      const ret = yield call(save, _.payload);
      yield put({
        type: 'fetch',
        payload: {
          page: state.page,
          limit: state.limit,
        },
      });
      yield put({
        type: 'updateState',
        payload: {
          addModalVisible: false,
        },
      });
    },
    // 删除
    *toDelete(_, { call, put, select, }) {
      const state = yield select(state => state.advModel);
      const ret = yield call(toDelete, _.payload);
      yield put({
        type: 'fetch',
        payload: {
          page: state.page,
          limit: state.limit,
        },
      });
    },
    // 编辑/回显
    *findOne({ payload }, { call, put }) {
      const ret = yield call(findOne, payload);
      const carouselOne=ret.data
      const carouselUrl = carouselOne.carouselUrl.split(',')
      const temp = []
      carouselUrl.forEach(item => {
        temp.push({
          uid: new Date().getTime(),
          status: 'done',
          url: item,
          name:'carouselUrl'
        })
      })
      yield put({
        type: 'updateState',
        payload: {
          addModalTitle: '编辑广告',
          addModalVisible: true,
          formData:{
            ...carouselOne,
            carouselUrl:temp
          },
          editId: ret.data.carouselId
        },
      });
    },
    // 更新
    *update(_, { call, put, select, }) {
      const state = yield select(state => state.advModel);
      const ret = yield call(update, _.payload);
      yield put({
        type: 'updateState',
        payload: {
          addModalVisible: false,
        },
      });
      yield put({
        type: 'fetch',
        payload: {
          page: state.page,
          limit: state.limit,
        },
      });
    },

    // 分页
    *pageChange({ payload, }, { select, put, }) {
      const { page, limit } = payload;
      const state = yield select(state => state.advModel);
      yield put({
        type: 'fetch',
        payload: {
          page,
          limit,
          carouselId:state.carouselId
        },
      });
      yield put({
        type: 'updateState',
        payload: {
          page,
          limit,
        }
      })
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload, };
    },
  },
};
export default advModel;
