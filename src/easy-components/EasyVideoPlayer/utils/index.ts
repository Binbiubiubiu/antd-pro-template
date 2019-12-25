/**
 * 验证视频地址
 * @param url
 */
export const isVaildURL = (url: string) => RegExp(/\.(m3u8|mp4)$/i).test(url);

/**
 * 视频类型映射表
 */
const videoTypeMap: { [prop: string]: string } = {
  '.m3u8': 'application/x-mpegURL',
  '.mp4': 'video/mp4',
};

/**
 * 分析视频类型
 * @param url
 */
export const analyzeTypeOfVideo = (url: string) => {
  const videoSuffixMatch = url.match(/\.\w+$/g);
  const videoSuffix =
    videoSuffixMatch && videoSuffixMatch.length > 0 ? videoSuffixMatch[0].toLowerCase() : '';

  return videoTypeMap[videoSuffix];
};
