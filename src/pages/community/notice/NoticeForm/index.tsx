import React, { FC, FormEvent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import EasyRichText from '@/easy-components/EasyRichText';

interface NoticeFormProps extends FormComponentProps<NoticeTableForm> {}

const NoticeForm: FC<NoticeFormProps> = props => {
  const { form } = props;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      // if (err) return;
    });
  };

  return (
    <PageHeaderWrapper title="新增公告">
      <Card bordered={false}>
        <Form layout="vertical" onSubmit={handleSubmit}>
          <Row>
            <Col span={12}>
              <Form.Item label="公告标题">
                {form.getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入公告标题！' }],
                })(<Input placeholder="请输入" style={{ width: 300 }} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="发送对象">
                {form.getFieldDecorator('houseId', {
                  rules: [{ required: true, message: '请选择发送对象！' }],
                })(
                  <Select placeholder="请选择" style={{ width: 300 }} mode="multiple">
                    <Select.Option value="1">利一家园</Select.Option>
                    <Select.Option value="2">望京</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            {form.getFieldDecorator('content', {
              initialValue: '',
              rules: [],
            })(<EasyRichText />)}
          </Form.Item>
          <Form.Item style={{ paddingTop: 24 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button
              style={{ marginLeft: 24 }}
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Form.create<NoticeFormProps>({ name: 'notice_form' })(NoticeForm);
