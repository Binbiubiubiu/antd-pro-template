import React, { FC } from 'react';

import cls from 'classnames';
import styles from './style.less';
import { useFetchImageUrl } from '@/hooks';

interface EasyImageProps {
  src: string;
  style?: React.CSSProperties;
  className?: string;
  /**
   *   高度/宽度
   *   @default 0.6
   */
  rate?: number;
}

const EasyImage: FC<EasyImageProps> = props => {
  const { src, rate, className, style, ...rest } = props;

  const [httpSrc] = useFetchImageUrl({ uri: src });

  if (rate) {
    const computedStyle = Object.assign(
      { backgroundImage: `url(${httpSrc})`, paddingTop: `${rate! * 100}%` },
      style,
    );

    return (
      <div
        className={cls(styles['easy-cover-image'], className)}
        style={computedStyle}
        {...rest}
      ></div>
    );
  }

  return <img alt={src} src={httpSrc} />;
};

export default EasyImage;
