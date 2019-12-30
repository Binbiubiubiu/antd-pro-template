import React, { FC, ReactEventHandler } from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import styles from './style.less';
import { hideImagePreview } from '@/models/image-preview';
import { useFetchImage } from '@/hooks';

interface EasyImagePreviewProps extends ConnectProps {
  src: string;
  isLocal: boolean;
}

const EasyImagePreview: FC<EasyImagePreviewProps> = props => {
  const { src, isLocal, dispatch } = props;

  const [uri, loading] = useFetchImage(src, isLocal);

  if (!uri) {
    return null;
  }

  const notFind: ReactEventHandler<HTMLImageElement> = e => {
    const img = e.target as HTMLImageElement;
    img.src = require('@/assets/img_500.jpg');
    img.width = 285;
    img.height = 178;
    img.onerror = null;
  };

  return (
    <div className={styles['easy-image-preview-bg']}>
      <div className={styles['easy-image-preview']}>
        {!loading && (
          <i onClick={() => hideImagePreview(dispatch)} className={styles['close-icon']}></i>
        )}
        <img alt={src} src={uri} onError={notFind} />
      </div>
    </div>
  );
};

export default connect(({ imagePreview }: ConnectState) => ({
  src: imagePreview.url,
  isLocal: imagePreview.isLocal,
}))(EasyImagePreview);
