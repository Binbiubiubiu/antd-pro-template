import { Button, Col, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';

import EasyTable from '@/easy-components/EasyTable';
import VillageForm from './components/VillageForm';
import { queryVillage } from './service';
import EasySearchForm from '@/easy-components/EasySearchForm';
import { usePagableFetch } from '@/hooks/usePagableFetch';

const { Option } = Select;

interface VillageTableProps extends FormComponentProps {}

const VillageTable: React.FC<VillageTableProps> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState<Partial<VillageTableForm>>({});

  const columns: ColumnProps<VillageTableItem>[] = [
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
      title: '地址',
      dataIndex: 'content',
    },
    {
      title: '物业电话',
      dataIndex: 'type',
    },
    {
      title: '反馈人',
      dataIndex: 'state',
    },
    {
      title: '联系方式',
      dataIndex: 'createMan',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => (
        <a
          onClick={() => {
            handleModalVisible(true);
            setStepFormValues(record);
          }}
        >
          详情
        </a>
      ),
    },
  ];

  const searchFormItemLayout = {
    md: 12,
    xl: 8,
    xxl: 6,
  };

  const renderSearchForm = (form: WrappedFormUtils<VillageTableParams>) => [
    <Col {...searchFormItemLayout}>
      <Form.Item key="houseId" label="所属小区">
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
    <Col {...searchFormItemLayout}>
      <Form.Item key="person" label="人员信息">
        {form.getFieldDecorator('person', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col {...searchFormItemLayout}>
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
      <VillageForm
        onSubmit={async () => {
          handleModalVisible(false);
          setStepFormValues({});
        }}
        onCancel={() => {
          handleModalVisible(false);
          setStepFormValues({});
        }}
        modalVisible={modalVisible}
        formVals={stepFormValues}
      />
    </PageHeaderWrapper>
  );
};

export default VillageTable;
