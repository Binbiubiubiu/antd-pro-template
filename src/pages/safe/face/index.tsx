import React, { FC } from 'react';
import { Button, Card, Col, Form, Input, List, Select, Typography } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WrappedFormUtils } from 'antd/es/form/Form';
import moment from 'moment';
import EasyCardList from '@/easy-components/EasyCardList';
import { EasyHouseSelect } from '@/easy-components/EasySelect';
import EasySearchForm from '@/easy-components/EasySearchForm';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';
import { queryVideos } from './service';
import styles from '@/pages/safe/video/style.less';
import { usePagableFetch } from '@/hooks/usePagableFetch';

const { Paragraph } = Typography;
const { Option } = Select;

interface FaceCardListProps {}

const FaceCardList: FC<FaceCardListProps> = () => {
  const renderSearchForm = (form: WrappedFormUtils<VideoCardListParams>) => [
    <Col key="houseId" {...GolobalSearchFormLayout}>
      <Form.Item key="houseId" label="所属小区">
        {form.getFieldDecorator('houseId', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col key="person" {...GolobalSearchFormLayout}>
      <Form.Item key="person" label="安装时间">
        {form.getFieldDecorator('person', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col key="scene" {...GolobalSearchFormLayout}>
      <Form.Item key="scene" label="场景选择">
        {form.getFieldDecorator('scene', {
          rules: [],
        })(
          <Select placeholder="请选择">
            <Option value="1">利一家园</Option>
            <Option value="2">望京</Option>
          </Select>,
        )}
      </Form.Item>
    </Col>,
    <Col key="type" {...GolobalSearchFormLayout}>
      <Form.Item key="type" label="设备信息">
        {form.getFieldDecorator('type', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col key="options" {...GolobalSearchFormLayout}>
      <Form.Item key="options">
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button
          onClick={() => {
            form.resetFields();
          }}
          style={{ marginLeft: 8 }}
        >
          重置
        </Button>
      </Form.Item>
    </Col>,
  ];

  const { tableData, current, pageSize, total, setCurrent, setSearchForm } = usePagableFetch<
    VideoCardListItem
  >({
    initPageSize: 8,
    request: ({ searchForm, pageIndex, pageSize: size }) =>
      queryVideos({ ...searchForm, pageIndex, pageSize: size }),
    onSuccess: ({ res, setTableData, setTotal }) => {
      setTableData(res);
      setTotal(res.length);
    },
    onError: () => {},
  });

  return (
    <PageHeaderWrapper>
      <div className={styles.coverCardList}>
        <EasySearchForm
          onSubmit={form => {
            setSearchForm(form);
            setCurrent(1);
          }}
          renderSearchFormItem={renderSearchForm}
          wrappedWithCard
        />
        <EasyCardList<VideoCardListItem>
          rowKey="id"
          pagination={{
            current,
            pageSize,
            total,
            onChange(index) {
              setCurrent(index);
            },
          }}
          dataSource={tableData}
          renderItem={item => (
            <List.Item>
              <Card
                className={styles.card}
                hoverable
                cover={<img alt={item.title} src={item.cover} />}
              >
                <Card.Meta
                  title={<a>{item.title}</a>}
                  description={
                    <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                      {item.subDescription}
                    </Paragraph>
                  }
                />
                <div className={styles.cardItemContent}>
                  <span>{moment(item.updatedAt).fromNow()}</span>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </PageHeaderWrapper>
  );
};

export default FaceCardList;
