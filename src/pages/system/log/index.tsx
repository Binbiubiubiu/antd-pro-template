import { Card, Form, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ColumnProps } from 'antd/es/table';
import { queryLog } from './service';
import { LogTableItem } from '@/pages/system/log/data';
import LogSearch from '@/pages/system/log/components/LogSearch';
import { defaultPaginationSetting } from '@/easy-components/EasyTable';

interface LogTableListProps extends FormComponentProps {}

const LogTableList: React.FC<LogTableListProps> = () => {
  const [userData, setUserData] = useState<LogTableItem[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize /* setPageSize */] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const [searchText, setSearchText] = useState<string>('');

  const refreshUserTable = () => {
    queryLog({
      pageIndex,
      pageSize,
      param: searchText,
    }).then(res => {
      const { records, total: totalNum } = res.data;
      setUserData(records);
      setTotal(totalNum);
    });
  };

  useEffect(() => {
    refreshUserTable();
  }, []);

  useEffect(() => {
    refreshUserTable();
  }, [pageIndex, searchText]);

  const columns: ColumnProps<LogTableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      render(text, record, index) {
        return index + 1;
      },
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: 'IP',
      dataIndex: 'operIp',
    },
    {
      title: '操作接口',
      dataIndex: 'operInter',
    },
    {
      title: '操作说明',
      dataIndex: 'operDesc',
    },
    {
      title: '说明时间',
      dataIndex: 'newCreateTime',
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <LogSearch
          onSubmit={fieldsValue => {
            setSearchText(fieldsValue.param);
            setPageIndex(1);
          }}
        />
      </Card>
      <Card bordered={false}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={userData}
          pagination={{
            current: pageIndex,
            pageSize,
            total,
            ...defaultPaginationSetting,
          }}
          onChange={({ current }) => {
            setPageIndex(current!);
          }}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default Form.create<LogTableListProps>()(LogTableList);
