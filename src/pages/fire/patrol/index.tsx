import React, { FC, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';

import { RouterTypes } from 'umi';
import numeral from 'numeral';
import { EasyHouseSelect } from '@/easy-components/EasySelect';
import Gauge from '@/easy-components/EasyChart/Gauge';
import PatrolEventList from './components/PatrolEventList';
import PatrolTable from './components/PatrolTable';
import WaterWave from '@/easy-components/EasyChart/WaterWave';
import styles from './style.less';

export const PatrolPageContext = React.createContext<string>('');

interface PatrolProps extends RouterTypes<{ name: string }> {}

const Patrol: FC<PatrolProps> = props => {
  const { route } = props;
  const [houseKey, setHouseKey] = useState<string>('');

  const pageTitle = (
    <Row type="flex" justify="space-between">
      <span>{route!.name}</span>
      <div className={styles['house-select']}>
        <span>所属小区：</span>
        <EasyHouseSelect
          onChange={val => {
            setHouseKey(val as string);
          }}
          style={{ width: 180 }}
          placeholder="请选择"
        />
      </div>
    </Row>
  );

  return (
    <PageHeaderWrapper className={styles['patrol-header']} title={pageTitle}>
      <PatrolPageContext.Provider value={houseKey}>
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
                      <Statistic
                        title="每秒交易总额"
                        suffix="元"
                        value={numeral(234).format('0,0')}
                      />
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
                  <Gauge title="状态" height={180} percent={40} />
                </Card>

                <Card
                  title="今日巡更完成率"
                  bodyStyle={{
                    textAlign: 'center',
                    fontSize: 0,
                  }}
                  bordered={false}
                >
                  <WaterWave height={161} title="完成率" percent={34} />
                </Card>
              </Col>
            </Row>
          </React.Fragment>
        </GridContent>
      </PatrolPageContext.Provider>
    </PageHeaderWrapper>
  );
};

export default Patrol;
