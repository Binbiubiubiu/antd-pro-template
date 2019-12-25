import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'antd';
import EasyVideoPlayer from '@/easy-components/EasyVideoPlayer';
import { queryVideosByCode } from '@/pages/safe/video/service';

interface VideoPlayerModalProps {
  modalVisible: boolean;
  video: VideoCardListItem;
  onCancel: () => void;
}

const videoPlayerSize = {
  width: 600,
  height: 400,
};

const VideoPlayerModal: FC<VideoPlayerModalProps> = props => {
  const { modalVisible, video, onCancel } = props;

  const [videoUrl, setVideoUrl] = useState<string>('');

  useEffect(() => {
    if (!modalVisible) return;

    queryVideosByCode({
      indexCodeId: video.deviceCode,
      houseKey: video.houseKey,
    })
      .then(res => {
        setVideoUrl(res.data || '');
      })
      .catch(err => {
        setVideoUrl('错误url');
      });
  }, [modalVisible]);

  const handleModalClose = () => {
    setVideoUrl('');
    onCancel();
  };

  return (
    <Modal
      width={videoPlayerSize.width}
      footer={null}
      bodyStyle={{ padding: 0, ...videoPlayerSize, backgroundColor: '#000' }}
      destroyOnClose
      title={video.deviceName}
      visible={modalVisible}
      onCancel={handleModalClose}
    >
      {videoUrl && <EasyVideoPlayer src={videoUrl} {...videoPlayerSize} />}
    </Modal>
  );
};

export default VideoPlayerModal;
