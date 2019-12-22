import { Button, Col, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';

import EasyTable from '@/easy-components/EasyTable';
import BasicDataForm from './components/BasicDataForm';
import { queryVillage } from './service';
import EasySearchForm from '@/easy-components/EasySearchForm';
import { usePagableFetch } from '@/hooks/usePagableFetch';

const { Option } = Select;

interface BasicDataTableProps extends FormComponentProps {}

const BasicDataTable: React.FC<BasicDataTableProps> = () => {
  const [tabActive, setTabActive] = useState<string>('1');
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
      title: '姓名',
      dataIndex: 'content1',
    },
    {
      title: '性别',
      dataIndex: 'content',
    },
    {
      title: '学历',
      dataIndex: 'type',
    },
    {
      title: '身份证',
      dataIndex: 'state',
    },
    {
      title: '手机号',
      dataIndex: 'createMan',
    },
    {
      title: '住址',
      dataIndex: 'address',
    },
    {
      title: '类型',
      dataIndex: 'type2',
    },
    {
      title: '照片',
      dataIndex: 'type2',
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
      <Form.Item key="person" label="人口信息">
        {form.getFieldDecorator('person', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col {...searchFormItemLayout}>
      <Form.Item key="type" label="类型">
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
      <Form.Item key="options">
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
    VillageTableItem
  >({
    request: ({ searchForm, pageIndex, pageSize: size }) =>
      queryVillage({ ...searchForm, pageIndex, pageSize: size }),
    onSuccess: ({ res, setTableData, setTotal }) => {
      setTableData(res.data.records);
      setTotal(res.data.total);
    },
    onError: () => {
      // console.log(err);
    },
  });

  return (
    <PageHeaderWrapper
      tabActiveKey={tabActive}
      onTabChange={index => setTabActive(index)}
      tabList={[
        {
          key: '1',
          tab: '一人一档',
        },
        {
          key: '2',
          tab: '一车一档',
        },
        {
          key: '3',
          tab: '一屋一档',
        },
      ]}
    >
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
      <BasicDataForm
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

export default BasicDataTable;
