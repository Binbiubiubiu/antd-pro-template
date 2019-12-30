import React, { FC, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';

import { RouterTypes } from 'umi';
import { EasyHouseSelect, Gauge, WaterWave } from '@/easy-components';
import PatrolEventList from './components/PatrolEventList';
import PatrolTable from './components/PatrolTable';
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
          value=""
          onChange={val => {
            setHouseKey(val as string);
          }}
          style={{ width: 180 }}
          placeholder="请选择"
          hasAll
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
