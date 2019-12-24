import React, { FC, useEffect, useState } from 'react';

import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import TimelineChart from '@/pages/fire/alarm/components/AlarmLineChart';
import { offlineData } from '@/pages/fire/alarm/_mock';

import styles from '@/pages/fire/alarm/style.less';
import AlarmTable from '@/pages/fire/alarm/components/AlarmTable';
import { countAlarmByDay } from '@/pages/fire/alarm/service';

interface AlarmAnalysisProps {}

const AlarmAnalysis: FC<AlarmAnalysisProps> = () => (
  <PageHeaderWrapper>
    <GridContent>
      <Card
        className={styles.offlineCard}
        bordered={false}
        style={{
          marginTop: 32,
        }}
      >
        <TimelineChart height={400} />
        <AlarmTable />
      </Card>
    </GridContent>
  </PageHeaderWrapper>
);

export default AlarmAnalysis;
