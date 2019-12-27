import React, { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Select } from 'antd';

import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { EasySearchForm, EasyTable } from '@/easy-components';
import SuggestForm from './components/SuggestForm';
import { querySuggestion } from './service';
import { usePagableFetch } from '@/hooks';
import { SuggestTableForm, SuggestTableItem, SuggestTableSearch } from './data.d';

const { Option } = Select;

interface SuggestTableProps extends FormComponentProps {}

const SuggestTable: React.FC<SuggestTableProps> = () => {
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
      width: 150,
      fixed: 'right',
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

  const renderSearchForm = (form: WrappedFormUtils<SuggestTableSearch>) => [
    <Col key="houseId" {...searchFormItemLayout}>
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
    <Col key="type" {...searchFormItemLayout}>
      <Form.Item label="类型">
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
    <Col key="createTime" {...searchFormItemLayout}>
      <Form.Item label="反馈时间">
        {form.getFieldDecorator('createTime', {
          rules: [],
        })(<DatePicker placeholder="请选择" style={{ width: '100%' }} showTime />)}
      </Form.Item>
    </Col>,
    <Col key="content" md={12} xl={12}>
      <Form.Item label="反馈信息">
        {form.getFieldDecorator('content', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col key="options" {...searchFormItemLayout}>
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
    SuggestTableItem
  >({
    request: ({ searchForm, pageIndex, pageSize: size }) =>
      querySuggestion({ ...searchForm, pageIndex, pageSize: size }),
    onSuccess: ({ res, setTableData, setTotal }) => {
      setTableData(res.data.records);
      setTotal(res.data.total);
    },
    onError: () => {
      // console.log(err);
    },
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
      <SuggestForm
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

export default SuggestTable;
