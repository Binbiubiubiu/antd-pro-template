import React, { Component } from 'react';
import { Col, Form, Input, Modal, Row, Typography } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import { SuggestTableForm } from '../data.d';

const FormItem = Form.Item;
const { Paragraph, Text } = Typography;
const { TextArea } = Input;

export interface FormValueType extends Partial<SuggestTableForm> {}

export interface SuggestFormProps extends FormComponentProps {
  onCancel: () => void;
  onSubmit: (formVals: FormValueType) => void;
  modalVisible: boolean;
  formVals: FormValueType;
}

export interface SuggestFormState {}

class SuggestForm extends Component<SuggestFormProps, SuggestFormState> {
  static defaultProps = {
    onSubmit: () => {},
    formVals: {},
  };

  renderContent = (formVals: FormValueType) => {
    const { form } = this.props;
    return [
      <Typography key="suggestForm">
        <Paragraph>
          <Text strong>牛依·15990285367（美哉美城15幢1单元502)</Text>{' '}
          <Text type="secondary" style={{ float: 'right' }}>
            2019-11-01 18:50:08
          </Text>
        </Paragraph>
        <Paragraph>
          2幢1单元的电梯坏了，麻烦叫师父来处理下2幢1单元的电梯坏了，麻烦叫师父来处理下2幢1单元的电梯坏了，麻烦叫师父来处理下2幢1单元的电梯坏了，麻烦叫师父来处理下2幢1单元的电梯坏了，麻烦叫师父来处理下
        </Paragraph>
        <Paragraph>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <img
                style={{ width: '100%', height: '100%' }}
                src="https://img-blog.csdnimg.cn/20191216172544126.png"
                alt=""
              ></img>
            </Col>
            <Col span={8}>
              <img
                style={{ width: '100%', height: '100%' }}
                src="https://img-blog.csdnimg.cn/20191216172544126.png"
                alt=""
              ></img>
            </Col>
            <Col span={8}>
              <img
                style={{ width: '100%', height: '100%' }}
                src="https://img-blog.csdnimg.cn/20191216172544126.png"
                alt=""
              ></img>
            </Col>
          </Row>
        </Paragraph>
        <Paragraph>类型：投诉</Paragraph>
      </Typography>,
      <FormItem key="desc">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
          initialValue: formVals.desc,
        })(<TextArea rows={4} placeholder="添加回复" />)}
      </FormItem>,
    ];
  };

  handleSubmit = () => {
    const { form, onSubmit } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      onSubmit(fieldsValue);
    });
  };

  render() {
    const { formVals, modalVisible, onCancel } = this.props;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="投诉反馈"
        visible={modalVisible}
        onCancel={() => onCancel()}
        onOk={() => this.handleSubmit()}
        okText="回复"
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}

export default Form.create<SuggestFormProps>()(SuggestForm);
