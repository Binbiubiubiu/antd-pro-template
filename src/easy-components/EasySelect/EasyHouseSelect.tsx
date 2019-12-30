import React, { FC, useEffect, useState } from 'react';

import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';
import { getHouseListOfSelector } from './service';
import { EasySelectDefaultProps, EasySelectProps } from '.';

interface HouseSelectOption {
  houseName: string;
  houseKey: string;
}

interface EasyHouseSelectProps extends SelectProps, EasySelectProps {}

const EasyHouseSelect: FC<EasyHouseSelectProps> = React.forwardRef<Select, EasyHouseSelectProps>(
  (props, ref) => {
    const { hasAll, ...rest } = props;

    const [options, setOptions] = useState<HouseSelectOption[]>([]);

    const fetchOptions = () => {
      getHouseListOfSelector().then(res => {
        const { data } = res;
        setOptions(data.records || []);
      });
    };

    useEffect(() => {
      fetchOptions();
    }, []);

    return (
      <Select {...rest} ref={ref}>
        {hasAll && <Select.Option value="">全部</Select.Option>}
        {options.map(({ houseKey, houseName }) => (
          <Select.Option value={houseKey} key={`${houseName}:${houseKey}`}>
            {houseName}
          </Select.Option>
        ))}
      </Select>
    );
  },
);

EasyHouseSelect.defaultProps = {
  ...EasySelectDefaultProps,
};

export default EasyHouseSelect;
