import { Button, Col, DatePicker, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';

import EasyTable from '@/easy-components/EasyTable';
import EasySearchForm from '@/easy-components/EasySearchForm';
import VisitorForm from './components/NoticeForm';
import { queryNotice } from './service';
import { usePagableFetch } from '@/hooks/usePagableFetch';

const { Option } = Select;

interface NoticeTableProps extends FormComponentProps {}

const NoticeTable: React.FC<NoticeTableProps> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState<Partial<NoticeTableForm>>({});

  const columns: ColumnProps<SuggestTableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      render(text, record, index) {
        return index + 1;
      },
    },
    {
      title: '公告标题',
      dataIndex: 'houseName',
    },
    {
      title: '接受对象',
      dataIndex: 'content',
    },
    {
      title: '浏览次数',
      dataIndex: 'type',
    },
    {
      title: '发布时间',
      dataIndex: 'state',
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
      <Form.Item key="content" label="公告标题">
        {form.getFieldDecorator('content', {
          rules: [],
        })(<Input placeholder="姓名/手机号" />)}
      </Form.Item>
    </Col>,
    <Col {...searchFormItemLayout}>
      <Form.Item key="time" label="发布时间">
        {form.getFieldDecorator('time', {
          rules: [],
        })(
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
            placeholder="请选择"
          />,
        )}
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
    SuggestTableItem
  >({
    request: ({ searchForm, pageIndex, pageSize: size }) =>
      queryNotice({ ...searchForm, pageIndex, pageSize: size }),
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
      <VisitorForm
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

export default NoticeTable;
