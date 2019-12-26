import React from 'react';
import { Button, Col, Form, Input } from 'antd';

import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { WrappedFormUtils } from 'antd/es/form/Form';
import { EasyHouseSelect } from '@/easy-components/EasySelect';
import EasySearchForm from '@/easy-components/EasySearchForm';
import EasyTable from '@/easy-components/EasyTable';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';
import { queryVillage } from './service';
import { usePagableFetch } from '@/hooks/usePagableFetch';

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
      dataIndex: 'housePhone',
    },
    {
      title: '负责人',
      dataIndex: 'manager',
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
    },
  ];

  const renderSearchForm = (form: WrappedFormUtils<VillageTableSearch>) => [
    <Col {...GolobalSearchFormLayout}>
      <Form.Item key="houseId" label="所属小区">
        {form.getFieldDecorator('houseId', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col {...GolobalSearchFormLayout}>
      <Form.Item key="person" label="人员信息">
        {form.getFieldDecorator('person', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col {...GolobalSearchFormLayout}>
      <Form.Item key="options">
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
