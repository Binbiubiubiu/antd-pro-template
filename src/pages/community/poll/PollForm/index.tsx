import React, { FC, useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormItemGrid,
  FormCard,
  FormPath,
  FormBlock,
  FormLayout,
  createFormActions,
} from '@uform/antd';

interface PollFormProps {}

const PollForm: FC<PollFormProps> = () => {
  const [value, setValues] = useState({});
  useEffect(() => {
    setTimeout(() => {
      setValues({
        array: [{ array2: [{ aa: '123', bb: '321' }] }],
      });
    }, 1000);
  }, []);

  return (
    <PageHeaderWrapper title="发起投票">
      <Card bordered={false}>
        <SchemaForm initialValues={value} onSubmit={v => v}>
          <Field title="数组" name="array" maxItems={3} type="array" x-props={{}}>
            <Field type="object">
              <FormBlock title="基础信息">
                <FormLayout labelCol={{ span: 9 }} wrapperCol={{ span: 6 }}>
                  <Field name="aa" type="string" title="字段1" />
                  <Field name="bb" type="string" title="字段2" />
                  <FormItemGrid title="字段3" gutter={10}>
                    <Field name="cc" type="string" />
                    <Field name="dd" type="string" />
                  </FormItemGrid>
                </FormLayout>
              </FormBlock>
              <FormBlock title="嵌套数组">
                <Field name="array2" maxItems={3} type="array">
                  <Field type="object">
                    <FormLayout labelCol={{ span: 9 }} wrapperCol={{ span: 6 }}>
                      <Field name="aa" type="string" title="字段1" />
                      <Field name="bb" type="string" title="字段2" />
                      <FormItemGrid title="字段3" gutter={10}>
                        <Field name="cc" type="string" />
                        <Field name="dd" type="string" />
                      </FormItemGrid>
                    </FormLayout>
                  </Field>
                </Field>
              </FormBlock>
            </Field>
          </Field>
          <FormButtonGroup>
            <Submit>提交</Submit>
            <Reset>重置</Reset>
          </FormButtonGroup>
        </SchemaForm>
      </Card>
    </PageHeaderWrapper>
  );
};

export default PollForm;
