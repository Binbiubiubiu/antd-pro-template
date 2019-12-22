import { Button, Col, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';

import EasyTable from '@/easy-components/EasyTable';
import EasySearchForm from '@/easy-components/EasySearchForm';
import RepairForm from './components/RepairForm';
import { queryRepair } from './service';
import { usePagableFetch } from '@/hooks/usePagableFetch';

const { Option } = Select;

interface RepairTableProps extends FormComponentProps {}

const RepairTable: React.FC<RepairTableProps> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState<Partial<SuggestTableForm>>({});

  const columns: ColumnProps<SuggestTableItem>[] = [
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
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '反馈人',
      dataIndex: 'createMan',
    },
    {
      title: '反馈时间',
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
    xxl: 5,
  };

  const renderSearchForm = (form: WrappedFormUtils<SuggestTableParams>) => [
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
      <Form.Item key="type" label="状态">
        {form.getFieldDecorator('type', {
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
      <Form.Item key="type" label="类别">
        {form.getFieldDecorator('type', {
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
      <Form.Item key="content" label="反馈信息">
        {form.getFieldDecorator('content', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col {...searchFormItemLayout} xxl={4}>
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
    SuggestTableItem
  >({
    request: ({ searchForm, pageIndex, pageSize: size }) =>
      queryRepair({ ...searchForm, pageIndex, pageSize: size }),
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
      <EasyTable<SuggestTableItem>
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
      <RepairForm
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

export default RepairTable;
