import {Form, Input, Modal, Transfer} from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, {useEffect, useState} from 'react';
import {RoleListItem, UserTableItem} from "@/pages/system/person/data";
import {queryRole} from "@/pages/system/person/service";
import {TransferItem} from "antd/es/transfer";
import {checkPhone} from "@/utils/validate";

type TransferRoleType = TransferItem & RoleListItem;

export interface FormValueType extends Partial<UserTableItem> {
}

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  const [targetKeys,setTargetKeys] = useState([]);
  const [roleData, setRoleData] = useState<TransferRoleType[]>([]);
  useEffect(() => {
    queryRole()
      .then((res) => {
        const { data } = res;
        setRoleData(data);
      })
  }, []);

  const handleChange = (nextTargetKeys: React.SetStateAction<never[]>, direction: any, moveKeys: any) => {
    setTargetKeys(nextTargetKeys );

    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };

  const _renderFormContent = ({form}:CreateFormProps) => {
    return [
      <FormItem key="name" label="姓名" labelCol={{span:5}} wrapperCol={{span:15}} >
        {form.getFieldDecorator('name',{
          rules: [{required: true,message:'请输入姓名！'}]
        })(<Input placeholder="请输入"/>)}
      </FormItem>,
      <FormItem key="phone" label="手机号码" labelCol={{span:5}} wrapperCol={{span:15}} >
        {form.getFieldDecorator('phone',{
          validateFirst:true,
          validateTrigger:'onBlur',
          rules: [{required: true,message:'请输入手机号！'},{validator:checkPhone}]
        })(<Input placeholder="请输入" type="phone"/>)}
      </FormItem>,
      <FormItem key="userName" label="账号" labelCol={{span:5}} wrapperCol={{span:15}} >
        {form.getFieldDecorator('userName',{
          rules: [{required: true,message:'请输入账号！'}]
        })(<Input placeholder="请输入"/>)}
      </FormItem>,
      <FormItem key="passWord" label="密码" labelCol={{span:5}} wrapperCol={{span:15}} >
        {form.getFieldDecorator('passWord',{
          rules: [{required: true,message:'请输入密码！'}]
        })(<Input placeholder="请输入" type="password"/>)}
      </FormItem>,
      <FormItem key="confirmPassWord" label="确认密码" labelCol={{span:5}} wrapperCol={{span:15}} >
        {form.getFieldDecorator('confirmPassWord',{
          rules: [{required: true,message:'请输入确认密码！'}]
        })(<Input placeholder="请输入" type="password"/>)}
      </FormItem>,
      <FormItem key="roleList" label="角色" labelCol={{span:5}} wrapperCol={{span:15}} >
        {form.getFieldDecorator('roleList',{
          rules: [{required: true,message:'请选择角色！'}]
        })(<Transfer
          dataSource={roleData}
          titles={['所有角色', '已选角色']}
          targetKeys={targetKeys}
          onChange={handleChange}
          rowKey={item => item.name}
          render={item => item.name}
        />)}
      </FormItem>,
    ]
  };

  return (
    <Modal
      width={700}
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      {_renderFormContent(props)}
    </Modal>
  );

};


export default Form.create<CreateFormProps>()(CreateForm);
