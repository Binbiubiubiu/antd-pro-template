interface PeopleModal {
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

interface PeopleTableItem extends PeopleModal {
  houseName: string;
  createTime: string;
  createTimeString: string;
}

interface PeopleTableSearch {
  houseKey: string;
  userinfo: string;
  householdType: string;
}
