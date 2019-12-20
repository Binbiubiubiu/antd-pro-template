import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { ColumnProps } from 'antd/es/table';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import UpdateForm from './components/SuggestForm';
import GlobalPaginaitonSetting from '@/components/GloabalPaginaiton';
import { querySuggestion } from '@/pages/community/suggestion/service';

const { Option } = Select;

interface SuggestionTableListProps extends FormComponentProps {}

const TableList: React.FC<SuggestionTableListProps> = props => {
  const { form } = props;

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const [tableData, setTableData] = useState<SuggestionTableItem[]>([]);
  const [pageIndex /* setPageIndex */] = useState<number>(1);
  const [pageSize /* setPageSize */] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const refreshUserTable = () => {
    querySuggestion({
      pageIndex,
      pageSize,
    }).then(res => {
      const { records, total: totalNums } = res.data;
      setTableData(records);
      setTotal(totalNums);
    });
  };

  useEffect(() => {
    refreshUserTable();
  }, []);

  useEffect(() => {
    refreshUserTable();
  }, [pageIndex]);

  const columns: ColumnProps<SuggestionTableItem>[] = [
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
            handleUpdateModalVisible(true);
            setStepFormValues(record);
          }}
        >
          详情
        </a>
      ),
    },
  ];

  const getFields = () => [
    <Col span={6}>
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
    <Col span={6}>
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
    <Col span={6}>
      <Form.Item key="createTime" label="反馈时间">
        {form.getFieldDecorator('createTime', {
          rules: [],
        })(<DatePicker showTime placeholder="请选择" onChange={() => {}} onOk={() => {}} />)}
      </Form.Item>
    </Col>,
    <Col span={12}>
      <Form.Item key="content" label="反馈信息">
        {form.getFieldDecorator('content', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col span={6}>
      <Form.Item key="createTime">
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </Form.Item>
    </Col>,
  ];

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <Form className="ant-search-form" onSubmit={() => {}}>
          <Row gutter={24}>{getFields()}</Row>
        </Form>
      </Card>
      <Card bordered={false}>
        <Table
          dataSource={tableData}
          rowKey="id"
          columns={columns}
          pagination={{
            current: pageIndex,
            pageSize,
            total,
            ...GlobalPaginaitonSetting,
          }}
        />
      </Card>
      <UpdateForm
        onSubmit={async () => {
          setStepFormValues({});
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setStepFormValues({});
        }}
        updateModalVisible={updateModalVisible}
        values={stepFormValues}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<SuggestionTableListProps>()(TableList);
