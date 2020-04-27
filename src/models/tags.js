import { query, save, toDelete, findOne, update, listForSelect } from '@/services/tags';
import { message, } from 'antd';

const formData = {
  categoryLevel: '',
  parentId: '',
  categoryName: '',
  categoryRank: '',
};

const tagsModel = {
  namespace: 'tagsModel',
  state: {
    addModalTitle: '',
    addModalVisible: false,
    formData,
    categoryLevel: '1',
    parentId: '0',
    editId: '',
    dataSource: [],
    resultCount: 0,
    page: 1,
    limit: 10,
    isDisabled:true,
    categoryId:'',
    categoryName:''
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        if (pathname === '/goodsManage/tags') {
          dispatch({
            type: 'fetch',
            payload: {
              page: 1,
              limit: 10,
              categoryLevel: '1',
              parentId: '0',
            },
          })
        }
      });
    },
  },
  effects: {
    *fetch(_, { call, put }) {
      const { categoryLevel, parentId ,categoryId} = _.payload
      const response = yield call(query, _.payload)
      yield put({
        type: 'updateState',
        payload: {
          dataSource: response.data.list,
          resultCount: response.data.totalCount,
          categoryLevel,
          parentId,
          categoryId
        }
      })
    },
    // 新增
    *save({ payload }, { call, put, select }) {
      const state = yield select(state => state.tagsModel);
      const ret = yield call(save, payload);
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
          categoryLevel: state.categoryLevel,
          parentId: state.parentId,
          categoryId:state.categoryId
        },
      });
    },
    // 回显
    *findOne({ payload, }, { call, put, select, }) {
      const state = yield select(state => state.tagsModel);
      const ret = yield call(findOne, payload);
      yield put({
        type: 'updateState',
        payload: {
          addModalTitle: '编辑分类',
          addModalVisible: true,
          formData: ret.data,
          editId: ret.data.categoryId
        }
      })
    },
    // 更新
    *update({ payload, }, { call, put, select, }) {
      const state = yield select(state => state.tagsModel);
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
          categoryLevel: state.categoryLevel,
          parentId: state.parentId,
          categoryId:state.categoryId
        },
      });
    },
    // 删除
    *toDelete({ payload, }, { call, put, select, }) {
      const state = yield select(state => state.tagsModel);
      const ret = yield call(toDelete, payload);
      if (ret && ret.resultCode == '200') {
        yield put({
          type: 'fetch',
          payload: {
            page: state.page,
            limit: state.limit,
            categoryLevel: state.categoryLevel,
            parentId: state.parentId,
            categoryId:state.categoryId
          },
        });
      } else {
        message.error((ret && ret.message));
      }
    },
    // 分页
    *pageChange({ payload, }, { select, put, }) {
      const { page, limit, categoryLevel, parentId } = payload;
      const state = yield select(state => state.tagsModel);
      yield put({
        type: 'fetch',
        payload: {
          page,
          limit,
          categoryLevel,
          parentId,
          categoryName:state.categoryName
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
export default tagsModel;
