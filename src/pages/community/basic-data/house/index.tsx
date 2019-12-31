import React, { FC } from 'react';
import { Button, Col, Form, Input } from 'antd';

import { ColumnProps } from 'antd/es/table';
import { WrappedFormUtils } from 'antd/es/form/Form';
import {
  EasyHouseSelect,
  EasySearchForm,
  EasyTable,
  GolobalSearchFormLayout,
} from '@/easy-components';
import { queryBasicDataPerson } from './service';
import { usePagableFetch } from '@/hooks';
import { HouseTableItem, HouseTableSearch } from './data.d';
import moment from 'moment';

interface HouseTableProps {}

const HouseTable: FC<HouseTableProps> = () => {
  const columns: ColumnProps<HouseTableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      render(text, record, index) {
        return index + 1;
      },
    },
    {
      title: '楼幢名称',
      dataIndex: 'houseName',
    },
    {
      title: '单元名称',
      dataIndex: 'unitName',
    },
    {
      title: '房屋名称',
      dataIndex: 'roomName',
    },
    {
      title: '房屋编号',
      dataIndex: 'roomNumber',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render(text) {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];

  const renderSearchForm = (form: WrappedFormUtils<HouseTableSearch>) => [
    <Col key="houseKey" {...GolobalSearchFormLayout}>
      <Form.Item label="所属小区">
        {form.getFieldDecorator('houseKey', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col key="roomName" {...GolobalSearchFormLayout}>
      <Form.Item label="房屋信息">
        {form.getFieldDecorator('roomName', {
          rules: [],
        })(<Input placeholder="房屋名称" />)}
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
    HouseTableItem
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
      <EasyTable<HouseTableItem>
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

export default HouseTable;
