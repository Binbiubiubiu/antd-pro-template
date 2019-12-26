import React, { FC, FormEvent } from 'react';
import { Button, Form, Input } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import { LogTableParams } from '@/pages/system/log/data';

const FormItem = Form.Item;

interface LogSearchProps extends FormComponentProps {
  onSubmit: (fieldsValue: LogTableParams) => void;
}

const LogSearch: FC<LogSearchProps> = props => {
  const { onSubmit, form } = props;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      onSubmit(values);
    });
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem key="param" label="搜索">
        {form.getFieldDecorator('param', {
          initialValue: '',
          rules: [],
        })(<Input placeholder="操作人/操作接口/操作说明" type="text" style={{ width: 220 }} />)}
      </FormItem>
      <FormItem>
        <Button onClick={handleSubmit} type="primary" htmlType="submit">
          搜索
        </Button>
      </FormItem>
    </Form>
  );
};

export default Form.create<LogSearchProps>()(LogSearch);
