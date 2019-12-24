import { Col, Modal, Row, Typography } from 'antd';
import React, { Component } from 'react';

const { Paragraph, Text } = Typography;

export interface FormValueType extends Partial<RepairTableForm> {}

export interface RepairFormProps {
  onCancel: () => void;
  onSubmit: () => void;
  modalVisible: boolean;
  formVals: FormValueType;
}

export interface RepairFormState {}

class RepairForm extends Component<RepairFormProps, RepairFormState> {
  static defaultProps = {
    onSubmit: () => {},
    formVals: {},
  };

  renderContent = () => [
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
  ];

  handleSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit();
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    const { modalVisible } = this.props;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="报修详情"
        visible={modalVisible}
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
        okText="已完成"
        cancelText="处理中"
      >
        {this.renderContent()}
      </Modal>
    );
  }
}

export default RepairForm;
