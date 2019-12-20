interface UserModal {
  id: number;
  name: string;
  userName: string;
  phone: string;
}

interface UserTableItem extends UserModal {
  createName: string;
  roleName: string;
  houseName: string;
  newCreateTime: string;
}

interface UserTableForm extends Partial<UserModal> {
  passWord?: string;
  confirmPassWord?: string;
  roleList?: string;
}

interface UserTableParams {
  param?: string;
  houseId?: string;
}
