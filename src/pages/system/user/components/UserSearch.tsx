import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { queryHouse, HouseModal } from '@/pages/system/user/services/house.service';
import { UserTableParams } from '@/pages/system/user/services/user.service';

const FormItem = Form.Item;
const { Option } = Select;

interface UserSearchProps extends FormComponentProps {
  onSubmit: (fieldsValue: UserTableParams) => void;
}

const UserSearch: FC<UserSearchProps> = props => {
  const { onSubmit, form } = props;

  const [houseList, setHouseList] = useState<HouseModal[]>([]);

  useEffect(() => {
    queryHouse({
      pageIndex: 1,
      pageSize: 999999,
    }).then(res => {
      const { data } = res;
      setHouseList(data ? data.records : []);
    });
  }, []);

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
      <FormItem key="param" label="角色/姓名">
        {form.getFieldDecorator('param', {
          initialValue: '',
          rules: [],
        })(<Input placeholder="请输入" type="sort" />)}
      </FormItem>
      <FormItem key="houseId" label="小区">
        {form.getFieldDecorator('houseId', {
          rules: [],
        })(
          <Select placeholder="请选择" style={{ width: 200 }}>
            {houseList.map(() => (
              <Option value="male">male</Option>
            ))}
          </Select>,
        )}
      </FormItem>
      <FormItem>
        <Button onClick={handleSubmit} type="primary" htmlType="submit">
          查询
        </Button>
      </FormItem>
      <FormItem>
        <Button
          onClick={() => {
            form.resetFields();
          }}
        >
          重置
        </Button>
      </FormItem>
    </Form>
  );
};

export default Form.create<UserSearchProps>()(UserSearch);
