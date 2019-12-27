export interface IndustryModal {
  id: number;
  houseKey: string;
  uesrName: string;
  sex: number;
  idcard: string;
  phone: string;
  duty: string;
  poll: string;
}

export interface IndustryTableItem extends IndustryModal {
  houseName: string;
  createTime: string;
}

export type IndustryTableForm = Partial<IndustryModal>;

export interface IndustryTableSearch {
  houseKey: string;
  userinfo: string;
}
