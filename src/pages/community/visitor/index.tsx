import { Button, Col, Form, Input, Select } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';

import EasyTable from '@/easy-components/EasyTable';
import EasySearchForm from '@/easy-components/EasySearchForm';
import { queryVisitor } from './service';
import { usePagableFetch } from '@/hooks/usePagableFetch';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';

const { Option } = Select;

interface VisitorTableProps extends FormComponentProps {}

const VisitorTable: React.FC<VisitorTableProps> = () => {
  const columns: ColumnProps<VisitorTableItem>[] = [
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
      title: '访客姓名',
      dataIndex: 'content',
    },
    {
      title: '身份证',
      dataIndex: 'type',
    },
    {
      title: '手机号',
      dataIndex: 'state',
    },
    {
      title: '被访者',
      dataIndex: 'createMan',
    },
    {
      title: '访问地址',
      dataIndex: 'createTime2',
    },
    {
      title: '来访事由',
      dataIndex: 'createTime',
    },
    {
      title: '抓拍',
      dataIndex: 'createTime3',
    },
  ];

  const renderSearchForm = (form: WrappedFormUtils<VisitorTableSearch>) => [
    <Col key="houseId" {...GolobalSearchFormLayout}>
      <Form.Item label="所属小区">
        {form.getFieldDecorator('houseId', {
          rules: [],
        })(
          <Select placeholder="请选择">
            <Option value="1">利一家园</Option>
            <Option value="2">望京</Option>
          </Select>,
        )}
      </Form.Item>
    </Col>,
    <Col key="content" {...GolobalSearchFormLayout}>
      <Form.Item label="访客信息">
        {form.getFieldDecorator('content', {
          rules: [],
        })(<Input placeholder="姓名/手机号" />)}
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

  const { tableData, current, pageSize, total, setCurrent, setSearchForm } = usePagableFetch<
    VisitorTableItem
  >({
    request: ({ searchForm, pageIndex, pageSize: size }) =>
      queryVisitor({ ...searchForm, pageIndex, pageSize: size }),
    onSuccess: ({ res, setTableData, setTotal }) => {
      setTableData(res.data.records);
      setTotal(res.data.total);
    },
    onError: () => {},
  });

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
      <EasyTable<VisitorTableItem>
        rowKey="id"
        dataSource={tableData}
        pagination={{
          current,
          pageSize,
          total,
        }}
        columns={columns}
        onChange={({ current: index }) => {
          setCurrent(index || 1);
        }}
        wrappedWithCard
      />
    </PageHeaderWrapper>
  );
};

export default VisitorTable;
