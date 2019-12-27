// 全局定义分页类型
interface PaginationModal {
  pageIndex: number;
  pageSize: number;
}

type Pageable<T> = {
  [P in keyof T]: T[P];
} &
  PaginationModal;
