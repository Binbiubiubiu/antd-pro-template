import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from 'antd/es/form';

export interface FormValueType extends Partial<SuggestionTableForm> {}

export interface SuggestFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<SuggestionTableForm>;
}
const FormItem = Form.Item;
const { Paragraph, Text } = Typography;
const { TextArea } = Input;

export interface SuggestFormState {
  formVals: FormValueType;
}

class SuggestForm extends Component<SuggestFormProps, SuggestFormState> {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props: SuggestFormProps) {
    super(props);

    this.state = {
      formVals: {},
    };
  }

  handleNext = () => {
    const { form, onSubmit: handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          handleUpdate(formVals);
        },
      );
    });
  };

  renderContent = (currentStep: number, formVals: FormValueType) => {
    const { form } = this.props;
    return [
      <Typography>
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

  renderFooter = (currentStep: number) => {
    const { onCancel: handleUpdateModalVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        回复
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, onCancel: handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="投诉反馈"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

export default Form.create<SuggestFormProps>()(SuggestForm);
