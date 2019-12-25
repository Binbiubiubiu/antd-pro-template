import { WrappedFormUtils } from 'antd/es/form/Form';
import React, { FC, useState } from 'react';
import { Button, Card, Form, Icon, Input, message } from 'antd';
import styles from './style.less';

const OPS_KEY = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const OptionsInputStyle = { width: 300 };

let uuid = 1;

export interface PollFormCardProps {
  qId: number;
  form: WrappedFormUtils;
  onAdd?: () => void;
  onDelete: (id: number) => void;
  key: string;
  uuid: number;
}

const PollFormCard: FC<PollFormCardProps> = props => {
  const { qId, form, onAdd, onDelete, uuid: pid } = props;

  const [options, setOptions] = useState<number[]>([uuid]);

  const handleAddOptions = () => {
    if (options.length > 9) {
      message.warn('选项不能超过10个');
      return;
    }
    uuid += 1;
    setOptions(options.concat(uuid));
  };

  const handleRemoveOptions = (key: number) => {
    if (options.length < 2) {
      message.warn('选项必须保留1个');
      return;
    }
    setOptions(options.filter(ops => ops !== key));
  };

  return (
    <Card.Grid className={styles['poll-form-card']} hoverable={false}>
      <Form.Item label={`${qId}.`} colon={false} labelCol={{ span: 1 }}>
        {form.getFieldDecorator(`questions[${pid}].content`, {
          rules: [{ required: true, message: '请输入投票问题！' }],
        })(<Input placeholder="请输入投票问题" />)}
      </Form.Item>
      {options.map((opuuid, i) => {
        const OpsKey = OPS_KEY[i];
        return (
          <Form.Item label={`${OpsKey}.`} colon={false} labelCol={{ span: 2 }} key={opuuid}>
            {form.getFieldDecorator(`questions[${pid}].options[${opuuid}]`, {
              rules: [{ required: true, message: `请输入选项${OpsKey}！` }],
            })(<Input placeholder="请输入" style={OptionsInputStyle} />)}
            <Button
              onClick={() => {
                handleRemoveOptions(opuuid);
              }}
              shape="circle"
              type="danger"
              ghost
              icon="close"
              size="small"
              style={{ marginLeft: 12 }}
            />
          </Form.Item>
        );
      })}
      <Form.Item wrapperCol={{ offset: 2 }}>
        <Button type="dashed" onClick={handleAddOptions} style={{ width: 300 }}>
          <Icon type="plus" /> 新增选项
        </Button>

        <div style={{ float: 'right' }}>
          {onAdd && (
            <Button onClick={onAdd} type="primary" icon="copy" style={{ marginRight: 12 }} ghost>
              添加
            </Button>
          )}

          <Button onClick={() => onDelete(qId)} type="danger" icon="delete" ghost>
            删除
          </Button>
        </div>
      </Form.Item>
    </Card.Grid>
  );
};

export default PollFormCard;
