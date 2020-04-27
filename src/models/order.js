import { query, closeOrder, checkDone, checkOut, queryItem } from '@/services/order';
import { message, } from 'antd';

const orderModel = {
  namespace: 'orderModel',
  state: {
    dataSource: [],
    resultCount: 0,
    page: 1,
    limit: 10,
    detailVisible: false,
    detailData: [],
    orderNo: '',
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        if (pathname === '/order') {
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
    *fetch(_, { call, put, }) {
      const { page, limit, orderNo } = _.payload;
      const response = yield call(query, _.payload);
      console.log('订单ret', response)
      yield put({
        type: 'updateState',
        payload: {
          dataSource: response.data.list,
          resultCount: response.data.totalCount,
        }
      })
    },

    // 订单详情
    *queryItem(_, { call, put, select }) {
      const state = yield select(state => state.orderModel);
      const response = yield call(queryItem, _.payload)
      yield put({
        type: 'updateState',
        payload: {
          detailVisible: true,
          detailData: response.data
        }
      })
    },
    // 关闭订单
    *closeOrder(_, { call, put, select }) {
      const state = yield select(state => state.orderModel);
      const response = yield call(closeOrder, _.payload)
      yield put({
        type: 'fetch',
        payload: {
          page: state.page,
          limit: state.limit,
          orderNo: state.orderNo
        }
      })
    },
    // 配货
    *checkDone(_, { call, put, select }) {
      const state = yield select(state => state.orderModel);
      const response = yield call(checkDone, _.payload)
      yield put({
        type: 'fetch',
        payload: {
          page: state.page,
          limit: state.limit,
          orderNo: state.orderNo
        }
      })
    },
    // 出库
    *checkOut(_, { call, put, select }) {
      const state = yield select(state => state.orderModel);
      const response = yield call(checkOut, _.payload)
      yield put({
        type: 'fetch',
        payload: {
          page: state.page,
          limit: state.limit,
          orderNo: state.orderNo
        }
      })
    },
    // 分页
    *pageChange({ payload, }, { select, put, }) {
      const { page, limit, } = payload;
      const state = yield select(state => state.orderModel);
      yield put({
        type: 'fetch',
        payload: {
          page,
          limit,
          orderNo: state.orderNo
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
export default orderModel;
