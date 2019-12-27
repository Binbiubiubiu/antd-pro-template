import React, { FC } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, List, Select } from 'antd';
import moment from 'moment';
import { connect } from 'dva';

import { WrappedFormUtils } from 'antd/es/form/Form';
import {
  EasyCardList,
  EasyHouseSelect,
  EasyImage,
  EasySearchForm,
  GolobalSearchFormLayout,
} from '@/easy-components';
import { getCarInOutListPage } from './service';

import { usePagableFetch } from '@/hooks';
import { ConnectProps } from '@/models/connect';
import { openImagePreview } from '@/models/image-preview';
import { CarAccessListItem, CarAccessListSearch } from './data.d';

import styles from '../style.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface CarAccessListProps extends ConnectProps {}

const CarAccessList: FC<CarAccessListProps> = props => {
  const { dispatch } = props;

  const renderSearchForm = (form: WrappedFormUtils<CarAccessListSearch>) => [
    <Col key="houseKey" {...GolobalSearchFormLayout}>
      <Form.Item label="所属小区">
        {form.getFieldDecorator('houseKey', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col key="nameOrCarCode" {...GolobalSearchFormLayout}>
      <Form.Item label="车辆信息">
        {form.getFieldDecorator('nameOrCarCode', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col key="inOut" {...GolobalSearchFormLayout}>
      <Form.Item label="通行情况">
        {form.getFieldDecorator('inOut', {
          rules: [],
        })(
          <Select placeholder="请选择">
            <Option value={0}>进</Option>
            <Option value={1}>出</Option>
          </Select>,
        )}
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

  const {
    loading,
    tableData,
    current,
    pageSize,
    total,
    setCurrent,
    setSearchForm,
  } = usePagableFetch<CarAccessListItem>({
    initPageSize: 8,
    request: ({ searchForm, pageIndex, pageSize: size }) => {
      const { timeRange, ...rest } = searchForm;

      const startTime = timeRange ? moment(timeRange[0]).format('YYYY-MM-DD') : undefined;
      const endTime = timeRange ? moment(timeRange[1]).format('YYYY-MM-DD') : undefined;
      return getCarInOutListPage({ startTime, endTime, pageIndex, pageSize: size, ...rest });
    },
    onSuccess: ({ res, setTableData, setTotal }) => {
      setTableData(res.data.records);
      setTotal(res.data.total);
    },
    onError: () => {},
  });

  const renderCardItem = (item: CarAccessListItem) => (
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
    <div className={styles.coverCardList}>
      <EasySearchForm
        onSubmit={form => {
          setSearchForm(form);
          setCurrent(1);
        }}
        renderSearchFormItem={renderSearchForm}
        wrappedWithCard
      />
      <EasyCardList<CarAccessListItem>
        rowKey="id"
        loading={loading}
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
  );
};

export default connect()(CarAccessList);
