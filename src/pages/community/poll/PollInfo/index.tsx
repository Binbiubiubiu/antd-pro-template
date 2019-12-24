import React, { FC } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';

interface PollInfoProps {}

const PollInfo: FC<PollInfoProps> = () => (
  <PageHeaderWrapper title="投票详情">
    <Card bordered={false}></Card>
  </PageHeaderWrapper>
);

export default PollInfo;
