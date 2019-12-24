import React from 'react';
import classNames from 'classnames';
import { Card, Table } from 'antd';
import { TableProps } from 'antd/es/table';
import { GolobalPaginationSetting } from '../GlobalSetting';

import styles from './style.less';

interface EasyTableProps<T> extends TableProps<T> {
  wrappedWithCard?: boolean;
}

function EasyTable<T = any>(props: EasyTableProps<T>) {
  const { pagination, wrappedWithCard, className, ...rest } = props;

  let renderResult = (
    <Table<T>
      className={classNames(styles['easy-table'], className)}
      pagination={{
        ...GolobalPaginationSetting,
        ...pagination,
      }}
      scroll={{ x: true }}
      {...rest}
    />
  );

  if (wrappedWithCard) {
    renderResult = (
      <Card bordered={false} style={{ marginBottom: 24 }}>
        {renderResult}
      </Card>
    );
  }

  return renderResult;
}

export default EasyTable;
