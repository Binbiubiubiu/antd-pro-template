import React, { FC, useEffect, useState } from 'react';

import cls from 'classnames';
import { getUrlByUri } from '@/easy-components/EasyImage/service';
import styles from './style.less';

interface EasyImageProps {
  src: string;
  style?: React.CSSProperties;
  className?: string;
}

const EasyImage: FC<EasyImageProps> = props => {
  const { src, className, style, ...rest } = props;

  const [httpSrc, setHttpSrc] = useState<string>('');

  useEffect(() => {
    getUrlByUri({ uri: src }).then(res => {
      setHttpSrc(res.data || '');
    });
  }, []);

  return (
    <div
      className={cls(styles['easy-image'], className)}
      style={{ backgroundImage: `url(${httpSrc})`, ...style }}
      {...rest}
    ></div>
  );
};

export default EasyImage;
