import { Effect } from 'dva';
import { Reducer } from 'redux';
import router from 'umi/router';
import { login } from '@/services/login';
// import { stringify } from 'querystring';
import { removeToken, setAuthority } from '@/utils/authority';

// import { getPageQuery } from '@/utils/utils';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    // getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'user/saveToken',
        payload: response.data.token,
      });
      // Login successfully
      if (response.code === 200) {
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params as { redirect: string };
        // if (redirect) {
        // const redirectUrlParams = new URL(redirect);
        // if (redirectUrlParams.origin === urlParams.origin) {
        // redirect = redirect.substr(urlParams.origin.length);
        // if (redirect.match(/^\/.*#/)) {
        // redirect = redirect.substr(redirect.indexOf('#') + 1);
        // }
        // } else {
        // window.location.href = '/';
        // return;
        // }
        // }
        // router.replace(redirect || '/');
        router.replace('/');
      }
    },

    //* getCaptcha({ payload }, { call }) {
    // yield call(getFakeCaptcha, payload);
    // },

    logout() {
      // const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      // if (window.location.pathname !== '/user/index' && !redirect) {
      removeToken();
      router.replace({
        pathname: '/user/login',
        // search: stringify({
        // redirect: window.location.href,
        // }),
      });
      // }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
