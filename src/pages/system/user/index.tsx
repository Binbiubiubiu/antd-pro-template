import { Button, Form, message, Row, Col, Card, Modal, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import CreateForm from './components/UserForm';
import { deleteRole } from '@/pages/system/user/services/role.service';
import { queryUser } from '@/pages/system/user/services/user.service';
import RoleList from './components/RoleList';
import UserSearch from '@/pages/system/user/components/UserSearch';

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
        await deleteRole(selectedRows);
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
  const [stepFormValues, setStepFormValues] = useState({});

  const [tableData, setTableData] = useState<UserTableItem[]>([]);
  const [pageIndex /* setPageIndex */] = useState<number>(1);
  const [pageSize /* setPageSize */] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const refreshUserTable = () => {
    queryUser({
      pageIndex,
      pageSize,
    }).then(res => {
      const { records, total: totalNum } = res.data;
      setTableData(records);
      setTotal(totalNum);
    });
  };

  useEffect(() => {
    refreshUserTable();
  }, []);

  useEffect(() => {
    refreshUserTable();
  }, [pageIndex]);

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
      dataIndex: 'createTime',
    },
    {
      title: '创始人',
      dataIndex: 'createName',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              handleModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </Button>
          <Button
            onClick={() => {
              handleRemove(record);
            }}
            type="link"
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <GridContent>
        <Row gutter={24}>
          <Col lg={6}>
            <RoleList />
          </Col>
          <Col lg={18}>
            <Card bordered={false} style={{ marginBottom: 24 }}>
              <UserSearch onSubmit={() => {}} />
            </Card>
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
              <Table
                rowKey="id"
                columns={columns}
                dataSource={tableData}
                pagination={{
                  current: pageIndex,
                  pageSize,
                  total,
                }}
              />
              <CreateForm
                onSubmit={async () => {
                  const success = false; // await handleAdd(value);

                  if (success) {
                    handleModalVisible(false);
                  }
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

export default Form.create<TableListProps>({ name: 'user_search_from' })(UserTable);
