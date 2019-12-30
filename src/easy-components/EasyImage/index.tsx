import React, { FC, useEffect, useState } from 'react';

import cls from 'classnames';
import styles from './style.less';
// import Image404 from '@/assets/img_404.jpg';
import Image500 from '@/assets/img_500.jpg';

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

  const [err, setErr] = useState<boolean>(false);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setErr(false);
    };
    img.onerror = () => {
      setErr(true);
    };
  }, [src]);

  // 初次渲染不显示暂无图片
  // if( !src){
  //   return <img alt="暂无图片" src={Image404}/>;
  // }

  if (err) {
    return <img alt="加载失败" src={Image500} />;
  }

  if (rate) {
    const computedStyle = Object.assign(
      { backgroundImage: `url(${src})`, paddingTop: `${rate! * 100}%` },
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

  return <img alt={src} src={src} />;
};

export default React.memo(EasyImage);
