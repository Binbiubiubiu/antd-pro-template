import React, { FC, useEffect, useState } from 'react';

import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';
import { getSysCodeList } from './service';
import { EasySelectDefaultProps, EasySelectProps } from '.';

interface HouseSceneOption {
  code: string;
  name: string;
}

enum EasySceneSelectType {
  VIDEO = 4,
}

interface EasySceneSelectProps extends SelectProps, EasySelectProps {
  type?: EasySceneSelectType;
}

const EasySceneSelect: FC<EasySceneSelectProps> = React.forwardRef<Select, EasySceneSelectProps>(
  (props, ref) => {
    const { type, hasAll, ...rest } = props;

    const [options, setOptions] = useState<HouseSceneOption[]>([]);

    const fetchOptions = () => {
      getSysCodeList({
        code: type!,
      }).then(res => {
        const { data = [] } = res;
        setOptions(data);
      });
    };

    useEffect(() => {
      fetchOptions();
    }, []);

    return (
      <Select {...rest} ref={ref}>
        {hasAll && <Select.Option value="">全部</Select.Option>}
        {options.map(({ code, name }) => (
          <Select.Option value={code} key={`${name}:${code}`}>
            {name}
          </Select.Option>
        ))}
      </Select>
    );
  },
);

EasySceneSelect.defaultProps = {
  ...EasySelectDefaultProps,
  type: EasySceneSelectType.VIDEO,
};

export default EasySceneSelect;
