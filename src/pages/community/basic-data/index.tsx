import React, { Suspense, useState } from 'react';
import { PageHeaderWrapper, PageLoading } from '@ant-design/pro-layout';

import { RouteComponentProps } from 'react-router';

const PeopleTable = React.lazy(() => import('./people'));
const CarTable = React.lazy(() => import('./car'));
const HouseTable = React.lazy(() => import('./house'));

const TabComps = {
  people: PeopleTable,
  car: CarTable,
  house: HouseTable,
};

const defaultTabsSetting = [
  {
    key: 'people',
    tab: '一人一档',
  },
  {
    key: 'car',
    tab: '一车一档',
  },
  {
    key: 'house',
    tab: '一屋一档',
  },
];

const firstTabKey = defaultTabsSetting[0] ? defaultTabsSetting[0].key : '';

interface BasicDataTableProps extends RouteComponentProps {}

const BasicDataTable: React.FC<BasicDataTableProps> = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>(firstTabKey);

  const ActiveTabComp = TabComps[activeTabKey];

  return (
    <PageHeaderWrapper
      tabActiveKey={activeTabKey}
      onTabChange={key => {
        setActiveTabKey(key);
      }}
      tabList={defaultTabsSetting}
    >
      <Suspense fallback={<PageLoading />}>
        <ActiveTabComp></ActiveTabComp>
      </Suspense>
    </PageHeaderWrapper>
  );
};

export default BasicDataTable;
