export interface UserTableItem {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  title: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

// export interface TableListPagination {
//   total: number;
//   pageSize: number;
//   current: number;
// }

// export interface TableListData {
//   list: TableListItem[];
//   pagination: Partial<TableListPagination>;
// }

export interface UserTableParams {
  current?: number;
  pageSize?: number;
  param?: string;
}

export interface RoleListItem {
  name: string;
  count: number;
  moduleId: number;
  id: stirng;
  moduleList: string;
}


