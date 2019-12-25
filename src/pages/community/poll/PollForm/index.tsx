import React, { FC, FormEvent, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Col, Form, Input, Row, Select, DatePicker, Button, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import PollFormCard, { PollFormCardProps } from './PollFormCard';

let uuid = 1;

interface PollFormProps extends FormComponentProps {}

const PollForm: FC<PollFormProps> = props => {
  const { form } = props;

  const [questions, setQuestions] = useState<number[]>([uuid]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.validateFields((err, fieldValue) => {
      // if (err) return;
      // console.log(fieldValue);
    });
  };

  const handleQuestionAdd = () => {
    uuid += 1;
    setQuestions(questions.concat(uuid));
  };
  const handleQuestionDelete = (key: number) => {
    if (questions.length === 1) {
      message.error('必须留下一题');
      return;
    }
    setQuestions(questions.filter(qs => qs !== key));
  };

  return (
    <PageHeaderWrapper title="发起投票">
      <Card bordered={false}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col span={12}>
              <Form.Item label="投票标题">
                {form.getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入投票标题！' }],
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

          <Form.Item label="起止时间">
            {form.getFieldDecorator('createTime', {
              rules: [{ required: true, message: '请选择起止时间！' }],
            })(<DatePicker placeholder="请输入" style={{ width: 300 }} />)}
          </Form.Item>

          <Card bordered={false} bodyStyle={{ padding: 0 }}>
            {questions.map((quuid, i) => {
              const qId = i + 1;
              const cardProps: PollFormCardProps = {
                qId,
                form,
                uuid: quuid,
                key: `question${uuid}`,
                onDelete: handleQuestionDelete,
              };

              if (qId === questions.length) {
                return <PollFormCard onAdd={handleQuestionAdd} {...cardProps} />;
              }

              return <PollFormCard {...cardProps} />;
            })}
          </Card>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              style={{ marginRight: 12 }}
              onClick={() => {
                form.resetFields();
              }}
            >
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              发布
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Form.create<PollFormProps>()(PollForm);
