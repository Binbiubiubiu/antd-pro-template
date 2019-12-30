import React, { FC, Suspense, useState } from 'react';

import { Card, Col, Row, Statistic } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';

const PatrolPeople = React.lazy(() => import('./PatrolPeopleTable'));
const PatrolPoint = React.lazy(() => import('./PatrolPointTable'));
const PatrolTask = React.lazy(() => import('./PatrolTaskTable'));
const PatrolError = React.lazy(() => import('./PatrolErrorTable'));

const tableList = [PatrolPeople, PatrolPoint, PatrolTask, PatrolError];

const patrolStatistic = [
  {
    title: '巡更人员数',
    suffix: '人',
  },
  {
    title: '巡更点位数',
    suffix: '个',
  },
  {
    title: '今日巡更任务',
    suffix: '个',
  },
  {
    title: '今日巡更异常',
    suffix: '个',
  },
];

interface PatrolTableProps {}

const PatrolTable: FC<PatrolTableProps> = () => {
  const [numbers, setNumbers] = useState<number[]>([0, 0, 0, 0]);
  const [activeTable, setActiveTable] = useState<number>(0);

  const ActiveTable = tableList[activeTable];

  return (
    <React.Fragment>
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Row>
          {patrolStatistic.map((statistic, i) => (
            <Col md={6} sm={12} xs={24}>
              <div onClick={() => setActiveTable(i)}>
                <Statistic {...statistic} value={numbers[i]} />
              </div>
            </Col>
          ))}
        </Row>
      </Card>
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Suspense fallback={<PageLoading />}>
          <ActiveTable />
        </Suspense>
      </Card>
    </React.Fragment>
  );
};

export default PatrolTable;
