import React, { FC, useState } from 'react';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { Button, Card, Col, Form, Input, List, DatePicker, Icon, Tag } from 'antd';
import { usePagableFetch } from '@/hooks/usePagableFetch';
import { queryVideos } from '@/pages/safe/video/service';
import styles from '@/pages/safe/video/style.less';
import EasySearchForm from '@/easy-components/EasySearchForm';
import EasyCardList from '@/easy-components/EasyCardList';
import EasyHouseSelect from '@/easy-components/EasySelect/EasyHouseSelect';
import { GolobalSearchFormLayout } from '@/easy-components/GlobalSetting';
import { EasySceneSelect } from '@/easy-components/EasySelect';
import VideoPlayerModal from '@/pages/safe/video/components/VideoPlayerModal';

const { RangePicker } = DatePicker;

interface VideoCardListProps {}

const VideoCardList: FC<VideoCardListProps> = () => {
  const renderSearchForm = (form: WrappedFormUtils<VideoCardListParams>) => [
    <Col key="houseKey" {...GolobalSearchFormLayout}>
      <Form.Item label="所属小区">
        {form.getFieldDecorator('houseKey', {
          rules: [],
        })(<EasyHouseSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col key="codeChild" {...GolobalSearchFormLayout}>
      <Form.Item label="场景选择">
        {form.getFieldDecorator('codeChild', {
          rules: [],
        })(<EasySceneSelect placeholder="请选择" />)}
      </Form.Item>
    </Col>,
    <Col key="deviceName" {...GolobalSearchFormLayout}>
      <Form.Item label="设备信息">
        {form.getFieldDecorator('deviceName', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>,
    <Col key="timeRange" {...{ md: 18, xl: 12, xxl: 12 }}>
      <Form.Item label="安装时间">
        {form.getFieldDecorator('timeRange', {
          rules: [],
        })(
          <RangePicker
            allowClear={false}
            showTime={{ format: 'HH:mm:ss' }}
            format="YYYY-MM-DD HH:mm:ss"
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
  } = usePagableFetch<VideoCardListItem>({
    initPageSize: 8,
    request: ({ searchForm, pageIndex, pageSize: size }) => {
      const { timeRange, ...rest } = searchForm;

      const start = timeRange ? moment(timeRange[0]).format('YYYY-MM-DD HH:mm:ss') : undefined;
      const end = timeRange ? moment(timeRange[1]).format('YYYY-MM-DD HH:mm:ss') : undefined;
      return queryVideos({ start, end, pageIndex, pageSize: size, ...rest });
    },
    onSuccess: ({ res, setTableData, setTotal }) => {
      setTableData(res.data.records);
      setTotal(res.data.total);
    },
    onError: () => {},
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [playingVideo, setPlayingVideo] = useState<VideoCardListItem>({} as VideoCardListItem);

  const renderCardItem = (item: VideoCardListItem) => {
    const onlineTag =
      item.isOnline === 0 ? <Tag color="#87d068">在线</Tag> : <Tag color="gray">离线</Tag>;

    return (
      <List.Item
        key={item.deviceCode}
        onClick={() => {
          setPlayingVideo(item);
          setModalVisible(true);
        }}
      >
        <Card
          className={styles.card}
          hoverable
          cover={
            <div className={styles['video-preview']}>
              <Icon type="play-square" style={{ color: '#fff' }} />
            </div>
          }
        >
          <Card.Meta
            title={
              <div className={styles['card-title']}>
                <a>{item.deviceName}</a>
                {onlineTag}
              </div>
            }
            description={
              <>
                所属小区：{item.houseName}
                <br />
                安装时间：{item.dateString}
                <br />
                场景：{item.codeChildName}
                <br />
              </>
            }
          />
        </Card>
      </List.Item>
    );
  };

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
      <VideoPlayerModal
        modalVisible={modalVisible}
        video={playingVideo}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
    </PageHeaderWrapper>
  );
};

export default VideoCardList;
