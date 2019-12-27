import React, { FC } from 'react';
import { Button, Col, Form, Input, Select } from 'antd';
import { connect } from 'dva';

import { ColumnProps } from 'antd/es/table';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { EasyHouseSelect } from '@/easy-components/EasySelect';
import EasySearchForm from '@/easy-components/EasySearchForm';
import EasyTable from '@/easy-components/EasyTable';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';
import { queryBasicDataPerson } from '@/pages/community/basic-data/people/service';
import { usePagableFetch } from '@/hooks';
import { ConnectProps } from '@/models/connect';
import { openImagePreview } from '@/models/image-preview';

interface PeopleTableProps extends ConnectProps {}

const PeopleTable: FC<PeopleTableProps> = props => {
  const { dispatch } = props;

  const columns: ColumnProps<PeopleTableItem>[] = [
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
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render(text) {
        return text === 'MAN' ? '男' : '女';
      },
    },
    {
      title: '学历',
      dataIndex: 'education',
    },
    {
      title: '身份证',
      dataIndex: 'idcard',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '住址',
      dataIndex: 'address',
    },
    {
      title: '类型',
      dataIndex: 'householdType',
      render(text) {
        return text === 'owner' ? '业主' : '租户';
      },
    },
    {
      title: '照片',
      dataIndex: 'photo',
      width: 80,
      render(text) {
        return (
          <a
            onClick={() => {
              if (!text) {
                return;
              }
              openImagePreview(dispatch, text);
            }}
          >
            查看
          </a>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTimeString',
    },
  ];

  const renderSearchForm = (form: WrappedFormUtils<PeopleTableSearch>) => [
    <Col key="houseKey" {...GolobalSearchFormLayout}>
      <Form.Item label="所属小区">
        {form.getFieldDecorator('houseKey', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col key="userinfo" {...GolobalSearchFormLayout}>
      <Form.Item label="人口信息">
        {form.getFieldDecorator('userinfo', {
          rules: [],
        })(<Input placeholder="姓名/手机号" />)}
      </Form.Item>
    </Col>,
    <Col key="type" {...GolobalSearchFormLayout}>
      <Form.Item label="类型">
        {form.getFieldDecorator('householdType', {
          rules: [],
        })(
          <Select placeholder="请选择">
            <Select.Option value="owner">业主</Select.Option>
            <Select.Option value="lessee">租户</Select.Option>
          </Select>,
        )}
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
    PeopleTableItem
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
      <EasyTable<PeopleTableItem>
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

export default connect()(PeopleTable);
