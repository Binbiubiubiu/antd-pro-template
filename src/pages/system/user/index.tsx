import React, { useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, Modal, Row, message } from 'antd';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';

import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { queryUser, removeUser } from '@/pages/system/user/services/user.service';

import { EasyHouseSelect } from '@/easy-components/EasySelect';
import EasySearchForm from '@/easy-components/EasySearchForm';
import EasyTable from '@/easy-components/EasyTable';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';
import RoleList from './components/RoleList';
import UserForm from './components/UserForm';
import { usePagableFetch } from '@/hooks/usePagableFetch';

interface TableListProps extends FormComponentProps<UserTableItem> {}

/**
 *  删除角色
 * @param selectedRows
 * @param cb
 */
const handleRemove = (selectedRows: UserTableItem, cb?: () => void) => {
  Modal.confirm({
    title: '提示',
    content: `是否确认删除该用户：${selectedRows.name}`,
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      try {
        await removeUser(selectedRows);
        if (cb) {
          cb.call(null);
        }
        message.success('删除成功');
      } catch (error) {
        message.error('删除失败');
      }
    },
    onCancel() {},
  });
};

const UserTable: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState<UserTableForm>({} as UserTableForm);

  const {
    loading,
    tableData,
    current,
    pageSize,
    total,
    setCurrent,
    setSearchForm,
    refreshTable,
  } = usePagableFetch<UserTableItem>({
    request: ({ searchForm, pageIndex, pageSize: size }) =>
      queryUser({ ...searchForm, pageIndex, pageSize: size }),
    onSuccess: ({ res, setTableData, setTotal }) => {
      setTableData(res.data.records);
      setTotal(res.data.total);
    },
    onError: () => {},
  });

  const renderSearchForm = (form: WrappedFormUtils<UserTableParams>) => [
    <Col key="param" {...GolobalSearchFormLayout}>
      <Form.Item label="角色/姓名">
        {form.getFieldDecorator('param', {
          initialValue: '',
          rules: [],
        })(<Input placeholder="请输入" type="sort" />)}
      </Form.Item>
    </Col>,
    <Col key="houseId" {...GolobalSearchFormLayout}>
      <Form.Item label="小区">
        {form.getFieldDecorator('houseId', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择"></EasyHouseSelect>)}
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

  const columns: ColumnProps<UserTableItem>[] = [
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
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
    },
    {
      title: '创建时间',
      dataIndex: 'newCreateTime',
    },
    {
      title: '创始人',
      dataIndex: 'createName',
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
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleRemove(record, () => refreshTable());
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <GridContent>
        <Row gutter={24}>
          <Col lg={24} xl={7}>
            <RoleList />
          </Col>
          <Col lg={24} xl={17}>
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
                      setStepFormValues({} as UserTableForm);
                    }}
                  >
                    新建
                  </Button>
                </Col>
              </Row>
              <EasyTable<UserTableItem>
                loading={loading}
                rowKey="id"
                columns={columns}
                dataSource={tableData}
                pagination={{
                  current,
                  total,
                  pageSize,
                  onChange: index => {
                    setCurrent(index);
                  },
                }}
              />
              <UserForm
                onSubmit={async fieldsValue => {
                  refreshTable();
                  handleModalVisible(false);
                }}
                onCancel={() => handleModalVisible(false)}
                formValue={stepFormValues}
                modalVisible={createModalVisible}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(UserTable);
