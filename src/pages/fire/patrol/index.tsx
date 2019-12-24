import { Card, Col, Row, Statistic } from 'antd';
import React, { FC } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import numeral from 'numeral';
import Gauge from '@/easy-components/EasyChart/Gauge';
import WaterWave from '@/easy-components/EasyChart/WaterWave';
import PatrolTable from '@/pages/fire/patrol/components/PatrolTable';
import PatrolEventList from '@/pages/fire/patrol/components/PatrolEventList';

interface PatrolProps {}

const Patrol: FC<PatrolProps> = () => (
  <GridContent>
    <React.Fragment>
      <Row gutter={24}>
        <Col
          xl={18}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <Row>
              <Col md={6} sm={12} xs={24}>
                <Statistic
                  title="今日交易总额"
                  suffix="元"
                  value={numeral(124543233).format('0,0')}
                />
              </Col>
              <Col md={6} sm={12} xs={24}>
                <Statistic title="销售目标完成率" value="92%" />
              </Col>
              <Col md={6} sm={12} xs={24}>
                <Statistic title="销售目标完成率" value="92%" />
              </Col>
              <Col md={6} sm={12} xs={24}>
                <Statistic title="每秒交易总额" suffix="元" value={numeral(234).format('0,0')} />
              </Col>
            </Row>
          </Card>
          <PatrolTable />
          <PatrolEventList />
        </Col>
        <Col xl={6} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="今日安防状态"
            style={{
              marginBottom: 24,
            }}
            bodyStyle={{
              textAlign: 'center',
            }}
            bordered={false}
          >
            <Gauge title="跳出率" height={180} percent={87} />
          </Card>

          <Card
            title="今日巡更完成率"
            bodyStyle={{
              textAlign: 'center',
              fontSize: 0,
            }}
            bordered={false}
          >
            <WaterWave height={161} title="补贴资金剩余" percent={34} />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  </GridContent>
);

export default Patrol;
