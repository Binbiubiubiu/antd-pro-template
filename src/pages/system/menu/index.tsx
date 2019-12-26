import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Modal, Table, message } from 'antd';

import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import MenuForm from './components/MenuForm';
import { moduleListAll } from '@/services/menu';
import { removeMenu } from '@/pages/system/menu/service';

interface MenuTableListProps extends FormComponentProps {}

/**
 *  删除菜单项
 * @param selectedRows
 * @param cb
 */
const handleRemove = (selectedRows: MenuTableItem, cb?: () => void) => {
  Modal.confirm({
    title: '提示',
    content: '是否确认删除该菜单',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      try {
        await removeMenu(selectedRows);
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

const MenuTableList: React.FC<MenuTableListProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [menuData, setMenuData] = useState<MenuTableItem[]>([]);
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const refreshMenuTable = () => {
    setLoading(true);
    moduleListAll()
      .then(res => {
        const { data } = res;
        setMenuData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshMenuTable();
  }, []);

  const columns: ColumnProps<MenuTableItem>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
    },
    {
      title: '图标',
      dataIndex: 'icon',
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '操作',
      width: 250,
      dataIndex: 'option',
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              setStepFormValues({ newParentId: record.id });
              handleModalVisible(true);
            }}
            type="link"
          >
            新增
          </Button>
          <Button
            onClick={() => {
              setStepFormValues({ ...record, newParentId: record.parentId });
              handleModalVisible(true);
            }}
            type="link"
          >
            编辑
          </Button>
          <Button
            onClick={() => {
              handleRemove(record, () => {
                refreshMenuTable();
              });
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
      <Card bordered={false}>
        <Button
          onClick={() => {
            handleModalVisible(true);
          }}
          style={{ marginBottom: 10 }}
          type="primary"
          icon="plus"
        >
          新增
        </Button>

        <Table
          loading={loading}
          rowKey="id"
          columns={columns}
          dataSource={menuData}
          pagination={false}
        />
      </Card>
      <MenuForm
        onSubmit={() => {
          handleModalVisible(false);
          refreshMenuTable();
        }}
        formValue={stepFormValues}
        onCancel={() => handleModalVisible(false)}
        modalVisible={modalVisible}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<MenuTableListProps>()(MenuTableList);
