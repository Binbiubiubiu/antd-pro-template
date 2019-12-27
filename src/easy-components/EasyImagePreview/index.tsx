import React, { FC } from 'react';
import { connect } from 'dva';
import { useFetchImageUrl } from '@/hooks';
import { ConnectProps, ConnectState } from '@/models/connect';
import styles from './style.less';
import { hideImagePreview } from '@/models/image-preview';

interface EasyImagePreviewProps extends ConnectProps {
  src: string;
}

const EasyImagePreview: FC<EasyImagePreviewProps> = props => {
  const { src, dispatch } = props;

  const [httpSrc] = useFetchImageUrl({ uri: src });

  if (!src) return null;

  return (
    <div className={styles['easy-image-preview-bg']}>
      <div className={styles['easy-image-preview']}>
        <i onClick={() => hideImagePreview(dispatch)} className={styles['close-icon']}></i>
        <img alt={src} src={httpSrc}></img>
      </div>
    </div>
  );
};

export default connect(({ imagePreview }: ConnectState) => ({
  src: imagePreview.url,
}))(EasyImagePreview);
