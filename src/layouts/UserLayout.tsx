// import SelectLang from '@/components/SelectLang';
import React from 'react';
import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';

import { Helmet } from 'react-helmet';
import Link from 'umi/link';

import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import { defaultFooterDom } from '@/layouts/BasicLayout';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        {/* <div className={styles.lang}> */}
        {/* <SelectLang /> */}
        {/* </div> */}
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>{process.env.WEBSITE_NAME}</span>
              </Link>
            </div>
            <div className={styles.desc}> </div>
          </div>
          {children}
        </div>
        {defaultFooterDom}
      </div>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
