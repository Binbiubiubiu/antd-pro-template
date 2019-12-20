import { Form, Input, message, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { useEffect, useMemo } from 'react';
import { saveOrUpdateChildModule, saveOrUpdateParentModule } from '../service';

const FormItem = Form.Item;

interface MenuFormProps extends FormComponentProps {
  modalVisible: boolean;
  formValue: MenuTableForm;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const MenuForm: React.FC<MenuFormProps> = props => {
  const { modalVisible, form, formValue, onSubmit, onCancel } = props;

  const isUpdate = useMemo<boolean>(() => !!formValue.id, [formValue]);

  useEffect(() => {
    if (modalVisible) {
      form.resetFields();
    }
  }, [modalVisible]);

  const okHandle = () => {
    form.validateFields(async (err, fieldsValue) => {
      if (err) return;
      const submitData = { ...formValue, ...fieldsValue };
      try {
        if (formValue.newParentId || formValue.parentId) {
          await saveOrUpdateChildModule(submitData);
        } else {
          await saveOrUpdateParentModule(submitData);
        }
        message.success('操作成功');
      } catch (e) {
        message.error('操作失败');
      }
      onSubmit(submitData);
    });
  };

  const renderFormContent = () => [
    <FormItem key="name" label="菜单名称" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
      {form.getFieldDecorator('name', {
        initialValue: formValue.name,
        rules: [{ required: true, message: '请输入菜单名称！' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <FormItem key="path" label="菜单路径" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
      {form.getFieldDecorator('path', {
        initialValue: formValue.path,
        rules: [{ required: true, message: '请输入菜单路径！' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <FormItem key="icon" label="图标名称" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
      {form.getFieldDecorator('icon', {
        initialValue: formValue.icon,
        rules: [],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <FormItem key="sort" label="排序" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
      {form.getFieldDecorator('sort', {
        initialValue: formValue.sort,
        validateFirst: true,
        rules: [
          { required: true, message: '请输入排序！' },
          {
            validator: (rule, value, callback) => {
              if (Number.isNaN(+value)) {
                callback(new Error('请输入数字'));
              } else {
                callback();
              }
            },
          },
        ],
      })(<Input placeholder="请输入" type="sort" />)}
    </FormItem>,
  ];

  return (
    <Modal
      width={700}
      destroyOnClose
      title={`${isUpdate ? '修改' : '新建'}菜单`}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      {renderFormContent()}
    </Modal>
  );
};

export default Form.create<MenuFormProps>()(MenuForm);
