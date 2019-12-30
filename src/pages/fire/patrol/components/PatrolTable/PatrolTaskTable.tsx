import React, { FC } from 'react';

import { ColumnProps } from 'antd/es/table';
import { EasyTable } from '@/easy-components';
import { queryPatrolPerson } from '../../service';
import { usePagableFetch } from '@/hooks';
import { PatrolTask } from '../../data.d';

interface PatrolTaskTableProps {}

const PatrolTaskTable: FC<PatrolTaskTableProps> = () => {
  const { tableData, current, pageSize, total, setCurrent } = usePagableFetch<PatrolTask>({
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

  const columns: ColumnProps<PatrolTask>[] = [
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
      title: '模式',
      dataIndex: 'mode',
    },
  ];

  return (
    <EasyTable<PatrolTask>
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

export default PatrolTaskTable;
