import React from 'react';
import { Button, Col, Form, Input } from 'antd';

import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { WrappedFormUtils } from 'antd/es/form/Form';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';
import EasyTable from '@/easy-components/EasyTable';
import EasySearchForm from '@/easy-components/EasySearchForm';
import { queryLog } from './service';
import { usePagableFetch } from '@/hooks';

interface LogTableListProps extends FormComponentProps {}

const LogTableList: React.FC<LogTableListProps> = () => {
  const {
    loading,
    tableData,
    current,
    pageSize,
    total,
    setCurrent,
    setSearchForm,
  } = usePagableFetch<LogTableItem>({
    request: ({ searchForm, pageIndex, pageSize: size }) =>
      queryLog({ ...searchForm, pageIndex, pageSize: size }),
    onSuccess: ({ res, setTableData, setTotal }) => {
      setTableData(res.data.records);
      setTotal(res.data.total);
    },
    onError: () => {},
  });

  const renderSearchForm = (form: WrappedFormUtils<UserTableParams>) => [
    <Col key="param" {...GolobalSearchFormLayout}>
      <Form.Item key="param" label="搜索">
        {form.getFieldDecorator('param', {
          rules: [],
        })(<Input placeholder="操作人/操作接口/操作说明" type="text" />)}
      </Form.Item>
    </Col>,
    <Col key="options" {...GolobalSearchFormLayout}>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button
          onClick={() => {
            form.resetFields();
          }}
          style={{ marginLeft: 8 }}
        >
          重置
        </Button>
      </Form.Item>
    </Col>,
  ];

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
      <EasySearchForm
        onSubmit={form => {
          setSearchForm(form);
          setCurrent(1);
        }}
        renderSearchFormItem={renderSearchForm}
        wrappedWithCard
      />
      <EasyTable<LogTableItem>
        loading={loading}
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        pagination={{
          current,
          pageSize,
          total,
          onChange(index) {
            setCurrent(index);
          },
        }}
        wrappedWithCard
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<LogTableListProps>()(LogTableList);
