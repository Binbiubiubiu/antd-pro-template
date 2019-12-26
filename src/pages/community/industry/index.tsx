import React, { useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, Row } from 'antd';

import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WrappedFormUtils } from 'antd/es/form/Form';
import moment from 'moment';
import { EasyHouseSelect } from '@/easy-components/EasySelect';
import EasySearchForm from '@/easy-components/EasySearchForm';
import EasyTable from '@/easy-components/EasyTable';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';
import IndustryForm from './components/IndustryForm';
import { queryIndustry } from './service';
import { usePagableFetch } from '@/hooks/usePagableFetch';

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
      dataIndex: 'uesrName',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render(text) {
        return text === 'MAN' ? '男' : '女';
      },
    },
    {
      title: '身份证号码',
      dataIndex: 'idcard',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
    },
    {
      title: '当选职务',
      dataIndex: 'duty',
    },
    {
      title: '当选票数',
      dataIndex: 'poll',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render(text) {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
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
    <Col key="houseKey" {...GolobalSearchFormLayout}>
      <Form.Item label="所属小区">
        {form.getFieldDecorator('houseKey', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col key="userinfo" {...GolobalSearchFormLayout}>
      <Form.Item label="人员信息">
        {form.getFieldDecorator('userinfo', {
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

  const {
    loading,
    tableData,
    current,
    pageSize,
    total,
    setCurrent,
    setSearchForm,
  } = usePagableFetch<IndustryTableItem>({
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
          loading={loading}
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
        formValue={stepFormValues}
      />
    </PageHeaderWrapper>
  );
};

export default IndustryTable;
