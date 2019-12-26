interface IndustryModal {
  id: number;
  houseKey: string;
  uesrName: string;
  sex: number;
  idcard: string;
  phone: string;
  duty: string;
  poll: string;
}

interface IndustryTableItem extends IndustryModal {
  houseName: string;
  createTime: string;
}

type IndustryTableForm = Partial<IndustryModal>;

interface IndustryTableSearch {
  houseKey: string;
  userinfo: string;
}
