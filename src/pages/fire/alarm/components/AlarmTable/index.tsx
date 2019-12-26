import React, { FC } from 'react';
import moment from 'moment';
import { ColumnProps } from 'antd/es/table';
import EasyTable from '@/easy-components/EasyTable';
import { usePagableFetch } from '@/hooks/usePagableFetch';
import { queryAlarm } from '@/pages/fire/alarm/service';

interface AlarmTableProps {}

const AlarmTable: FC<AlarmTableProps> = () => {
  const { loading, tableData, current, pageSize, total, setCurrent } = usePagableFetch<
    AlarmTableItem
  >({
    initPageSize: 5,
    request: ({ pageIndex, pageSize: size }) => queryAlarm({ pageIndex, pageSize: size }),
    onSuccess: ({ res, setTableData, setTotal }) => {
      setTableData(res.data.records || []);
      setTotal(res.length);
    },
    onError: () => {
      // console.log(err);
    },
  });

  const columns: ColumnProps<AlarmTableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      render(text, record, index) {
        return index + 1;
      },
    },
    {
      title: '小区',
      dataIndex: 'houseName',
    },
    {
      title: '报警状态',
      dataIndex: 'confirmStatus',
      render(text) {
        return ['预警', '报警', '忽略'][text];
      },
    },
    {
      title: '设备类型',
      dataIndex: 'deviceTypeName',
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '设备地址',
      dataIndex: 'position',
    },
    {
      title: '最近报警时间',
      dataIndex: 'productTime',
      render(text) {
        return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '';
      },
    },
    {
      title: '处理时间',
      dataIndex: 'confirmTime',
      render(text) {
        return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '';
      },
    },
  ];

  return (
    <EasyTable<AlarmTableItem>
      loading={loading}
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

export default AlarmTable;
