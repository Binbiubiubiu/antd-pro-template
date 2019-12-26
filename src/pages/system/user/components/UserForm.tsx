import React, { useEffect, useMemo, useState } from 'react';
import { Form, Input, Modal, Transfer, message } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import { TransferItem } from 'antd/es/transfer';
import { checkUserName, saveOrUpdateUser } from '@/pages/system/user/services/user.service';
import { getUserRoleList, queryRole } from '@/pages/system/user/services/role.service';

import { EasyHouseSelect } from '@/easy-components/EasySelect';
import { phoneReg } from '@/utils/validator';

const FormItem = Form.Item;

type TransferRoleType = TransferItem & RoleListItem;

interface UserFormProps extends FormComponentProps<UserTableForm> {
  modalVisible: boolean;
  formValue: UserTableForm;
  onSubmit: (fieldsValue: UserTableForm) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = props => {
  const { modalVisible, form, formValue, onSubmit, onCancel } = props;

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
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

  const okHandle = () => {
    form.validateFields(async (err, fieldsValue) => {
      if (err) return;
      setConfirmLoading(true);
      const { confirmPassWord, houseId, ...rest } = fieldsValue;
      const hId = houseId && houseId.length ? (houseId as string[]).join(',') : houseId;
      try {
        const result = await saveOrUpdateUser({ id: formValue.id, houseId: hId, ...rest });
        if (result.code !== 200) {
          throw new Error();
        }
        message.success('操作成功');
      } catch (e) {
        message.error('操作失败');
      } finally {
        setConfirmLoading(false);
      }
      onSubmit(rest);
    });
  };

  const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  };

  const renderFormContent = () => [
    <FormItem key="name" label="姓名" {...formLayout}>
      {form.getFieldDecorator('name', {
        initialValue: formValue.name,
        rules: [{ required: true, message: '请输入姓名！' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <FormItem key="phone" label="手机号码" {...formLayout}>
      {form.getFieldDecorator('phone', {
        initialValue: formValue.phone,
        validateFirst: true,
        validateTrigger: 'onBlur',
        rules: [
          { required: true, message: '请输入手机号！' },
          { pattern: phoneReg, message: '手机号码有误，请重填' },
        ],
      })(<Input placeholder="请输入" type="phone" />)}
    </FormItem>,
    <FormItem key="houseId" label="小区" {...formLayout}>
      {form.getFieldDecorator('houseId', {
        initialValue:
          typeof formValue.houseId === 'string' && formValue.houseId.trim() !== ''
            ? formValue.houseId.split(',')
            : [],
        rules: [{ required: true, message: '请选择小区！' }],
      })(<EasyHouseSelect mode="multiple" placeholder="请选择" style={{ width: '100%' }} />)}
    </FormItem>,
    <FormItem key="userName" label="账号" {...formLayout}>
      {form.getFieldDecorator('userName', {
        initialValue: formValue.userName,
        validateFirst: true,
        validateTrigger: 'onBlur',
        rules: [
          { required: true, message: '请输入账号！' },
          { pattern: /^[a-zA-Z0-9]{4,30}$/, message: '账号仅限4-30位字母或数字' },
          {
            validator: (rule, value, callback) => {
              if (isUpdate && value === formValue.userName) {
                callback();
                return;
              }
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
    <FormItem key="passWord" label="密码" {...formLayout}>
      {form.getFieldDecorator('passWord', {
        validateFirst: true,
        rules: [
          { required: !isUpdate, message: '请输入密码！' },
          {
            validator: (rule, value, callback) => {
              if (isUpdate && !value) {
                callback();
                return;
              }
              const rules = [
                /^(?=.*\d)[\da-zA-Z~!@#$%^&*]{6,30}$/.test(value),
                /^(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,30}$/.test(value),
                /^(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,30}$/.test(value),
              ];
              const result = rules.filter(item => item);
              if (result.length < 2) {
                callback(new Error('密码仅限6-30位，且至少需包含字母、数字、特殊字符中两项'));
              } else {
                callback();
              }
            },
          },
        ],
      })(<Input placeholder="请输入" type="password" />)}
    </FormItem>,
    <FormItem key="confirmPassWord" label="确认密码" {...formLayout}>
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
    <FormItem key="roleList" label="角色" {...formLayout}>
      {form.getFieldDecorator('roleList', {
        initialValue: targetKeys,
        valuePropName: 'targetKeys',
        rules: [{ required: true, message: '请选择角色！' }],
      })(
        <Transfer
          dataSource={roleData}
          titles={['所有角色', '已选角色']}
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
      confirmLoading={confirmLoading}
    >
      {renderFormContent()}
    </Modal>
  );
};

export default Form.create<UserFormProps>({ name: 'user_from' })(UserForm);
