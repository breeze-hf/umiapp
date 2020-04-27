import { query, save, toDelete, update, findOne } from '@/services/indexConfig';
import { message, } from 'antd';

const formData = {
  configName: '',
  goodsId: '',
  configType: 4  ,
  redirectUrl: '',
  configRank: ''
};
const newModel = {
  namespace: 'newModel',
  state: {
    addModalVisible: false,
    addModalTitle: '',
    formData,
    editId: '',
    dataSource: [],
    resultCount: 0,
    page: 1,
    limit: 100,
    loading: false,
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        if (pathname === '/Operation/new') {
          dispatch({
            type: 'fetch',
            payload: {
              page: 1,
              limit: 100,
            },
          })
        }
      });
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload)
      yield put({
        type: 'updateState',
        payload: {
          dataSource: response.data.list,
          resultCount: response.data.totalCount,
        }
      })
    },
    // 新增
    *save({ payload, }, { call, put, select, }) {
      const state = yield select(state => state.newModel);
      const ret = yield call(save, payload);
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
    // 编辑/回显
    *findOne({ payload }, { call, put }) {
      const res = yield call(findOne, payload);
      yield put({
        type: 'updateState',
        payload: {
          addModalTitle: '编辑广告',
          addModalVisible: true,
          formData: res.data,
          editId: res.data.configId
        },
      });
    },
    // 更新
    *update({ payload, }, { call, put, select, }) {
      const state = yield select(state => state.newModel);
      const ret = yield call(update, payload);
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
    // 删除
    *toDelete({ payload, }, { call, put, select, }) {
      const state = yield select(state => state.newModel);
      const ret = yield call(toDelete, payload);
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
      const { page, limit, } = payload;
      const state = yield select(state => state.newModel);
      yield put({
        type: 'fetch',
        payload: {
          page,
          limit,
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
export default newModel;
