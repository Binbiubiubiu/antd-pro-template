export interface UserModal {
  id: number;
  name: string;
  userName: string;
  phone: string;
  houseId: string | string[];
}

export interface UserTableItem extends UserModal {
  createName: string;
  roleName: string;
  houseName: string;
  newCreateTime: string;
}

export type UserTableForm = Partial<
  UserModal & {
    passWord: string;
    confirmPassWord: string;
    roleList: string;
  }
>;

export type UserTableSearch = Partial<{
  param: string;
  houseId: string;
}>;
