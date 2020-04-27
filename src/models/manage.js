import { query as queryUsers, update, editManage, deleteAdmin } from '@/services/manage';
import { message } from 'antd';

const formData = {
  adminUserId:'',
  loginUserName: '',
  loginPassword: '',
  nickName: '',
  locked: 0,
};
const UserModel = {
  namespace: 'manage',
  adminUserId: '',
  state: {
    list: [],
    page:1,
    limit:10,
    total:0,
    visible: false,
    loading: true,
    formData,
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname }) => {
        if (pathname === '/manage/list') {
          dispatch(
            {
              type: 'fetch',
              payload:{
                page:1,
                limit:10
              }

            }
          );
        }
      });
    },
  },
  effects: {
    *fetch(_, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          loading:true
        },
      });
      const { payload } = _;
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'updateState',
        payload: {
          list:response.data.list,
          total:response.data.totalCount,
          loading:false
        },
      });
    },

    *add({ payload }, { call, put }) {
      const res = yield call(editManage, payload);
      if (res.resultCode === 200) {

        yield put({
          type: 'fetch',
          payload: {
            page:1,
            limit:10
          },
        });
        yield put({
          type: 'updateState',
          payload: {
            visible: false,
            formData,
          },
        });
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    },
    *edit({ payload }, { call, put }) {
      const res = yield call(update, payload);
      if (res.resultCode === 200) {
        yield put({
          type: 'fetch',
          payload: {
            page:1,
            limit:10
          },
        });
        yield put({
          type: 'updateState',
          payload: {
            visible: false,
          },
        });
        message.success('编辑成功');
      } else {
        message.error('编辑失败');
      }
    },
    *del({ payload }, { call, put }){
      const { adminUserId } = payload
      console.log(adminUserId)
      const params = {
        ids:adminUserId
      }
      const res = yield call(deleteAdmin, params);
      if (res.resultCode === 200) {
        yield put({
          type: 'fetch',
          payload: {
            page:1,
            limit:10
          },
        });
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    },
    *find({ payload }, { call, put }) {
      const res = yield call(findOne, payload);
      if (res.status === 'ok') {
        yield put({
          type: 'updateState',
          payload: {
            visible: true,
            formData: res.data,
          },
        });
      } else {
        message.error('获取数据失败');
      }
    },

  },
  reducers: {
    save(state, action) {
      return { ...state, list: action.payload || {} };
    },
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
export default UserModel;
