import React, { FC } from 'react';
import { Button, Col, Form, Input, Select } from 'antd';

import { ColumnProps } from 'antd/es/table';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { EasyHouseSelect } from '@/easy-components/EasySelect';
import EasySearchForm from '@/easy-components/EasySearchForm';
import EasyTable from '@/easy-components/EasyTable';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';
import { queryBasicDataPerson } from './service';
import { usePagableFetch } from '@/hooks';

interface CarTableProps {}

const CarTable: FC<CarTableProps> = () => {
  const columns: ColumnProps<CarTableItem>[] = [
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
      title: '车主姓名',
      dataIndex: 'ownerName',
    },
    {
      title: '车牌号',
      dataIndex: 'carCode',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  ];

  const renderSearchForm = (form: WrappedFormUtils<CarTableSearch>) => [
    <Col key="houseKey" {...GolobalSearchFormLayout}>
      <Form.Item label="所属小区">
        {form.getFieldDecorator('houseKey', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col key="carCode" {...GolobalSearchFormLayout}>
      <Form.Item label="车牌号码">
        {form.getFieldDecorator('carCode', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col key="ownerName" {...GolobalSearchFormLayout}>
      <Form.Item label="车主姓名">
        {form.getFieldDecorator('ownerName', {
          rules: [],
        })(<Input placeholder="请输入" />)}
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
    CarTableItem
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
      <EasyTable<CarTableItem>
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

export default CarTable;
