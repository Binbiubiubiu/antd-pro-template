import React, { FC, useEffect, useState } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';
import { getHouseListOfSelector } from '@/easy-components/EasySelect/service';

interface HouseSelectOption {
  houseName: string;
  houseKey: string;
}

interface EasyHouseSelectProps extends SelectProps {}

const EasyHouseSelect: FC<EasyHouseSelectProps> = React.forwardRef<Select, EasyHouseSelectProps>(
  (props, ref) => {
    const [options, setOptions] = useState<HouseSelectOption[]>([]);

    useEffect(() => {
      getHouseListOfSelector().then(res => {
        const { data = [] } = res;
        setOptions(data);
      });
    }, []);

    return (
      <Select {...props} ref={ref}>
        {options.map(({ houseKey, houseName }) => (
          <Select.Option value={houseKey} key={`${houseName}:${houseKey}`}>
            {houseName}
          </Select.Option>
        ))}
      </Select>
    );
  },
);

export default EasyHouseSelect;
