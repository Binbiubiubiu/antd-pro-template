import React, { FC, Suspense, useState } from 'react';
import { PageHeaderWrapper, PageLoading } from '@ant-design/pro-layout';

const PeopleTable = React.lazy(() => import('./people'));
const CarTable = React.lazy(() => import('./car'));

const tabList = [
  {
    key: 'people',
    tab: '人行记录',
  },
  {
    key: 'car',
    tab: '车行记录',
  },
];

const TabComps = {
  people: PeopleTable,
  car: CarTable,
};

interface InAndOutCardListProps {}

const InAndOutCardList: FC<InAndOutCardListProps> = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('people');

  const ActiveTabComp = TabComps[activeTabKey];

  return (
    <PageHeaderWrapper
      tabList={tabList}
      tabActiveKey={activeTabKey}
      onTabChange={key => setActiveTabKey(key)}
    >
      <Suspense fallback={<PageLoading />}>
        <ActiveTabComp></ActiveTabComp>
      </Suspense>
    </PageHeaderWrapper>
  );
};

export default InAndOutCardList;
