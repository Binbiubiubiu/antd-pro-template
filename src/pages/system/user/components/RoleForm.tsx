import React, { useEffect, useMemo, useState } from 'react';
import { Form, Input, message, Modal, Tree } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import { moduleListAll } from '@/services/menu';
import { checkRoleName, saveOrUpdateRole } from '../services/role.service';
import { getNoParentChild } from '../utils';
import { MenuTableItem } from '@/pages/system/menu/data';

const FormItem = Form.Item;

const { TreeNode } = Tree;

interface RoleFormProps extends FormComponentProps {
  modalVisible: boolean;
  formValue: RoleListForm;
  onSubmit: (fieldsValue: any) => void;
  onCancel: () => void;
}

const RoleForm: React.FC<RoleFormProps> = props => {
  const { modalVisible, form, formValue, onSubmit, onCancel } = props;

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [checkKeys, setCheckKeys] = useState<string[]>([]);
  const [halfCheckKeys, setHalfCheckKeys] = useState<string[]>([]);
  const [menuData, setMenuData] = useState<MenuTableItem[]>([]);

  const isUpdate = useMemo<boolean>(() => !!formValue.moduleId, [formValue]);
  const roleMenuData = useMemo<string[]>(
    () => (formValue.moduleList ? formValue.moduleList.split(',') : []),
    [formValue],
  );

  useEffect(() => {
    moduleListAll().then(res => {
      const { data } = res;
      setMenuData(data);
    });
  }, []);

  useEffect(() => {
    if (modalVisible) {
      setCheckKeys(getNoParentChild(menuData, roleMenuData));
    }
  }, [modalVisible]);

  const handleChange = (checkedKeys: any) => {
    setCheckKeys(checkedKeys);
  };

  const okHandle = () => {
    form.validateFields(async (err, fieldsValue) => {
      if (err) return;
      setConfirmLoading(true);
      const submitData = {
        ...formValue,
        ...fieldsValue,
        moduleList: [...halfCheckKeys, ...checkKeys].map(item => +item),
      };
      try {
        const result = await saveOrUpdateRole(submitData);
        if (result.code !== 200) {
          throw new Error();
        }
        message.success('操作成功');
      } catch (e) {
        message.error('操作失败');
      } finally {
        setConfirmLoading(false);
      }
      onSubmit(submitData);
    });
  };

  const renderTreeNodes = (data: any[]) =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

  const renderFormTree = () => (
    <Tree
      checkable
      onCheck={(keys, e: any) => {
        handleChange(keys);
        setHalfCheckKeys(e.halfCheckedKeys as string[]);
      }}
      checkedKeys={checkKeys}
    >
      {renderTreeNodes(menuData)}
    </Tree>
  );

  const renderFormContent = () => [
    <FormItem key="name" label="角色名" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
      {form.getFieldDecorator('name', {
        initialValue: formValue.name,
        validateTrigger: 'onBlur',
        rules: [
          { required: true, message: '请输入角色名！' },
          {
            validator: (rule, value, callback) => {
              if (isUpdate && value === formValue.name) {
                callback();
                return;
              }
              checkRoleName({ name: value }).then(res => {
                const { code, message: msg } = res;
                if (code === 200 && msg === '1') {
                  callback();
                } else {
                  callback('角色名重复，请重填');
                }
              });
            },
          },
        ],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <FormItem key="moduleList" label="权限分配" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
      {form.getFieldDecorator('moduleList', {
        initialValue: formValue.moduleList,
        rules: [],
      })(renderFormTree())}
    </FormItem>,
  ];

  return (
    <Modal
      width={500}
      destroyOnClose
      title={`${isUpdate ? '修改' : '新增'}角色`}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
      confirmLoading={confirmLoading}
    >
      {renderFormContent()}
    </Modal>
  );
};

export default Form.create<RoleFormProps>({ name: 'role_from' })(RoleForm);
