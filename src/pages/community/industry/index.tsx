import React, { useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Select, Divider } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';
import { WrappedFormUtils } from 'antd/es/form/Form';

import EasyTable from '@/easy-components/EasyTable';
import EasySearchForm from '@/easy-components/EasySearchForm';
import IndustryForm from './components/IndustryForm';
import { queryIndustry } from './service';
import { usePagableFetch } from '@/hooks/usePagableFetch';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';

const { Option } = Select;

interface IndustryTableProps extends FormComponentProps {}

const IndustryTable: React.FC<IndustryTableProps> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState<Partial<IndustryTableForm>>({});

  const columns: ColumnProps<IndustryTableItem>[] = [
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
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '身份证号码',
      dataIndex: 'code',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
    },
    {
      title: '当选职务',
      dataIndex: 'job',
    },
    {
      title: '当选票数',
      dataIndex: 'job',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleModalVisible(true);
              setStepFormValues(record);
            }}
          >
            删除
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
        </>
      ),
    },
  ];

  const renderSearchForm = (form: WrappedFormUtils<IndustryTableSearch>) => [
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
      <Form.Item label="人员信息">
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
    IndustryTableItem
  >({
    request: ({ searchForm, pageIndex, pageSize: size }) =>
      queryIndustry({ ...searchForm, pageIndex, pageSize: size }),
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
      <Card bordered={false}>
        <Row style={{ marginBottom: 16 }}>
          <Col>
            <Button
              icon="plus"
              type="primary"
              onClick={() => {
                handleModalVisible(true);
                setStepFormValues({});
              }}
            >
              新建
            </Button>
          </Col>
        </Row>
        <EasyTable<IndustryTableItem>
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
        />
      </Card>
      <IndustryForm
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

export default IndustryTable;
