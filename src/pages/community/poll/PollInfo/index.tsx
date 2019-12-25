import React, { FC } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Col, Row, Typography } from 'antd';

import styles from './style.less';
import PollInfoTable from '@/pages/community/poll/components/PollInfoTable';

const { Title, Paragraph } = Typography;

const tableLayout = {
  xxl: { span: 16, offset: 4 },
  xl: { span: 20, offset: 2 },
};

interface PollInfoProps {}

const PollInfo: FC<PollInfoProps> = () => (
  <PageHeaderWrapper title="投票详情" className={styles['poll-info']}>
    <Card bordered={false}>
      <Typography>
        <Title level={4}>第一届业主代表海选</Title>
        <Paragraph>发送对象：美哉美城、盈一佳苑</Paragraph>
        <Paragraph>起止时间：2019.12.18 - 2019.12.25</Paragraph>
        <Paragraph>&nbsp;</Paragraph>
      </Typography>
      <Row gutter={[16, 40]}>
        <Col {...tableLayout}>
          <PollInfoTable
            title="第一题"
            dataSource={[
              {
                option: '男',
                num: 1,
                rate: 0.2,
              },
              {
                option: '女',
                num: 20,
                rate: 0.1,
              },
            ]}
          />
        </Col>
      </Row>
    </Card>
  </PageHeaderWrapper>
);

export default PollInfo;
