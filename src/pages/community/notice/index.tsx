import { Button, Card, Col, DatePicker, Divider, Form, Input, Row, Select } from 'antd';
import React from 'react';
import router from 'umi/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';

import EasyTable from '@/easy-components/EasyTable';
import EasySearchForm from '@/easy-components/EasySearchForm';
import { queryNotice } from './service';
import { usePagableFetch } from '@/hooks/usePagableFetch';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';

const { Option } = Select;

interface NoticeTableProps extends FormComponentProps {}

const NoticeTable: React.FC<NoticeTableProps> = () => {
  const renderSearchForm = (form: WrappedFormUtils<NoticeTableSearch>) => [
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
      <Form.Item label="公告标题">
        {form.getFieldDecorator('content', {
          rules: [],
        })(<Input placeholder="姓名/手机号" />)}
      </Form.Item>
    </Col>,
    <Col key="time" {...GolobalSearchFormLayout}>
      <Form.Item label="发布时间">
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

  const columns: ColumnProps<NoticeTableItem>[] = [
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
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <>
          <a onClick={() => {}}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => {}}>编辑</a>
        </>
      ),
    },
  ];

  const { tableData, current, pageSize, total, setCurrent, setSearchForm } = usePagableFetch<
    NoticeTableItem
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
      <Card bordered={false}>
        <Row style={{ marginBottom: 16 }}>
          <Col>
            <Button
              icon="plus"
              type="primary"
              onClick={() => {
                router.push('/community/notice/form');
              }}
            >
              新建
            </Button>
          </Col>
        </Row>
        <EasyTable<NoticeTableItem>
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
    </PageHeaderWrapper>
  );
};

export default NoticeTable;
