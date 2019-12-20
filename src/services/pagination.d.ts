interface PaginationModal {
  pageIndex: number;
  pageSize: number;
}

type Pageable<T> = {
  [P in keyof T]: T[P];
} &
  PaginationModal;
