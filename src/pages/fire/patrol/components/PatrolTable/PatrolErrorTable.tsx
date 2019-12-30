import React, { FC } from 'react';

import { ColumnProps } from 'antd/es/table';
import { EasyTable } from '@/easy-components';
import { queryPatrolPerson } from '../../service';
import { usePagableFetch } from '@/hooks';
import { PatrolError } from '../../data.d';

interface PatrolErrorTableProps {}

const PatrolErrorTable: FC<PatrolErrorTableProps> = () => {
  const { tableData, current, pageSize, total, setCurrent } = usePagableFetch<PatrolError>({
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

  const columns: ColumnProps<PatrolError>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      render(text, record, index) {
        return index + 1;
      },
    },
    {
      title: '小区',
      dataIndex: 'houseName',
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
    },
    {
      title: '路线',
      dataIndex: 'line',
    },
    {
      title: '巡更员',
      dataIndex: 'patrolPeople',
    },
    {
      title: '异常上报时间',
      dataIndex: 'happenTime',
    },
  ];

  return (
    <EasyTable<PatrolError>
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

export default PatrolErrorTable;
