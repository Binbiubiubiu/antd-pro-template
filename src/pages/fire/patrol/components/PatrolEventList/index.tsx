import React, { FC } from 'react';
import { Avatar, Card, List } from 'antd';

import moment from 'moment';
import { getPatrolEvent } from '@/pages/fire/patrol/_mock';
import styles from '../../style.less';

interface PatrolEventListProps {}

const PatrolEventList: FC<PatrolEventListProps> = () => {
  const renderActivities = (item: any) => (
    // const events = item.template.split(/@\{([^{}]*)\}/gi).map((key: React.ReactText) => {
    //   if (item[key]) {
    //     return (
    //       <a href={item[key].link} key={item[key].name}>
    //         {item[key].name}
    //       </a>
    //     );
    //   }
    //   return key;
    // });

    <List.Item key={item.id}>
      <List.Item.Meta
        avatar={<Avatar src={item.user} />}
        title={
          <span>
            <a className={styles.username}>{item.name}</a>
            &nbsp;
            <span className={styles.event}>在 &nbsp;{item.eventName}</span>
          </span>
        }
        description={
          <span className={styles.datetime} title={item.createTime}>
            {moment(item.createTime).fromNow()}
          </span>
        }
      />
    </List.Item>
  );

  return (
    <Card bodyStyle={{ padding: 0 }} bordered={false} title="动态">
      <List<any>
        renderItem={item => renderActivities(item)}
        dataSource={getPatrolEvent()}
        className={styles.activitiesList}
        size="large"
      />
    </Card>
  );
};

export default PatrolEventList;
