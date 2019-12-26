interface UserModal {
  id: number;
  name: string;
  userName: string;
  phone: string;
  houseId: string | string[];
}

interface UserTableItem extends UserModal {
  createName: string;
  roleName: string;
  houseName: string;
  newCreateTime: string;
}

type UserTableForm = Partial<
  UserModal & {
    passWord: string;
    confirmPassWord: string;
    roleList: string;
  }
>;

type UserTableParams = Partial<{
  param: string;
  houseId: string;
}>;
