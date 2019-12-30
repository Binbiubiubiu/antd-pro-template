import React from 'react';
import { Button, Col, Form, Input } from 'antd';
import moment from 'moment';

import { ColumnProps } from 'antd/es/table';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
  EasyHouseSelect,
  EasySearchForm,
  EasyTable,
  GolobalSearchFormLayout,
} from '@/easy-components';
import { queryVillage } from './service';
import { usePagableFetch } from '@/hooks';
import { VillageTableItem, VillageTableSearch } from './data.d';

interface VillageTableProps extends FormComponentProps {}

const VillageTable: React.FC<VillageTableProps> = () => {
  const columns: ColumnProps<VillageTableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      render(text, record, index) {
        return index + 1;
      },
    },
    {
      title: '名称',
      dataIndex: 'houseName',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '物业电话',
      dataIndex: 'propertyPhone',
    },
    {
      title: '负责人',
      dataIndex: 'fireName',
    },
    {
      title: '联系方式',
      dataIndex: 'firePhone',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render(text) {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '创建人',
      dataIndex: 'createName',
    },
  ];

  const renderSearchForm = (form: WrappedFormUtils<VillageTableSearch>) => [
    <Col {...GolobalSearchFormLayout} key="houseKey">
      <Form.Item label="所属小区">
        {form.getFieldDecorator('houseKey', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col {...GolobalSearchFormLayout} key="userinfo">
      <Form.Item label="人员信息">
        {form.getFieldDecorator('userinfo', {
          rules: [],
        })(<Input placeholder="负责人/联系方式" />)}
      </Form.Item>
    </Col>,
    <Col {...GolobalSearchFormLayout} key="options">
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
    VillageTableItem
  >({
    request: ({ searchForm, pageIndex, pageSize: size }) =>
      queryVillage({ ...searchForm, pageIndex, pageSize: size }),
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
      <EasyTable<VillageTableItem>
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

export default VillageTable;
