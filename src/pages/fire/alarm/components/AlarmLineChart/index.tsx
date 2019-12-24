import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';

import React, { FC, useEffect, useState } from 'react';
import autoHeight from '@/easy-components/EasyChart/autoHeight';
import styles from './index.less';
import { countAlarmByDay } from '@/pages/fire/alarm/service';

export interface AlarmLineChartProps {
  title?: string;
  padding?: [number, number, number, number];
  height?: number;
  style?: React.CSSProperties;
}

const AlarmLineChart: FC<AlarmLineChartProps> = props => {
  const {
    title,
    height = 400,
    padding = [60, 20, 40, 40] as [number, number, number, number],
  } = props;

  const cols = {
    data: {
      name: 'asdf',
      min: 0,
    },
    mark: {
      range: [0, 1],
    },
  };

  const [lineData, setLineData] = useState<Array<{ mark: string; data: number }>>([]);

  useEffect(() => {
    countAlarmByDay({ dayCount: 7 }).then(res => {
      setLineData(res.data.reverse());
    });
  }, []);

  return (
    <div className={styles.timelineChart} style={{ height: height + 30 }}>
      <div>
        {title && <h4>{title}</h4>}
        <Chart height={height} padding={padding} data={lineData} scale={cols} forceFit>
          <Axis name="mark" />
          <Axis name="data" />
          <Tooltip />
          <Legend name="key" position="top" />
          <Geom
            type="line"
            position="mark*data"
            size={2}
            shape="smooth"
            tooltip={[
              'mark*data',
              (mark, data) => ({
                name: '报警次数',
                value: data,
              }),
            ]}
          />
          <Geom
            type="point"
            position="mark*data"
            size={4}
            shape="circle"
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    </div>
  );
};

export default autoHeight()(AlarmLineChart);
