import React, { FormEvent } from 'react';
import { Card, Form, Row } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import { WrappedFormUtils } from 'antd/es/form/Form';
import styles from './style.less';

export interface EasySearchFormProps<T> extends FormComponentProps<T> {
  onSubmit: (form: T) => void;
  renderSearchFormItem: (form: WrappedFormUtils<T>) => React.ReactElement[];
  wrappedWithCard?: boolean;
}

function EasySearchForm<T = any>(props: EasySearchFormProps<T>) {
  const { form, onSubmit, wrappedWithCard, renderSearchFormItem } = props;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      onSubmit(values);
    });
  };

  let renderResult = (
    <Form className={styles['easy-search-form']} onSubmit={handleSubmit}>
      <Row gutter={24}>{renderSearchFormItem(form)}</Row>
    </Form>
  );

  if (wrappedWithCard) {
    renderResult = (
      <Card className={styles['easy-search-wrapper']} bordered={false} style={{ marginBottom: 24 }}>
        {renderResult}
      </Card>
    );
  }

  return renderResult;
}

export default Form.create<EasySearchFormProps<any>>()(EasySearchForm);
