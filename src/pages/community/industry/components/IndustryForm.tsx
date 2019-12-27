import React, { useEffect, useMemo, useState } from 'react';
import { Form, Input, InputNumber, Modal, Radio, message } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import { IDCardReg, phoneReg } from '@/utils/validator';
import { addIndustry, editIndustry } from '../service';

import { EasyHouseSelect } from '@/easy-components';
import { IndustryTableForm } from '../data.d';

const FormItem = Form.Item;

interface IndustryFormProps extends FormComponentProps<IndustryTableForm> {
  modalVisible: boolean;
  formValue: IndustryTableForm;
  onSubmit: (fieldsValue: IndustryTableForm) => void;
  onCancel: () => void;
}

const IndustryForm: React.FC<IndustryFormProps> = props => {
  const { modalVisible, form, formValue, onSubmit, onCancel } = props;

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const isUpdate = useMemo<boolean>(() => !!formValue.id, [formValue]);

  useEffect(() => {
    if (modalVisible) {
      form.resetFields();
    }
  }, [modalVisible]);

  const okHandle = () => {
    form.validateFields(async (err, fieldsValue) => {
      if (err) return;
      try {
        setConfirmLoading(true);
        const result = isUpdate
          ? await editIndustry({ id: formValue.id, ...fieldsValue })
          : await addIndustry(fieldsValue);
        if (result.code !== 200) {
          throw new Error();
        }
        message.success('操作成功');
      } catch (e) {
        message.error('操作失败');
      } finally {
        setConfirmLoading(false);
      }
      onSubmit(fieldsValue);
    });
  };

  const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  };

  const renderFormContent = () => [
    <FormItem key="houseKey" label="小区名称" {...formLayout}>
      {form.getFieldDecorator('houseKey', {
        initialValue: formValue.houseKey,
        rules: [{ required: true, message: '请选择小区名称！' }],
      })(<EasyHouseSelect placeholder="请选择" style={{ width: '100%' }} />)}
    </FormItem>,
    <FormItem key="uesrName" label="姓名" {...formLayout}>
      {form.getFieldDecorator('uesrName', {
        initialValue: formValue.uesrName,
        rules: [{ required: true, message: '请输入姓名！' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <Form.Item key="sex" label="性别" {...formLayout}>
      {form.getFieldDecorator('sex', {
        initialValue: 'MAN',
      })(
        <Radio.Group>
          <Radio value="MAN">男</Radio>
          <Radio value="WOMAN">女</Radio>
        </Radio.Group>,
      )}
    </Form.Item>,
    <FormItem key="idcard" label="身份证" {...formLayout}>
      {form.getFieldDecorator('idcard', {
        initialValue: formValue.idcard,
        validateFirst: true,
        rules: [
          { required: true, message: '请输入身份证！' },
          { pattern: IDCardReg, message: '身份证有误，请重填!' },
        ],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <FormItem key="phone" label="联系电话" {...formLayout}>
      {form.getFieldDecorator('phone', {
        initialValue: formValue.phone,
        validateFirst: true,
        rules: [
          { required: true, message: '请输入联系电话！' },
          { pattern: phoneReg, message: '联系电话有误，请重填!' },
        ],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <FormItem key="duty" label="当选职务" {...formLayout}>
      {form.getFieldDecorator('duty', {
        initialValue: formValue.duty,
        rules: [{ required: true, message: '请输入当选职务！' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <FormItem key="poll" label="当选票数" {...formLayout}>
      {form.getFieldDecorator('poll', {
        initialValue: formValue.poll || 0,
        rules: [{ required: true, message: '请输入当选票数！' }],
      })(<InputNumber min={0} style={{ width: 200 }} placeholder="请输入" />)}
    </FormItem>,
  ];

  return (
    <Modal
      width={700}
      destroyOnClose
      title={`${isUpdate ? '修改' : '新建'}业委会成员`}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
      confirmLoading={confirmLoading}
    >
      {renderFormContent()}
    </Modal>
  );
};

export default Form.create<IndustryFormProps>({ name: 'industry_form' })(IndustryForm);
