// import { stringify } from 'querystring';
import React from 'react';
import { Redirect } from 'umi';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';

import { CurrentUser } from '@/models/user';
import PageLoading from '@/components/PageLoading';
import { getToken } from '@/utils/authority';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
  token?: string;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    // const { dispatch } = this.props;
    // if (dispatch) {
    // dispatch({
    // type: 'user/fetchCurrent',
    // });
    // }
  }

  render() {
    const { isReady } = this.state;
    const {
      children,
      loading,
      // currentUser, token
    } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = !!getToken();
    // const queryString = stringify({
    // redirect: window.location.href,
    // });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin) {
      return <Redirect to="/user/login"></Redirect>;
      // return <Redirect to={`/user/index?${queryString}`}></Redirect>;
    }
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  token: user.token,
  loading: loading.models.user,
}))(SecurityLayout);
