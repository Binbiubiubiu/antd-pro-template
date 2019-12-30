import React, { FC } from 'react';

import { ColumnProps } from 'antd/es/table';
import { EasyTable } from '@/easy-components';
import { queryPatrolPerson } from '../../service';
import { usePagableFetch } from '@/hooks';
import { PatrolPoint } from '../../data.d';

interface PatrolPointTableProps {}

const PatrolPointTable: FC<PatrolPointTableProps> = () => {
  const { tableData, current, pageSize, total, setCurrent } = usePagableFetch<PatrolPoint>({
    initPageSize: 5,
    request: ({ pageIndex, pageSize: size }) => queryPatrolPerson({ pageIndex, pageSize: size }),
    onSuccess: ({ res, setTableData, setTotal }) => {
      setTableData(res);
      setTotal(res.length);
    },
    onError: () => {
      // console.log(err);
    },
  });

  const columns: ColumnProps<PatrolPoint>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      render(text, record, index) {
        return index + 1;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '卡号',
      dataIndex: 'cardNo',
    },
    {
      title: '设备id',
      dataIndex: 'equipId',
    },
    {
      title: '设备地址',
      dataIndex: 'address',
    },
  ];

  return (
    <EasyTable<PatrolPoint>
      rowKey="id"
      columns={columns}
      dataSource={tableData}
      pagination={{
        current,
        total,
        pageSize,
        onChange: index => {
          setCurrent(index);
        },
      }}
    />
  );
};

export default PatrolPointTable;
