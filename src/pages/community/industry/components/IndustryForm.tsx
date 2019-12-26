import { Form, Input, InputNumber, message, Modal, Radio } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { useEffect, useMemo, useState } from 'react';
import { EasyHouseSelect } from '@/easy-components/EasySelect';
import { IDCardReg, phoneReg } from '@/utils/validator';

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
        const result = { code: 500 }; // await saveOrUpdateUser({ id: formValue.id, houseId: hId, ...rest });
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
    <FormItem key="houseId" label="小区名称" {...formLayout}>
      {form.getFieldDecorator('houseId', {
        initialValue: formValue.houseId,
        rules: [{ required: true, message: '请选择小区名称！' }],
      })(<EasyHouseSelect mode="multiple" placeholder="请选择" style={{ width: '100%' }} />)}
    </FormItem>,
    <FormItem key="name" label="姓名" {...formLayout}>
      {form.getFieldDecorator('name', {
        initialValue: formValue.name,
        rules: [{ required: true, message: '请输入姓名！' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <Form.Item label="性别" {...formLayout}>
      {form.getFieldDecorator('sex', {
        initialValue: 0,
      })(
        <Radio.Group>
          <Radio value={0}>男</Radio>
          <Radio value={1}>女</Radio>
        </Radio.Group>,
      )}
    </Form.Item>,
    <FormItem key="userName" label="身份证" {...formLayout}>
      {form.getFieldDecorator('userName', {
        initialValue: formValue.IDCard,
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
    <FormItem key="job" label="当选职务" {...formLayout}>
      {form.getFieldDecorator('job', {
        initialValue: formValue.job,
        rules: [{ required: true, message: '请输入当选职务！' }],
      })(<Input placeholder="请输入" />)}
    </FormItem>,
    <FormItem key="pollNum" label="当选票数" {...formLayout}>
      {form.getFieldDecorator('pollNum', {
        initialValue: formValue.pollNum || 0,
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
