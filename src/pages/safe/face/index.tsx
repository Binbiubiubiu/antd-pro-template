import React, { FC } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, List } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WrappedFormUtils } from 'antd/es/form/Form';
import EasyCardList from '@/easy-components/EasyCardList';
import { EasyHouseSelect } from '@/easy-components/EasySelect';
import EasySearchForm from '@/easy-components/EasySearchForm';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';
import { queryVideos } from './service';
import styles from '@/pages/safe/video/style.less';
import { usePagableFetch } from '@/hooks';
import EasyImage from '@/easy-components/EasyImage';
import { openImagePreview } from '@/models/image-preview';
import { ConnectProps } from '@/models/connect';

const { RangePicker } = DatePicker;

interface FaceCardListProps extends ConnectProps {}

const FaceCardList: FC<FaceCardListProps> = props => {
  const { dispatch } = props;

  const renderSearchForm = (form: WrappedFormUtils<PeopleFaceListSearch>) => [
    <Col key="houseId" {...GolobalSearchFormLayout}>
      <Form.Item key="houseId" label="所属小区">
        {form.getFieldDecorator('houseId', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col key="scene" {...GolobalSearchFormLayout}>
      <Form.Item key="scene" label="场景选择">
        {form.getFieldDecorator('scene', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col key="timeRange" {...{ md: 18, xl: 12, xxl: 9 }}>
      <Form.Item label="日期范围">
        {form.getFieldDecorator('timeRange', {
          rules: [],
        })(
          <RangePicker
            allowClear={false}
            showTime={false}
            format="YYYY-MM-DD"
            style={{ width: '100%' }}
          />,
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
    PeopleFaceListItem
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

  const renderCardItem = (item: PeopleFaceListItem) => (
    <List.Item
      onClick={() => {
        if (item.pic) {
          openImagePreview(dispatch, item.pic);
        }
      }}
    >
      <Card className={styles.card} hoverable cover={<EasyImage rate={0.6} src={item.pic} />}>
        <Card.Meta
          title={<a>{item.carCode}</a>}
          description={
            <>
              所属小区：{item.houseName}
              <br />
              车主：{item.ownerName}
              <br />
              抓拍地点：{item.doorName}
              <br />
              通行情况：{item.inOut ? '出' : '进'}
              <br />
              抓拍时间：{moment(item.happenTime).format('YYYY-MM-DD HH:mm:ss')}
            </>
          }
        />
      </Card>
    </List.Item>
  );

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
        <EasyCardList<PeopleFaceListItem>
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
          renderItem={renderCardItem}
        />
      </div>
    </PageHeaderWrapper>
  );
};

export default connect()(FaceCardList);
