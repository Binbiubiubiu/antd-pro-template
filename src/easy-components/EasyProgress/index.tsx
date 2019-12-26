import React, { FC } from 'react';

import styles from './style.less';

interface EasyProgressProps {
  value?: number;
}

const EasyProgress: FC<EasyProgressProps> = props => {
  const { value } = props;

  return (
    <div className={styles['easy-progress']}>
      <svg width="100%" height="20" viewBox="0 0 100% 20">
        <rect x="0" y="0" rx="10" ry="10" width="100%" height="20" fill="#E3E4E6" />
        <rect
          className={styles.active}
          x="0"
          y="0"
          rx="10"
          ry="10"
          width={`${value}%`}
          height="20"
          fill="#448EF7"
        />
      </svg>
      <i>{value}%</i>
    </div>
  );
};

EasyProgress.defaultProps = {
  value: 0,
};

export default EasyProgress;
