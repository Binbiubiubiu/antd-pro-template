// import { useState } from 'react';
//
// interface useTableFetchProps<T, S extends Partial<PaginationModal>> {
// dataSource?: T[];
// searchParams?: S;
// }
//
// export function usePageTableSearch<T, S extends Partial<PaginationModal>>(
// initData: useTableFetchProps<T, S>,
// ) {
// const { dataSource = [], searchParams = {} as S } = initData;
//
// const [_dataSource, setDataSource] = useState<T[]>(dataSource);
// const [_pageIndex, setPageIndex] = useState<number>(searchParams.pageIndex || 1);
// const [_pageSize, setPageSize] = useState<number>(searchParams.pageSize || 10);
// const [_total, setTotal] = useState<number>(0);
//
// const [_searchForm, setSearchForm] = useState<S>(searchParams as S);
//
// return {};
// }
