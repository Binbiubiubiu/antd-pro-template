import React, { FC, useMemo, useState } from 'react';
import _ from 'lodash';
import { Table } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult } from 'antd/lib/table/interface';

import { EasyProgress } from '@/easy-components';
import styles from './style.less';
import { PollInfoTableItem } from '../../data.d';

interface PollInfoTableProps {
  title: string;
  dataSource: PollInfoTableItem[];
}

const PollInfoTable: FC<PollInfoTableProps> = props => {
  const { title, dataSource } = props;

  const columns = [
    {
      title: '选项',
      dataIndex: 'option',
      sorter: true,
      width: '40%',
    },
    {
      title: '小计',
      dataIndex: 'num',
      sorter: true,
      width: 100,
    },
    {
      title: '比例',
      dataIndex: 'rate',
      className: styles['progress-cell'],
      render(text: number) {
        return <EasyProgress value={text * 100} />;
      },
    },
  ];

  const [tableData, setTableData] = useState<PollInfoTableItem[]>(dataSource);
  const total = useMemo<number>(() => dataSource.reduce((t, i) => t + i.num, 0), [dataSource]);

  const handleTableChange = (
    pagination: PaginationConfig,
    filters: Record<keyof PollInfoTableItem, string[]>,
    sorter: SorterResult<PollInfoTableItem>,
  ) => {
    const fieldName = sorter.field;

    switch (sorter.order) {
      case 'descend':
      case 'ascend':
        setTableData(
          _.orderBy<PollInfoTableItem[]>(
            dataSource,
            [fieldName],
            [sorter.order.replace('end', '') as 'asc' | 'desc'],
          ) as PollInfoTableItem[],
        );
        break;
      default:
        setTableData(dataSource);
        break;
    }
  };

  return (
    <Table<PollInfoTableItem>
      className={styles['poll-info-table']}
      rowKey="option"
      columns={columns}
      dataSource={tableData}
      pagination={false}
      title={() => title}
      footer={() => (
        <table>
          <tbody>
            <tr>
              <td style={{ width: '40%' }}>
                <strong>本题有效填写人次</strong>
              </td>
              <td style={{ paddingLeft: 16 }}>{total}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
      onChange={handleTableChange}
    />
  );
};

export default PollInfoTable;
