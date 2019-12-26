import React, { FC } from 'react';

import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import TimelineChart from '@/pages/fire/alarm/components/AlarmLineChart';

import AlarmTable from '@/pages/fire/alarm/components/AlarmTable';

interface AlarmAnalysisProps {}

const AlarmAnalysis: FC<AlarmAnalysisProps> = () => (
  <PageHeaderWrapper>
    <GridContent>
      <Card bordered={false}>
        <TimelineChart height={400} />
        <AlarmTable />
      </Card>
    </GridContent>
  </PageHeaderWrapper>
);

export default AlarmAnalysis;
