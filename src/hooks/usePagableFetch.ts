import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type ReturnDispatch<T> = {
  setTableData: Dispatch<SetStateAction<T[]>>;
  setTotal: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
};

export interface PagableFetchProps<T, S> {
  request: (params: { searchForm: S } & PaginationModal) => Promise<any>;
  onSuccess?: (params: { res: any } & ReturnDispatch<T>) => void;
  onError?: (params: { err: any } & ReturnDispatch<T>) => void;
  initCurrent?: number;
  initPageSize?: number;
  initSearchForm?: S;
}

export function usePagableFetch<T = any, S = any>(props: PagableFetchProps<T, S>) {
  const { request, onSuccess, onError, initCurrent = 1, initPageSize = 10 } = props;

  const [searchForm, setSearchForm] = useState<S>({} as S);
  const [tableData, setTableData] = useState<T[]>([]);
  const [current, setCurrent] = useState<number>(initCurrent);
  const [pageSize, setPageSize] = useState<number>(initPageSize);
  const [total, setTotal] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);

  const refreshTable = () => {
    setLoading(true);
    request({ searchForm, pageIndex: current, pageSize })
      .then(res => {
        if (onSuccess) {
          onSuccess({ res, setTableData, setTotal, setPageSize });
        }
      })
      .catch(err => {
        if (onError) {
          onError({ err, setTableData, setTotal, setPageSize });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   refreshTable();
  // }, []);

  useEffect(() => {
    refreshTable();
  }, [current, pageSize, JSON.stringify(searchForm)]);

  return {
    loading,
    tableData,
    current,
    pageSize,
    total,
    setCurrent,
    setSearchForm,
    refreshTable,
  };
}
