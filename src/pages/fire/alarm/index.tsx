import React, { FC } from 'react';

import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { ColumnProps } from 'antd/es/table';
import TimelineChart from '@/pages/fire/alarm/components/TimelineChart';
import { alarmTableData, offlineData } from '@/pages/fire/alarm/_mock';
import EasyTable from '@/easy-components/EasyTable';

import styles from '@/pages/fire/alarm/style.less';

interface AlarmAnalysisProps {}

const AlarmAnalysis: FC<AlarmAnalysisProps> = () => {
  const columns: ColumnProps<ALarmTableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      render(text, record, index) {
        return index + 1;
      },
    },
    {
      title: '小区',
      dataIndex: 'houseName',
    },
    {
      title: '报警状态',
      dataIndex: 'state',
    },
    {
      title: '设备类型',
      dataIndex: 'type',
    },
    {
      title: '设备名称',
      dataIndex: 'equipName',
    },
    {
      title: '设备地址',
      dataIndex: 'address',
    },
    {
      title: '最近报警时间',
      dataIndex: 'alarmTime',
    },
    {
      title: '处理时间',
      dataIndex: 'confirmTime',
    },
  ];

  return (
    <PageHeaderWrapper>
      <GridContent>
        <Card
          className={styles.offlineCard}
          bordered={false}
          style={{
            marginTop: 32,
          }}
        >
          <TimelineChart
            height={400}
            data={offlineData}
            titleMap={{
              y1: '客流量',
              y2: '支付笔数',
            }}
          />

          <EasyTable<ALarmTableItem>
            request={async () => {}}
            rowKey="id"
            columns={columns}
            dataSource={alarmTableData}
          />
        </Card>
      </GridContent>
    </PageHeaderWrapper>
  );
};

export default AlarmAnalysis;
