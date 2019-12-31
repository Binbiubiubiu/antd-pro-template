import React, { FC } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, List } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { ConnectProps } from '@/models/connect';
import {
  EasyCardList,
  EasyHouseSelect,
  EasyImage,
  EasySearchForm,
  GolobalSearchFormLayout,
} from '@/easy-components';
import { queryFaceLog } from './service';

import { useFetchImageList, usePagableFetch } from '@/hooks';
import { openImagePreview } from '@/models/image-preview';
import { PeopleFaceListItem, PeopleFaceListSearch } from './data.d';

import styles from './style.less';

const { RangePicker } = DatePicker;

interface FaceCardListProps extends ConnectProps {}

const FaceCardList: FC<FaceCardListProps> = props => {
  const { dispatch } = props;

  const renderSearchForm = (form: WrappedFormUtils<PeopleFaceListSearch>) => [
    <Col key="houseKey" {...GolobalSearchFormLayout}>
      <Form.Item label="所属小区">
        {form.getFieldDecorator('houseKey', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col key="devicePosition" {...GolobalSearchFormLayout}>
      <Form.Item label="抓拍点位">
        {form.getFieldDecorator('devicePosition', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col key="timeRange" {...{ md: 18, xl: 12, xxl: 9 }}>
      <Form.Item label="抓拍时间">
        {form.getFieldDecorator('timeRange', {
          rules: [],
        })(
          <RangePicker
            allowClear={false}
            showTime={{ format: 'HH:mm:ss' }}
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
            placeholder={['开始时间', '结束时间']}
          />,
        )}
      </Form.Item>
    </Col>,
    <Col key="options" {...GolobalSearchFormLayout} xxl={3}>
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

  const [imgUrls, fetchImageUrl] = useFetchImageList([]);

  const { tableData, current, pageSize, total, setCurrent, setSearchForm } = usePagableFetch<
    PeopleFaceListItem
  >({
    initPageSize: 8,
    request: ({ searchForm, pageIndex, pageSize: size }) => {
      const { timeRange, ...rest } = searchForm;

      const startTime = timeRange ? moment(timeRange[0]).format('YYYY-MM-DD HH:mm:ss') : undefined;
      const endTime = timeRange ? moment(timeRange[1]).format('YYYY-MM-DD HH:mm:ss') : undefined;
      return queryFaceLog({ pageIndex, pageSize: size, startTime, endTime, ...rest });
    },
    onSuccess: ({ res, setTableData, setTotal }) => {
      const arr: PeopleFaceListItem[] = res.data.records;
      setTableData(arr);
      fetchImageUrl(arr.map(item => item.pic));
      setTotal(res.data.total);
    },
    onError: () => {},
  });

  const renderCardItem = (item: PeopleFaceListItem, i: number) => (
    <List.Item
      onClick={() => {
        if (item.pic) {
          openImagePreview(dispatch, item.pic);
        }
      }}
    >
      <Card className={styles.card} hoverable cover={<EasyImage rate={0.6} src={imgUrls[i]} />}>
        <Card.Meta
          title={<a>{item.devicePosition}</a>}
          description={
            <>
              所属小区：{item.houseName}
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
