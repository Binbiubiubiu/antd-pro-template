import React, { Component } from 'react';

import E from 'wangeditor';
import styles from './style.less';

const defaultEasyRichTextSetting = [
  'head', // 标题
  'bold', // 粗体
  'fontSize', // 字号
  'fontName', // 字体
  'italic', // 斜体
  'underline', // 下划线
  'strikeThrough', // 删除线
  'foreColor', // 文字颜色
  'backColor', // 背景颜色
  'link', // 插入链接
  'list', // 列表
  'justify', // 对齐方式
  'quote', // 引用
  // 'emoticon',  // 表情
  'image', // 插入图片
  // 'table',  // 表格
  // 'video',  // 插入视频
  // 'code',  // 插入代码
  'undo', // 撤销
  'redo', // 重复
];

interface EasyRichTextProps {
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

class EasyRichText extends Component<EasyRichTextProps> {
  private Ele: React.RefObject<HTMLDivElement>;

  constructor(props: EasyRichTextProps) {
    super(props);

    this.Ele = React.createRef();
  }

  componentDidMount() {
    this.initEditor();
  }

  initEditor = () => {
    const { value, onChange } = this.props;
    const editor = new E(this.Ele.current as HTMLElement);
    // editor.customConfig.uploadFileName = 'upfile' //置上传接口的文本流字段
    // editor.customConfig.uploadImgServer = 'https://dev.xiaomon.com/api/treeroot/v1/xxx/upload/uploadImage'//服务器接口地址
    // editor.customConfig.uploadImgHooks = {
    //   customInsert: (insertImg, result, editor) => {
    //     const url = result.url  //监听图片上传成功更新页面
    //     insertImg(url)
    //   }
    // }
    editor.customConfig.uploadImgShowBase64 = true;
    editor.customConfig.onchange = (html: string) => {
      // html 即变化之后的内容
      if (onChange) {
        onChange(html);
      }
    };
    editor.customConfig.menus = defaultEasyRichTextSetting;
    editor.create();
    editor.txt.html(value || '');
  };

  render() {
    const { value, onChange, ...rest } = this.props;

    return <div ref={this.Ele} className={styles['easy-richtext']} {...rest}></div>;
  }
}

export default EasyRichText;
