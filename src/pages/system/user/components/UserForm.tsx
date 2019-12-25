import { Form, Input, message, Modal, Transfer } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { useEffect, useMemo, useState } from 'react';
import { TransferItem } from 'antd/es/transfer';
import { queryRole, getUserRoleList } from '@/pages/system/user/services/role.service';
import { isPhone } from '@/utils/utils';
import { checkUserName, saveOrUpdateUser } from '@/pages/system/user/services/user.service';
import { EasyHouseSelect } from '@/easy-components/EasySelect';

const FormItem = Form.Item;

type TransferRoleType = TransferItem & RoleListItem;

interface UserFormProps extends FormComponentProps {
  modalVisible: boolean;
  formValue: UserTableForm;
  onSubmit: (fieldsValue: UserTableForm) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = props => {
  const { modalVisible, form, formValue, onSubmit, onCancel } = props;

  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [roleData, setRoleData] = useState<TransferRoleType[]>([]);
  const isUpdate = useMemo<boolean>(() => !!formValue.id, [formValue]);

  const getSelectedRoles = () => {
    if (!formValue.id) return;

    getUserRoleList({ id: formValue.id }).then(res => {
      setTargetKeys(res.data.map((item: RoleListItem) => item.id));
    });
  };

  useEffect(() => {
    if (modalVisible) {
      form.resetFields();
      setTargetKeys([]);
    }

    queryRole().then(res => {
      const { data } = res;
      setRoleData(data);
      if (isUpdate) {
        getSelectedRoles();
      }
    });
  }, [modalVisible]);

  // const handleChange = (
  //   nextTargetKeys: React.SetStateAction<string[]>,
  //   // direction: any,
  //   // moveKeys: any,
  // ) => {
  //   setTargetKeys(nextTargetKeys);
  // };

  const okHandle = () => {
    form.validateFields(async (err, fieldsValue) => {
      if (err) return;
      const { confirmPassWord, houseId, ...rest } = fieldsValue;
      const hId = houseId && houseId.length ? houseId.join(',') : houseId;
      try {
        await saveOrUpdateUser({ id: formValue.id, houseId: hId, ...rest });
        message.success('操作成功');
      } catch (e) {
        message.error('操作失败');
      }
      onSubmit(rest);
    });
  };

  const renderFormContent = () => [
    <FormItem key="name" label="姓名" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
      {form.getFieldDecorator('name', {
        initialValue: formValue.name,
        rules: [{ required: true, message: '请输入姓名！' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <FormItem key="phone" label="手机号码" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
      {form.getFieldDecorator('phone', {
        initialValue: formValue.phone,
        validateFirst: true,
        validateTrigger: 'onBlur',
        rules: [
          { required: true, message: '请输入手机号！' },
          {
            validator: (rule, value, callback) => {
              if (!isPhone(value)) {
                callback('手机号码有误，请重填');
              } else {
                callback();
              }
            },
          },
        ],
      })(<Input placeholder="请输入" type="phone" />)}
    </FormItem>,
    <FormItem key="houseId" label="小区" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
      {form.getFieldDecorator('houseId', {
        initialValue:
          formValue.houseId && formValue.houseId.trim() !== '' ? formValue.houseId.split(',') : [],
        rules: [{ required: true, message: '请选择小区！' }],
      })(<EasyHouseSelect mode="multiple" placeholder="请选择" style={{ width: '100%' }} />)}
    </FormItem>,
    <FormItem key="userName" label="账号" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
      {form.getFieldDecorator('userName', {
        initialValue: formValue.userName,
        validateFirst: true,
        validateTrigger: 'onBlur',
        rules: [
          { required: true, message: '请输入账号！' },
          {
            validator: (rule, value, callback) => {
              if (isUpdate) callback();
              checkUserName({ userName: value }).then(res => {
                const { code, message: msg } = res;
                if (code === 200 && msg === '1') {
                  callback();
                } else {
                  callback('账号重复，请重填');
                }
              });
            },
          },
        ],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <FormItem key="passWord" label="密码" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
      {form.getFieldDecorator('passWord', {
        rules: [{ required: !isUpdate, message: '请输入密码！' }],
      })(<Input placeholder="请输入" type="password" />)}
    </FormItem>,
    <FormItem
      key="confirmPassWord"
      label="确认密码"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
    >
      {form.getFieldDecorator('confirmPassWord', {
        validateFirst: true,
        rules: [
          { required: !isUpdate, message: '请输入确认密码！' },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== form.getFieldValue('passWord')) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            },
          },
        ],
      })(<Input placeholder="请输入" type="password" />)}
    </FormItem>,
    <FormItem key="roleList" label="角色" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
      {form.getFieldDecorator('roleList', {
        initialValue: targetKeys,
        valuePropName: 'targetKeys',
        rules: [{ required: true, message: '请选择角色！' }],
      })(
        <Transfer
          dataSource={roleData}
          titles={['所有角色', '已选角色']}
          // targetKeys={targetKeys}
          // onChange={handleChange}
          rowKey={item => item.moduleId}
          render={item => item.name}
        />,
      )}
    </FormItem>,
  ];

  return (
    <Modal
      width={700}
      destroyOnClose
      title={`${isUpdate ? '修改' : '新建'}人员`}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      {renderFormContent()}
    </Modal>
  );
};

export default Form.create<UserFormProps>({ name: 'user_from' })(UserForm);
