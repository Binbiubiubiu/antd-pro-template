/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React, { useEffect, useState } from 'react';
import ProLayout, {
  DefaultFooter,
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';

import { Dispatch } from 'redux';
import Link from 'umi/link';
// import {Result, Button} from 'antd';
// import Authorized from '@/utils/Authorized';
import { connect } from 'dva';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { getSysUserAuthList } from '@/services/menu';
// import {getAuthorityFromRouter} from '@/utils/utils';
import logo from '../assets/logo.svg';

// const noMatch = (
// <Result
// status="403"
// title="403"
// subTitle="抱歉，你无权访问该页面。"
// extra={
// <Button type="primary">
// <Link to="/user/index">前往登录页</Link>
// </Button>
// }
// />
// );

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

// const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
//   menuList.map(item => {
//     const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
//     return Authorized.check(item.authority, localItem, null) as MenuDataItem;
//   });

export const defaultFooterDom = (
  <DefaultFooter copyright="2020 浙江微天下信息科技股份有限公司出品" links={false} />
);

const footerRender: BasicLayoutProps['footerRender'] = () => defaultFooterDom;

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    dispatch,
    children,
    settings,
    // location = {
    // pathname: '/',
    // },
  } = props;
  /**
   * constructor
   */

  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getSysUserAuthList().then(res => {
      const { data = [] } = res;
      setMenuData(data);
    });
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  // const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
  // authority: undefined,
  // };
  return (
    <>
      <ProLayout
        logo={logo}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={footerRender}
        menuDataRender={() => menuData}
        // menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        fixedHeader
        {...props}
        {...settings}
      >
        {/* <Authorized authority={authorized!.authority} noMatch={noMatch}> */}
        {children}
        {/* </Authorized> */}
      </ProLayout>
      {/* <SettingDrawer */}
      {/* settings={settings} */}
      {/* onSettingChange={config => */}
      {/* dispatch({ */}
      {/* type: 'settings/changeSetting', */}
      {/* payload: config, */}
      {/* }) */}
      {/* } */}
      {/* /> */}
    </>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
