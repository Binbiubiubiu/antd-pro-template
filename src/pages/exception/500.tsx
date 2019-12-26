import React from 'react';
import { Button, Result } from 'antd';

import Link from 'umi/link';

export default () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle="抱歉，服务器出错了。"
    extra={
      <Link to="/">
        <Button type="primary">返回首页</Button>
      </Link>
    }
  />
);
