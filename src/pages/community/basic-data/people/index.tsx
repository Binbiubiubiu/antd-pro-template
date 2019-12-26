import React, { FC } from 'react';
import { Button, Col, Form, Input, Select } from 'antd';

import { ColumnProps } from 'antd/es/table';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { EasyHouseSelect } from '@/easy-components/EasySelect';
import EasySearchForm from '@/easy-components/EasySearchForm';
import EasyTable from '@/easy-components/EasyTable';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';
import { queryBasicDataPerson } from '@/pages/community/basic-data/people/service';
import { usePagableFetch } from '@/hooks/usePagableFetch';

interface PeopleTableProps {}

const PeopleTable: FC<PeopleTableProps> = () => {
  const columns: ColumnProps<PeopleTableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      render(text, record, index) {
        return index + 1;
      },
    },
    {
      title: '小区名称',
      dataIndex: 'houseName',
    },
    {
      title: '姓名',
      dataIndex: 'content1',
    },
    {
      title: '性别',
      dataIndex: 'content',
    },
    {
      title: '学历',
      dataIndex: 'type',
    },
    {
      title: '身份证',
      dataIndex: 'state',
    },
    {
      title: '手机号',
      dataIndex: 'createMan',
    },
    {
      title: '住址',
      dataIndex: 'address',
    },
    {
      title: '类型',
      dataIndex: 'type2',
    },
    {
      title: '照片',
      dataIndex: 'type3',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  ];

  const renderSearchForm = (form: WrappedFormUtils<PeopleTableSearch>) => [
    <Col key="houseId" {...GolobalSearchFormLayout}>
      <Form.Item label="所属小区">
        {form.getFieldDecorator('houseId', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col key="person" {...GolobalSearchFormLayout}>
      <Form.Item label="人口信息">
        {form.getFieldDecorator('person', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col key="type" {...GolobalSearchFormLayout}>
      <Form.Item label="类型">
        {form.getFieldDecorator('type', {
          rules: [],
        })(
          <Select placeholder="请选择">
            <Select.Option value="1">利一家园</Select.Option>
            <Select.Option value="2">望京</Select.Option>
          </Select>,
        )}
      </Form.Item>
    </Col>,
    <Col key="options" {...GolobalSearchFormLayout}>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          搜索
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
    PeopleTableItem
  >({
    request: ({ searchForm, pageIndex, pageSize: size }) =>
      queryBasicDataPerson({ ...searchForm, pageIndex, pageSize: size }),
    onSuccess: ({ res, setTableData, setTotal }) => {
      setTableData(res.data.records);
      setTotal(res.data.total);
    },
    onError: () => {
      // console.log(err);
    },
  });

  return (
    <>
      <EasySearchForm
        onSubmit={form => {
          setSearchForm(form);
          setCurrent(1);
        }}
        renderSearchFormItem={renderSearchForm}
        wrappedWithCard
      />
      <EasyTable<PeopleTableItem>
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
    </>
  );
};

export default PeopleTable;
