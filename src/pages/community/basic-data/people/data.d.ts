export interface PeopleModal {
  id: number;
  houseKey: string;
  name: string;
  sex: string;
  education: string;
  idcard: string;
  phone: string;
  householdType: string;
  photo: string;
}

export interface PeopleTableItem extends PeopleModal {
  houseName: string;
  createTime: string;
  createTimeString: string;
}

export interface PeopleTableSearch {
  houseKey: string;
  userinfo: string;
  householdType: string;
}
