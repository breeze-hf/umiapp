import { query ,lockUser } from '@/services/vip';
import {message,} from 'antd';

const vipModel = {
  namespace: 'vipModel',
  state: {
    dataSource: [],
    resultCount: 0,
    page: 1,
    limit: 10,
    userId:''
  },
  subscriptions: {
    setup({ history,dispatch }) {
      history.listen(({ pathname }) => {
        if (pathname === '/vip') {
          dispatch({
            type:'fetch',
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
      const response = yield call(query,_.payload)
      yield put({
        type: 'updateState',
        payload: {
          dataSource: response.data.list,
          resultCount: response.data.totalCount,
        }
      })
    },
    *lockUser(_, { call, put,select}) {
      const state = yield select(state => state.vipModel);
      const response = yield call(lockUser,_.payload)
      yield put({
        type: 'fetch',
        payload: {
          page: state.page,
          limit: state.limit
        }
      })
    },
     // 分页
     *pageChange({ payload, }, { select, put, }) {
      const {page, limit,} = payload;
      const state = yield select(state => state.vipModel);
      yield put({
        type: 'fetch',
        payload: {
          page,
          limit,
          id:state.userId
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
      return {...state, ...action.payload,};
    },
  },
};
export default vipModel;
