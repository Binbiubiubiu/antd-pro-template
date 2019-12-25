import React, { Component, CSSProperties } from 'react';
import cls from 'classnames';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import defaultVideoPlayerConfig from './utils/default-config';
import { analyzeTypeOfVideo, isVaildURL } from './utils';

import styles from './style.less';

const defaultProps = {
  width: 400,
  height: 240,
};

export interface EasyVideoPlayerProps {
  /**
   * 视频播放路径
   */
  src: string;
  /** 图标宽度
   *
   * @default 400
   */
  width?: number | string;
  /** 图标高度
   *
   * @default 240
   */
  height?: number | string;
  /**
   * 视频覆盖默认配置一些设置
   */
  config?: object;
  /** 自定义class */
  className?: string;
  /** 样式前缀 */
  prefixCls?: string;
  /** 自定义style */
  style?: CSSProperties;
}

type EasyVideoPlayerState = {
  isURLValid: boolean;
  error: boolean;
};

class EasyVideoPlayer extends Component<EasyVideoPlayerProps, EasyVideoPlayerState> {
  player: any;

  videoNode: React.RefObject<HTMLVideoElement>;

  static defaultProps = defaultProps;

  constructor(props: Readonly<EasyVideoPlayerProps>) {
    super(props);
    this.videoNode = React.createRef();
    this.state = {
      isURLValid: true,
      error: false,
    };
  }

  componentDidMount() {
    const { src, config } = this.props;

    // 验证url 是否正确
    if (!isVaildURL(src)) {
      this.setState({
        error: true,
        isURLValid: false,
      });
      return;
    }

    const playerConfig = Object.assign({}, defaultVideoPlayerConfig, config, {
      sources: [
        {
          src,
          type: analyzeTypeOfVideo(src),
        },
      ],
    });
    // console.log(playerConfig);
    // instantiate Video.js
    this.player = videojs(this.videoNode.current, playerConfig);
    this.player.on('error', this.addVideoPlayerErrorListener);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.off('error', this.addVideoPlayerErrorListener);
      this.player.dispose();
      this.player = null;
    }
  }

  /** videojs  视频流获取失败 错误处理 */
  addVideoPlayerErrorListener = () => {
    this.setState(() => ({ error: true }));
  };

  renderError() {
    const { isURLValid } = this.state;

    return (
      <div className={styles['easy-video-player__error']}>
        {isURLValid ? '视频播放异常' : '未安装'}
      </div>
    );
  }

  render() {
    const { width, height, style, className } = this.props;
    const { error } = this.state;

    return (
      <div
        className={cls(styles['easy-video-player__wrapper'], className)}
        style={{
          width,
          height,
          ...style,
        }}
      >
        <video ref={this.videoNode} className={cls('video-js', styles['easy-video-player'])} />
        {error && this.renderError()}
      </div>
    );
  }
}

export default EasyVideoPlayer;
