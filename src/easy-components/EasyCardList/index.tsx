import React from 'react';
import { List, Pagination } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { ListProps } from 'antd/es/list';
import { PaginationProps } from 'antd/lib/pagination/Pagination';
import defaultPaginationSetting from '../GlobalPaginationSetting';

import styles from './style.less';

interface EasyCardListProps<T> extends ListProps<T> {
  pagination: PaginationProps;
}

function EasyCardList<T = any>(props: EasyCardListProps<T>) {
  const { pagination, className, ...rest } = props;

  const renderResult = (
    <GridContent className={styles['easy-card-list']}>
      <List<T> grid={{ gutter: 24, xl: 4, lg: 2, md: 2, sm: 2, xs: 1 }} {...rest} />
      <Pagination {...Object.assign({}, defaultPaginationSetting, pagination)} />
    </GridContent>
  );

  return renderResult;
}

export default EasyCardList;
