import {Button, Form, message, Row, Col, Card, Input} from 'antd';
import React, {useState} from 'react';
import {FormComponentProps} from 'antd/es/form';
import {PageHeaderWrapper, GridContent} from '@ant-design/pro-layout';
import ProTable, {ProColumns, UseFetchDataAction} from '@ant-design/pro-table';
import CreateForm, {FormValueType} from './components/CreateForm';
import {UserTableItem} from './data.d';
import {queryUser} from './service';
import RoleList from './components/RoleList';

interface TableListProps extends FormComponentProps {
}

/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');

  try {
    // await addRule({
    //   desc: fields.desc,
    // });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');

  try {
    // await updateRule({
    //   name: fields.name,
    //   desc: fields.desc,
    //   key: fields.key,
    // });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows: UserTableItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    // await removeRule({
    //   key: selectedRows.map(row => row.key),
    // });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [actionRef, setActionRef] = useState<UseFetchDataAction<{
    data: UserTableItem[];
  }>>();
  const columns: ProColumns<UserTableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
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
      valueType: 'dateTime',
    },
    {
      title: '创始人',
      dataIndex: 'createName',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
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
          <Button type="link">删除</Button>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <GridContent>
        <Row gutter={24}>
          <Col lg={6}>
            <RoleList/>
          </Col>
          <Col lg={18}>
            <Card bordered={false}>
              <ProTable<UserTableItem>
                onInit={setActionRef}
                rowKey="id"
                headerTitle={
                  <>
                    <Input.Search
                      style={{
                        width: 200,
                      }}
                      onSearch={value => {
                      }}
                    />
                    &nbsp;&nbsp;
                    <Button icon="plus" type="primary" onClick={() => handleModalVisible(true)}>
                      新建
                    </Button>
                  </>
                }
                options={false as any}
                search={false}
                request={params => queryUser({...params, param: ''})}
                columns={columns}
              />
              <CreateForm
                onSubmit={async value => {
                  const success = false; // await handleAdd(value);

                  if (success) {
                    handleModalVisible(false);
                    actionRef!.reload();
                  }
                }}
                onCancel={() => handleModalVisible(false)}
                modalVisible={createModalVisible}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
